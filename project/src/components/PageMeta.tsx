import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { STRUCTURED_DATA_ID, headTags, metaForPath } from '../data/seo';

function setMeta(attr: 'name' | 'property', key: string, content: string | null) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (content === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

// Each page's HTML already has the right tags from the build. This keeps them
// right when someone moves between pages without a full page load.
export function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const t = headTags(metaForPath(pathname));
    document.title = t.title;
    t.named.forEach(([n, c]) => setMeta('name', n, c));
    t.properties.forEach(([p, c]) => setMeta('property', p, c));
    if (!t.named.some(([n]) => n === 'robots')) setMeta('name', 'robots', null);
    if (!t.properties.some(([p]) => p === 'og:url')) setMeta('property', 'og:url', null);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!t.canonical) canonical?.remove();
    else {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = t.canonical;
    }

    let script = document.getElementById(STRUCTURED_DATA_ID);
    if (!t.jsonLd) script?.remove();
    else {
      if (!script) {
        script = document.createElement('script');
        script.id = STRUCTURED_DATA_ID;
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      if (script.textContent !== t.jsonLd) script.textContent = t.jsonLd;
    }
  }, [pathname]);

  return null;
}
