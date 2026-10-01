import { useEffect, useRef } from 'react'
import { cafe } from '../config/cafe'
import { formatPrice } from '../utils'
import { useCart } from '../state/CartContext'
import DietMark, { DIET } from './DietMark'
import { Stepper } from './AddButton'

// A native <dialog>: Escape closes it, focus is trapped, and screen readers announce it.
export default function ItemDialog({ item, onClose }) {
  const ref = useRef(null)
  const { qtyOf, setQty } = useCart()
  const qty = item ? qtyOf(item.name) : 0

  useEffect(() => {
    const dialog = ref.current
    if (item && !dialog.open) dialog.showModal()
    if (!item && dialog.open) dialog.close()
  }, [item])

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-label={item?.name}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
    >
      {item && (
        <div className="max-h-[92svh] overflow-y-auto">
          {item.image && (
            <img src={item.image} alt={item.name} className="aspect-[4/3] w-full object-cover" />
          )}
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-3xl leading-tight">{item.name}</h3>
              <p className="pt-1 text-xl font-semibold text-amber tabular-nums">
                {formatPrice(cafe.currency, item.price)}
              </p>
            </div>
            <p className="mt-2 flex items-center gap-2 text-sm text-latte">
              <DietMark diet={item.diet} />
              {DIET[item.diet].label}
              {item.tag && <span className="text-amber">· {item.tag}</span>}
            </p>
            <p className="mt-4 leading-relaxed text-cream/90">{item.desc}</p>

            <div className="mt-6 flex items-center gap-3">
              {qty === 0 ? (
                <button
                  type="button"
                  onClick={() => setQty(item.name, 1)}
                  className="min-h-12 flex-1 rounded-full bg-amber font-semibold text-ink transition hover:bg-amber-deep active:scale-[0.98]"
                >
                  Add to order · {formatPrice(cafe.currency, item.price)}
                </button>
              ) : (
                <>
                  <Stepper name={item.name} qty={qty} size="lg" />
                  <button
                    type="button"
                    onClick={() => ref.current.close()}
                    className="min-h-12 flex-1 rounded-full border border-line font-semibold transition hover:bg-roast-2"
                  >
                    Done
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
