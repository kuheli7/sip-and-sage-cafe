import { cafe } from '../config/cafe'
import { formatPrice } from '../utils'
import DietMark from './DietMark'
import AddButton from './AddButton'
import { HandArrow } from './icons'

function MenuItem({ item, onSelect }) {
  return (
    <li className="relative">
      {/* tapping the card opens details; the Add button sits on top as a sibling (no nested buttons) */}
      <button
        type="button"
        onClick={() => onSelect(item)}
        className="flex h-full w-full items-start gap-4 rounded-3xl bg-roast p-3 text-left ring-1 ring-line transition hover:bg-roast-2"
      >
        {item.image && (
          <span className="relative shrink-0">
            <img src={item.image} alt="" loading="lazy" className="h-24 w-24 rounded-2xl object-cover" />
            {item.tag && (
              <span className="item-tag absolute top-1.5 left-1.5 rounded-full bg-ink/85 px-2 py-0.5 text-[0.58rem] font-bold tracking-wider text-amber uppercase">
                {item.tag}
              </span>
            )}
          </span>
        )}
        <span className="min-w-0 flex-1 pb-11">
          {/* long names wrap onto a second line instead of being cut off */}
          <span className="flex items-start gap-2">
            <span className="mt-[0.28rem]">
              <DietMark diet={item.diet} />
            </span>
            <span className="font-item text-[1.1rem] leading-snug font-semibold">{item.name}</span>
          </span>
          <span className="mt-1 line-clamp-2 block text-sm leading-snug text-latte">{item.desc}</span>
          {item.note && (
            <span className="mt-1 flex items-center gap-1.5 font-hand text-[1.3rem] leading-none text-amber/90">
              <HandArrow className="h-4 w-5 shrink-0 -rotate-12" />
              {item.note}
            </span>
          )}
        </span>
      </button>

      <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between pl-28">
        <span className="font-semibold text-amber tabular-nums">{formatPrice(cafe.currency, item.price)}</span>
        <span className="pointer-events-auto">
          <AddButton item={item} />
        </span>
      </div>
    </li>
  )
}

export default function MenuSection({ category, diet, onSelect }) {
  // 'all' shows everything (incl. egg dishes); 'veg' / 'nonveg' show exactly that
  const items = diet === 'all' ? category.items : category.items.filter((i) => i.diet === diet)
  if (items.length === 0) return null

  return (
    <section id={category.id} data-category className="py-8">
      <h2 className="font-display text-4xl sm:text-5xl">{category.name}</h2>
      <p className="mt-1 text-latte">{category.blurb}</p>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <MenuItem key={item.name} item={item} onSelect={onSelect} />
        ))}
      </ul>
    </section>
  )
}
