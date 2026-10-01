import { useEffect, useRef } from 'react'

// Two independent-looking filters that behave like radio buttons: tap one to filter, tap again to clear.
const FILTERS = [
  { key: 'veg', label: 'Veg', color: '#4caf5a' },
  { key: 'nonveg', label: 'Non-veg', color: '#d9483b' },
]

export default function CategoryNav({ categories, active, diet, onDiet }) {
  const listRef = useRef(null)

  // Keep the active chip visible as the reader scrolls down the page.
  // Scrolls ONLY the chip row. (scrollIntoView can also move the page itself, which
  // fights the reader's own scrolling and shows up as a stutter at each category.)
  useEffect(() => {
    const list = listRef.current
    const chip = list?.querySelector('[aria-current="true"]')
    if (!list || !chip) return
    const offset = chip.getBoundingClientRect().left - list.getBoundingClientRect().left
    list.scrollTo({
      left: list.scrollLeft + offset - (list.clientWidth - chip.offsetWidth) / 2,
      behavior: 'smooth',
    })
  }, [active])

  return (
    <nav
      aria-label="Menu categories"
      className="no-print sticky top-0 z-20 border-b border-line bg-ink/95"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-5 py-3">
        <ul ref={listRef} className="no-scrollbar -mx-1 flex flex-1 gap-1.5 overflow-x-auto px-1">
          {categories.map((c) => {
            const isActive = c.id === active
            return (
              <li key={c.id} className="shrink-0">
                <a
                  href={`#${c.id}`}
                  aria-current={isActive}
                  className={[
                    'block rounded-full px-4 py-2 text-sm font-semibold transition',
                    isActive ? 'bg-amber text-ink' : 'text-latte hover:text-cream',
                  ].join(' ')}
                >
                  {c.name}
                </a>
              </li>
            )
          })}
        </ul>

        <div role="group" aria-label="Filter by diet" className="flex shrink-0 gap-1.5">
          {FILTERS.map(({ key, label, color }) => {
            const on = diet === key
            return (
              <button
                key={key}
                type="button"
                aria-pressed={on}
                aria-label={label}
                title={label}
                onClick={() => onDiet(on ? 'all' : key)}
                className={[
                  'flex h-10 items-center gap-2 rounded-full border px-2.5 text-sm font-semibold transition sm:px-3',
                  on ? 'bg-cream/10 text-cream' : 'border-line text-latte',
                ].join(' ')}
                style={on ? { borderColor: color } : undefined}
              >
                <span
                  className="grid h-4 w-4 place-items-center rounded-[3px] border-2 bg-cream"
                  style={{ borderColor: color }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
                </span>
                <span className="hidden sm:inline">{label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
