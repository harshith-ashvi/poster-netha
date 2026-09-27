// Leaves placed along the curve (40,115) -> ctrl (4,60) -> (40,5). Precomputed once at module load.
const LEAVES = Array.from({ length: 9 }, (_, i) => {
  const t = (i + 0.5) / 9;
  const u = 1 - t;
  const x = u * u * 40 + 2 * u * t * 4 + t * t * 40;
  const y = u * u * 115 + 2 * u * t * 60 + t * t * 5;
  const dx = 2 * u * (4 - 40) + 2 * t * (40 - 4);
  const dy = 2 * u * (60 - 115) + 2 * t * (5 - 60);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  return { x: x.toFixed(1), y: y.toFixed(1), a: (angle - 35).toFixed(0), a2: (angle + 35).toFixed(0) };
});

// Left branch; pass `flip` for the right one.
export function Laurel({ height, flip }: { height: number; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 120"
      height={height}
      width={height / 2}
      aria-hidden
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M40 115Q4 60 40 5" fill="none" stroke="#7a4a00" strokeWidth="3" />
      <g fill="#ffd23f" stroke="#7a4a00" strokeWidth="1.5">
        {LEAVES.map((l, i) => (
          <g key={i}>
            <ellipse cx={l.x} cy={l.y} rx="10" ry="4.5" transform={`rotate(${l.a} ${l.x} ${l.y}) translate(-9 0)`} />
            <ellipse cx={l.x} cy={l.y} rx="10" ry="4.5" transform={`rotate(${l.a2} ${l.x} ${l.y}) translate(9 0)`} />
          </g>
        ))}
      </g>
    </svg>
  );
}
