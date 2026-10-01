// Small hand-drawn-style line art. Every icon is a single amber-able stroke (currentColor),
// so it takes its colour from the text colour around it and needs no image file.

const base = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

// ---------- the brand: a sprig of sage ----------

const RIGHT_LEAVES = [35, 23]
const LEFT_LEAVES = [29, 17]

export function SageSprig(props) {
  return (
    <svg {...base} {...props}>
      <path d="M24 44C23 34 25 22 24 6" />
      <path d="M24 6c-3 3-3 8 0 11 3-3 3-8 0-11z" />
      {RIGHT_LEAVES.map((y) => (
        <path key={`r${y}`} d={`M24 ${y}c3-5 9-6 13-3-2 5-8 7-13 3z`} />
      ))}
      {LEFT_LEAVES.map((y) => (
        <path key={`l${y}`} d={`M24 ${y}c-3-5-9-6-13-3 2 5 8 7 13 3z`} />
      ))}
    </svg>
  )
}

// A curved, hand-drawn arrow for the handwritten notes. Points down-right by default.
export function HandArrow(props) {
  return (
    <svg viewBox="0 0 40 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3 6C13 2 28 6 32 22" />
      <path d="M32 22l-6.5-4.5M32 22l5.5-6" />
    </svg>
  )
}
