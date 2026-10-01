import { cafe } from '../config/cafe'
import { formatPrice } from '../utils'
import { useCart } from '../state/CartContext'
import { menuScroll } from '../lib/scroll'

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinejoin="round" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
    </svg>
  )
}

// Appears once something is in the order. One tap opens the full "Your order" page.
export default function CartBar() {
  const { count, total } = useCart()
  if (count === 0) return null

  const price = formatPrice(cafe.currency, total)

  return (
    <div className="no-print pointer-events-none fixed inset-x-0 bottom-0 z-30 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <a
        href="#/order"
        aria-label={`View order, ${count} ${count === 1 ? 'item' : 'items'}, ${price}`}
        // remember where the guest was, so "back" drops them at the same dish
        onClick={() => (menuScroll.y = window.scrollY)}
        className="rise pointer-events-auto mx-auto flex min-h-14 w-full max-w-md items-center justify-between rounded-full bg-amber py-2 pr-6 pl-3 font-semibold text-ink shadow-xl shadow-black/50 transition hover:bg-amber-deep active:scale-[0.98]"
      >
        <span className="flex items-center gap-3">
          <span className="relative grid h-10 w-10 place-items-center rounded-full bg-ink/12">
            <BagIcon />
            {/* key={count} replays the little pop each time the number changes */}
            <span
              key={count}
              className="pop absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[0.7rem] leading-none font-bold text-amber tabular-nums"
            >
              {count}
            </span>
          </span>
          View order
        </span>
        <span className="tabular-nums">{price}</span>
      </a>
    </div>
  )
}
