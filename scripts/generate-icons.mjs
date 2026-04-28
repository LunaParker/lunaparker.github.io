// Generates favicons, OG card, and webmanifest from the brand gradient
// (#8A2387 → #E94057 → #F27121) + Plus Jakarta Sans ExtraBold.
//
// Run with:  npm run icons
// Outputs:   public/favicon.svg, favicon.ico, apple-touch-icon.png,
//            icon-192.png, icon-512.png, og-image.png, site.webmanifest

import { mkdir, writeFile, readFile, access } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const PUBLIC_DIR = join(ROOT, 'public')
const CACHE = join(__dirname, '.cache')

const FONT_URL = 'https://cdn.jsdelivr.net/gh/tokotype/PlusJakartaSans@master/fonts/ttf/PlusJakartaSans-ExtraBold.ttf'
const FONT_PATH = join(CACHE, 'PlusJakartaSans-ExtraBold.ttf')

const BRAND = { start: '#8A2387', mid: '#E94057', end: '#F27121' }
const GRADIENT = `linear-gradient(135deg, ${BRAND.start} 0%, ${BRAND.mid} 50%, ${BRAND.end} 100%)`

async function loadFont() {
  await mkdir(CACHE, { recursive: true })
  try {
    await access(FONT_PATH)
  }
  catch {
    console.log('Fetching Plus Jakarta Sans ExtraBold…')
    const res = await fetch(FONT_URL)
    if (!res.ok) throw new Error(`Font fetch failed: ${res.status}`)
    await writeFile(FONT_PATH, Buffer.from(await res.arrayBuffer()))
  }
  return readFile(FONT_PATH)
}

// Hyperscript for satori (avoids needing a JSX toolchain)
const h = (type, props = {}, ...children) => ({
  type,
  props: {
    ...props,
    children: children.length === 1 ? children[0] : children.length ? children : undefined,
  },
})

function iconElement(size) {
  return h('div', {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: GRADIENT,
      color: '#ffffff',
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: 800,
      fontSize: Math.round(size * 0.62),
      letterSpacing: '-0.05em',
      lineHeight: 1,
    },
  }, 'LP')
}

function ogElement() {
  return h('div', {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '72px 88px',
      background: GRADIENT,
      color: '#ffffff',
      fontFamily: 'Plus Jakarta Sans',
    },
  },
    // Top: wordmark
    h('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 800,
        fontSize: 32,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        opacity: 0.92,
      },
    }, 'Luna Parker'),

    // Middle: tagline (huge)
    h('div', {
      style: { display: 'flex', flexDirection: 'column' },
    },
      h('div', {
        style: {
          fontWeight: 800,
          fontSize: 104,
          lineHeight: 1.02,
          letterSpacing: '-0.04em',
        },
      }, 'Developer, designer,'),
      h('div', {
        style: {
          fontWeight: 800,
          fontSize: 104,
          lineHeight: 1.02,
          letterSpacing: '-0.04em',
          opacity: 0.78,
        },
      }, '& problem solver.'),
    ),

    // Bottom: URL
    h('div', {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        fontWeight: 800,
        fontSize: 26,
        letterSpacing: '0.02em',
      },
    }, 'shyowlstudios.com'),
  )
}

async function renderSvg(element, width, height, fontData) {
  return satori(element, {
    width,
    height,
    fonts: [{ name: 'Plus Jakarta Sans', data: fontData, weight: 800, style: 'normal' }],
  })
}

function svgToPng(svg, width) {
  return new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng()
}

// Multi-image .ico encoder (PNG-in-ICO container)
function buildIco(images) {
  const N = images.length
  const headerSize = 6 + 16 * N
  const dir = Buffer.alloc(headerSize)
  dir.writeUInt16LE(0, 0)
  dir.writeUInt16LE(1, 2)
  dir.writeUInt16LE(N, 4)
  let offset = headerSize
  images.forEach(({ width, height, data }, i) => {
    const o = 6 + 16 * i
    dir.writeUInt8(width >= 256 ? 0 : width, o)
    dir.writeUInt8(height >= 256 ? 0 : height, o + 1)
    dir.writeUInt8(0, o + 2)
    dir.writeUInt8(0, o + 3)
    dir.writeUInt16LE(1, o + 4)
    dir.writeUInt16LE(32, o + 6)
    dir.writeUInt32LE(data.length, o + 8)
    dir.writeUInt32LE(offset, o + 12)
    offset += data.length
  })
  return Buffer.concat([dir, ...images.map(i => i.data)])
}

async function main() {
  await mkdir(PUBLIC_DIR, { recursive: true })
  const fontData = await loadFont()

  // Browser-readable favicon.svg — render at 64 (clean for inline display)
  const faviconSvg = await renderSvg(iconElement(64), 64, 64, fontData)
  await writeFile(join(PUBLIC_DIR, 'favicon.svg'), faviconSvg)

  // PNGs — re-render satori at each native size for type-correct optical sizing
  const sizes = [16, 32, 48, 180, 192, 512]
  const pngs = {}
  for (const s of sizes) {
    const svg = await renderSvg(iconElement(s), s, s, fontData)
    pngs[s] = svgToPng(svg, s)
  }

  await writeFile(join(PUBLIC_DIR, 'apple-touch-icon.png'), pngs[180])
  await writeFile(join(PUBLIC_DIR, 'icon-192.png'), pngs[192])
  await writeFile(join(PUBLIC_DIR, 'icon-512.png'), pngs[512])
  await writeFile(join(PUBLIC_DIR, 'favicon.ico'), buildIco([
    { width: 16, height: 16, data: pngs[16] },
    { width: 32, height: 32, data: pngs[32] },
    { width: 48, height: 48, data: pngs[48] },
  ]))

  // Open Graph / Twitter card
  const ogSvg = await renderSvg(ogElement(), 1200, 630, fontData)
  await writeFile(join(PUBLIC_DIR, 'og-image.png'), svgToPng(ogSvg, 1200))

  // Web app manifest
  const manifest = {
    name: 'Luna Parker',
    short_name: 'Luna Parker',
    description: "Full-stack web developer and designer with 8+ years' experience.",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#8A2387',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
  await writeFile(join(PUBLIC_DIR, 'site.webmanifest'), JSON.stringify(manifest, null, 2) + '\n')

  console.log('Wrote:')
  for (const f of [
    'favicon.svg',
    'favicon.ico (16/32/48)',
    'apple-touch-icon.png (180)',
    'icon-192.png',
    'icon-512.png',
    'og-image.png (1200×630)',
    'site.webmanifest',
  ]) console.log(`  public/${f}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
