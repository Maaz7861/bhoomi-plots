/**
 * Old WordPress-era and scanner URLs (`/products/detail/<id>/`, `/wp-includes/...`, `*.php`, `/.git/config`, `/.env`).
 * This site has none of them. Without this they all fall through to the 404 page, which Next marks
 * `no-store`, so every hit is a fresh uncached render. Here they get an empty `410 Gone` right away
 * (nothing to render, nothing to cache-miss), and crawlers drop a 410 URL faster than a 404.
 *
 * The matcher is deliberately narrow: proxy must NOT run for normal pages and assets.
 */
export function proxy() {
  return new Response(null, {
    status: 410,
    headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' },
  });
}

export const config = {
  matcher: [
    '/products/:path*',
    '/wp-(.*)',
    '/(.*)\\.php',
    '/.git/:path*',
    '/.env(.*)',
  ],
};
