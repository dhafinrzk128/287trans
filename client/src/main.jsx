import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
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

hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <App />
  </StrictMode>,
)
