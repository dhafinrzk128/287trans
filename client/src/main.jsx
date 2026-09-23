import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
// Font di-host sendiri (dulu dari fonts.googleapis.com). Deklarasi @font-face
// dan alasannya ada di index.css, bagian atas.
import './index.css'
import App from './App.jsx'

// react-helmet-async manages <head> tags imperatively (outside React's
// reconciliation), so it has no way to recognize tags already sitting in the
// document from prerendering — it just inserts a second copy on mount. Strip
// the tags <Seo> (src/components/Seo.jsx) manages before hydrating, so
// Helmet always starts from a clean head and re-adds exactly one copy.
const SEO_MANAGED_HEAD_SELECTORS = [
  'title',
  'meta[name="description"]',
  'meta[name="robots"]',
  'link[rel="canonical"]',
  'meta[property^="og:"]',
  'meta[name^="twitter:"]',
  'script[type="application/ld+json"]',
]
document.head.querySelectorAll(SEO_MANAGED_HEAD_SELECTORS.join(',')).forEach((el) => el.remove())

// A deploy replaces every hashed chunk. A tab opened before it still points
// at the old names, so the next lazy page it opens (all of /admin/*) 404s
// and the import rejects. Reload once to pick up the new build's HTML and
// chunk names. The timestamp guard stops a reload loop when the chunk is
// genuinely broken rather than stale: a second failure within the window is
// left to reject, and <ErrorBoundary> (src/components/ErrorBoundary.jsx)
// shows a message instead of a white screen. If sessionStorage is
// unavailable there is no way to guard, so don't reload at all.
const PRELOAD_RELOAD_KEY = 'chunkReloadAt'
const PRELOAD_RELOAD_WINDOW_MS = 10_000
window.addEventListener('vite:preloadError', (event) => {
  try {
    const last = Number(sessionStorage.getItem(PRELOAD_RELOAD_KEY)) || 0
    if (Date.now() - last < PRELOAD_RELOAD_WINDOW_MS) return
    sessionStorage.setItem(PRELOAD_RELOAD_KEY, String(Date.now()))
  } catch {
    return
  }
  event.preventDefault()
  window.location.reload()
})

// Hydrate only real prerendered HTML. Pages without a prerendered file are
// served the build's spa-shell.html (see scripts/saveShell.js), whose #root
// holds nothing but a loading spinner marked data-shell — hydrating that
// would be a guaranteed mismatch (React error #418) and a full re-render
// anyway, so render from scratch instead. createRoot replaces the spinner.
const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)
if (container.querySelector(':scope > [data-shell]')) {
  createRoot(container).render(app)
} else {
  hydrateRoot(container, app)
}
