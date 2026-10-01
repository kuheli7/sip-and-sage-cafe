import { menu } from '../data/menu'
import { cafe } from '../config/cafe'
import { formatPrice } from '../utils'
import { special } from '../data/special'
import { HandArrow } from './icons'

const FAVOURITE_TAGS = ['Bestseller', "Chef's pick"]

// A short, photo-first shelf of the items the café most wants you to try.
export default function Favourites({ onSelect }) {
  const all = menu.flatMap((c) => c.items)
  const todays = all.find((i) => i.name === special.item && i.image)
  const favourites = all.filter((i) => i.image && FAVOURITE_TAGS.includes(i.tag) && i !== todays)

  // today's special always makes the row, even if it is not normally a favourite
  const picks = (todays ? [todays, ...favourites] : favourites).slice(0, 5)

  if (picks.length === 0) return null

  return (
    <section aria-labelledby="fav-title" className="mx-auto max-w-5xl py-14">
      <div className="px-5">
        <h2 id="fav-title" className="font-display text-4xl sm:text-5xl">
          House <span className="text-amber italic">favourites</span>
        </h2>
        <p className="mt-2 flex items-center gap-2 font-hand text-[1.7rem] leading-none text-amber/90">
          First time? Start here
          <HandArrow className="mt-3 h-6 w-9 rotate-[18deg]" />
        </p>
      </div>

      <ul className="no-scrollbar mt-6 flex scroll-px-5 snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">
        {picks.map((item) => (
          <li key={item.name} className="w-[72%] shrink-0 snap-start sm:w-64">
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl text-left ring-1 ring-line"
            >
              <img
                src={item.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              {item === todays && (
                <span className="absolute top-3 right-3 rotate-3 rounded-full bg-amber px-3.5 py-1.5 font-hand text-[1.2rem] leading-none font-bold text-ink shadow-lg shadow-black/40">
                  Today's special
                </span>
              )}
              <span className="absolute inset-x-0 bottom-0 p-4">
                <span className="text-[0.7rem] font-semibold tracking-widest text-amber uppercase">
                  {item.tag}
                </span>
                <span className="mt-1 block font-display text-2xl leading-tight">{item.name}</span>
                <span className="mt-0.5 block text-sm text-cream/80">
                  {formatPrice(cafe.currency, item.price)}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
