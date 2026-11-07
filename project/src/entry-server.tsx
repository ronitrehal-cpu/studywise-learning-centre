import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { headHtml, metaForPath, notFoundMeta, pages } from './data/seo';

// Build-time only: renders one page to HTML for scripts/prerender.mjs
export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
  return { html, head: headHtml(metaForPath(url)) };
}

export { pages, notFoundMeta };
