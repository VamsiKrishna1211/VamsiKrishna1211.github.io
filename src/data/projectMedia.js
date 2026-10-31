// Optional poster stills for project cards, keyed by slug.
// Drop a file at src/assets/projects/<slug>.{jpg,jpeg,png,webp} to enable one —
// nothing else needs to change. Missing files simply fall back to a text-only row.
const posters = import.meta.glob('../assets/projects/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
});

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

export function posterFor(slug) {
  for (const ext of EXTENSIONS) {
    const url = posters[`../assets/projects/${slug}.${ext}`];
    if (url) return url;
  }
  return null;
}
