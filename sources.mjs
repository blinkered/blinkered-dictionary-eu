/**
 * The collections that attest Euskara, and where each comes from.
 *
 * Basque has a 7,417-word candidate list, drawn from film subtitles and checked against
 * Wiktionary's Basque categories, against a 390MB Wikipedia and its Wikisource, Leipzig news, a
 * few thousand Tatoeba sentences and the Internet Archive. There is no Basque Gutenberg shelf and
 * no Basque translation on eBible, so the fourth and later families are publishers.
 *
 * Basque shares no vocabulary to speak of with Spanish or French, so a page in the wrong language
 * contributes almost nothing rather than a plausible-looking wrong answer. The loanwords are the
 * exception, and the publishers are chosen to write in Basque rather than beside it.
 *
 * Every URL here was probed before it was written down. A collection that 404s does not fail
 * loudly — the build skips it with a warning and reports a healthy number over fewer families.
 */
import { createReadStream, existsSync, readFileSync, readdirSync } from 'node:fs'
import { createInterface } from 'node:readline'
import {
  fileDocuments,
    harvestDocuments,
  leipzigLocators,
  leipzigSentences,
  tatoebaDocuments,
  wikiDocuments,
} from '@blinkered/attestation'

export const LANGUAGE = 'eu'

const CACHE = new URL('.cache/raw/', import.meta.url).pathname

/** A Leipzig package, with its sentence-to-URL index resolved up front. */
function leipzig(pkg) {
  const base = `${CACHE}${pkg}/${pkg}`
  const locators = leipzigLocators(
    readFileSync(`${base}-inv_so.txt`, 'utf8'),
    readFileSync(`${base}-sources.txt`, 'utf8'),
  )
  const lines = createInterface({
    input: createReadStream(`${base}-sentences.txt`),
    crlfDelay: Infinity,
  })
  return leipzigSentences(lines, locators)
}

// Everything Leipzig has for Basque above 10,000 sentences: a 2012 news crawl, two small years of
// news and a 2011 web crawl, which together are one family. The Leipzig Wikipedia packages are
// deliberately absent: they are Wikipedia text wearing a Leipzig label, so including one would
// corroborate `wiki:eu` while looking like another family.
const LEIPZIG = [
  'eus_newscrawl_2012_300K',
  'eus_news_2019_30K',
  'eus_news_2020_30K',
  'eus_web_2011_30K',
]

const ALL = [
  {
    id: 'wiki:eu',
    what: 'Basque Wikipedia — modern encyclopedic prose',
    needs: `${CACHE}euwiki.xml.bz2`,
    documents: () => wikiDocuments(`${CACHE}euwiki.xml.bz2`),
  },
  {
    id: 'wikisource:eu',
    what: 'Basque Wikisource — same Wikimedia family, so it corroborates rather than counts',
    needs: `${CACHE}euwikisource.xml.bz2`,
    documents: () => wikiDocuments(`${CACHE}euwikisource.xml.bz2`),
  },
  ...LEIPZIG.map((pkg) => ({
    id: `lz:${pkg}`,
    from: `https://downloads.wortschatz-leipzig.de/corpora/${pkg}.tar.gz`,
    what: `Leipzig ${pkg} — modern news and web text, cited by the page each sentence came from`,
    needs: `${CACHE}${pkg}`,
    documents: () => leipzig(pkg),
  })),
  {
    id: 'tat',
    from: 'https://downloads.tatoeba.org/exports/per_language/eus/eus_sentences.tsv.bz2',
    what: 'Tatoeba Basque — contemporary and conversational, and small',
    needs: `${CACHE}eus_sentences.tsv`,
    documents: () => tatoebaDocuments(`${CACHE}eus_sentences.tsv`),
  },
  {
    id: 'ia',
    // Scanned books are OCR, and OCR fails in a way that looks like text. Clean Gutenberg scores
    // a median 52% known words and never below 36%; the worst of these scored 1%, an English
    // book read as Cyrillic. Below this floor a book is not legible enough to attest anything.
    legible: 0.35,
    what: 'Internet Archive Basque books — literature, and the register a newspaper never reaches',
    needs: `${CACHE}archive-eu`,
    from: 'https://archive.org/search?query=mediatype%3Atexts+AND+%28language%3A%22Basque%22+OR+language%3A%22eus%22+OR+language%3A%22baq%22%29',
    documents: () => {
      const dir = `${CACHE}archive-eu`
      // A locator names the text, not the item: the catalogue page holds no word of the book.
      const named = new Map(
        readFileSync(`${dir}/files.tsv`, 'utf8')
          .split('\n')
          .filter(Boolean)
          .map((line) => line.split('\t')),
      )
      const books = readdirSync(dir)
        .filter((file) => file.endsWith('.txt'))
        .map((file) => file.replace('.txt', ''))
        .filter((id) => named.has(id))
        // Percent-encoded: two thirds of Archive filenames contain spaces, and the evidence
        // format spends spaces as separators.
        .map((id) => ({
          locator: `${id}/${encodeURIComponent(named.get(id))}`,
          path: `${dir}/${id}.txt`,
        }))
      return fileDocuments(books, async (path) => readFileSync(path, 'utf8'))
    },
  },
]

export const SOURCES = ALL.filter((source) => {
  if (source.needs === undefined || existsSync(source.needs)) return true
  process.stderr.write(`  (skipping ${source.id}: ${source.needs} is not in .cache/raw)\n`)
  return false
})

/**
 * Basque publishers, for the harvest.
 *
 * Chosen because they publish in Basque rather than because they are large. A harvester reads
 * whatever it fetches and has no idea what language it is in, so a domain that publishes mostly
 * in Spanish would attest Spanish loanwords against these candidates; that is why Naiz, which
 * carries Gara's Spanish-language journalism, is absent. The literary and science sites come
 * first, for the register the daily news never reaches. Every one answered when probed.
 */
export const DOMAINS = [
  'armiarma.eus', 'zientzia.eus', 'badok.eus', 'berria.eus', 'argia.eus', 'hitza.eus', 'zuzeu.eus',
]

export const HARVEST = existsSync(new URL('searched.tsv', import.meta.url).pathname)
  ? () => harvestDocuments(new URL('searched.tsv', import.meta.url).pathname)
  : undefined

/** Carried over from Blinkered's calibration; must be re-measured before anything ships. */
export const COMMON_CUT = 17000
