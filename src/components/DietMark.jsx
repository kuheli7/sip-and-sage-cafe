export const DIET = {
  veg: { color: '#4caf5a', label: 'Vegetarian' },
  egg: { color: '#e0a21e', label: 'Contains egg' },
  nonveg: { color: '#d9483b', label: 'Non-vegetarian' },
}

// The standard Indian food-label mark: coloured square with a dot.
export default function DietMark({ diet, size = 'h-4 w-4' }) {
  const { color, label } = DIET[diet] ?? DIET.veg
  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className={`grid ${size} shrink-0 place-items-center rounded-[3px] border-2 bg-ink`}
      style={{ borderColor: color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
    </span>
  )
}
