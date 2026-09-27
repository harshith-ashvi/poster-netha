// Inline SVG placeholder: no network fetch, so it always makes it into the export.
export function Silhouette() {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax slice" width="100%" height="100%" aria-hidden>
      <rect width="100" height="100" fill="#f7cf6b" />
      <circle cx="50" cy="30" r="45" fill="#fff4c2" opacity="0.6" />
      <g fill="#4a1d05" opacity="0.7">
        <circle cx="50" cy="40" r="17" />
        <path d="M12 100C12 74 28 62 50 62S88 74 88 100Z" />
      </g>
    </svg>
  );
}
