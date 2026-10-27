// The home page is served at "/" directly. It used to redirect "/" -> "/Home", which made every visit (and every
// crawl) cost two requests. "/Home" itself now redirects here (see next.config.ts).
export { default } from './Home/page';
