import { useCart } from '../state/CartContext'

// "+ Add" turns into a  − 2 +  stepper once the item is in the order.
export function Stepper({ name, qty, size = 'sm' }) {
  const { setQty } = useCart()
  const big = size === 'lg'
  const btn = `grid place-items-center font-bold ${big ? 'h-12 w-12 text-2xl' : 'h-9 w-9 text-lg'}`

  return (
    <div className="inline-flex items-center rounded-full bg-amber text-ink">
      <button type="button" aria-label={`Remove one ${name}`} onClick={() => setQty(name, qty - 1)} className={btn}>
        −
      </button>
      <span aria-live="polite" className={`text-center font-bold tabular-nums ${big ? 'w-8 text-lg' : 'w-6'}`}>
        {qty}
      </span>
      <button type="button" aria-label={`Add one ${name}`} onClick={() => setQty(name, qty + 1)} className={btn}>
        +
      </button>
    </div>
  )
}

export default function AddButton({ item }) {
  const { qtyOf, setQty } = useCart()
  const qty = qtyOf(item.name)

  if (qty > 0) return <Stepper name={item.name} qty={qty} />

  return (
    <button
      type="button"
      aria-label={`Add ${item.name} to order`}
      onClick={() => setQty(item.name, 1)}
      className="h-9 rounded-full border border-amber/60 px-5 text-sm font-bold text-amber transition hover:bg-amber hover:text-ink active:scale-95"
    >
      Add
    </button>
  )
}
