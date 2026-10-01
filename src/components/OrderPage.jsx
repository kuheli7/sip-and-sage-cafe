import { useEffect, useState } from 'react'
import { cafe } from '../config/cafe'
import { menu } from '../data/menu'
import { formatPrice } from '../utils'
import { useCart } from '../state/CartContext'
import { submitOrder } from '../lib/orders'
import DietMark from './DietMark'
import AddButton, { Stepper } from './AddButton'

const money = (n) => formatPrice(cafe.currency, n)
const taxLabel = `${cafe.taxLabel} (${Math.round(cafe.taxRate * 100)}%)`

// The table number rides in the QR code (…/?table=5). Guests who didn't scan can pick one.
const tableFromUrl = () => {
  const t = Number(new URLSearchParams(window.location.search).get('table'))
  return Number.isInteger(t) && t >= 1 && t <= cafe.tables ? String(t) : ''
}

const allItems = menu.flatMap((c) => c.items)

const card = 'rounded-3xl bg-roast p-5 ring-1 ring-line'
const field =
  'mt-1.5 w-full rounded-2xl border border-line bg-ink px-4 py-3 text-base text-cream placeholder:text-latte/60'

function Header({ title }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-ink">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
        <a
          href="#/"
          aria-label="Back to menu"
          className="grid h-10 w-10 place-items-center rounded-full bg-roast ring-1 ring-line transition hover:bg-roast-2"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <h1 className="font-display text-2xl">{title}</h1>
      </div>
    </header>
  )
}

// Light drinks and small bites that aren't in the order yet.
function Suggestions({ inOrder }) {
  const picks = allItems.filter((i) => i.light && i.image && !inOrder.has(i.name)).slice(0, 6)
  if (picks.length === 0) return null

  return (
    <section aria-labelledby="light-title" className="mt-8">
      <h2 id="light-title" className="px-1 font-display text-2xl">
        Something <span className="text-amber italic">light</span> with it?
      </h2>
      <p className="mt-1 px-1 text-sm text-latte">Easy extras that go well with what you picked.</p>

      <ul className="no-scrollbar -mx-4 mt-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
        {picks.map((item) => (
          <li key={item.name} className="w-40 shrink-0 snap-start overflow-hidden rounded-2xl bg-roast ring-1 ring-line">
            <img src={item.image} alt="" loading="lazy" className="h-28 w-full object-cover" />
            <div className="p-3">
              <p className="flex items-center gap-1.5 text-sm font-semibold">
                <DietMark diet={item.diet} size="h-3.5 w-3.5" />
                <span className="truncate">{item.name}</span>
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-amber tabular-nums">{money(item.price)}</span>
                <AddButton item={item} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Summary({ subtotal, tax, total }) {
  return (
    <section aria-label="Order summary" className={`${card} mt-8`}>
      <h2 className="text-xs font-bold tracking-[0.2em] text-latte uppercase">Order summary</h2>
      <dl className="mt-4 space-y-2.5">
        <div className="flex justify-between text-latte">
          <dt>Subtotal</dt>
          <dd className="tabular-nums text-cream">{money(subtotal)}</dd>
        </div>
        <div className="flex justify-between text-latte">
          <dt>{taxLabel}</dt>
          <dd className="tabular-nums text-cream">{money(tax)}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-line pt-3">
          <dt className="font-semibold">Amount to pay</dt>
          <dd className="font-display text-3xl text-amber tabular-nums">{money(total)}</dd>
        </div>
      </dl>
    </section>
  )
}

function Confirmation({ order }) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-leaf/20 text-leaf">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="mt-4 font-display text-4xl">Order sent!</h2>
      <p className="mt-1 text-latte">
        Order <span className="font-semibold text-cream">#{order.id}</span> · Table{' '}
        <span className="font-semibold text-cream">{order.table}</span>
        {order.name && <> · {order.name}</>}
      </p>
      <p className="mt-3 text-cream/90">We're on it. We'll bring it to your table.</p>

      <ul className={`${card} mt-6 divide-y divide-line px-5 py-2 text-left text-sm`}>
        {order.items.map((i) => (
          <li key={i.name} className="flex justify-between py-2.5">
            <span>
              {i.qty} × {i.name}
            </span>
            <span className="text-latte tabular-nums">{money(i.qty * i.price)}</span>
          </li>
        ))}
        <li className="flex justify-between py-2.5 text-latte">
          <span>Subtotal</span>
          <span className="tabular-nums">{money(order.subtotal)}</span>
        </li>
        <li className="flex justify-between py-2.5 text-latte">
          <span>{taxLabel}</span>
          <span className="tabular-nums">{money(order.tax)}</span>
        </li>
        <li className="flex justify-between py-2.5 font-semibold">
          <span>Total</span>
          <span className="text-amber tabular-nums">{money(order.total)}</span>
        </li>
      </ul>

      {order.note && (
        <p className="mt-4 text-sm text-latte">
          Your note: <span className="text-cream">“{order.note}”</span>
        </p>
      )}

      <a
        href="#/"
        className="mt-8 flex min-h-12 items-center justify-center rounded-full bg-amber font-semibold text-ink transition hover:bg-amber-deep"
      >
        Back to menu
      </a>
      {cafe.demoMode && (
        <p className="mt-3 text-xs text-latte">
          Demo mode: this order is saved on this device only. It is not sent to a real kitchen yet.
        </p>
      )}
    </main>
  )
}

export default function OrderPage() {
  const { lines, subtotal, tax, total, clear } = useCart()
  const [table, setTable] = useState(tableFromUrl)
  const [changingTable, setChangingTable] = useState(false)
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [placed, setPlaced] = useState(null) // the confirmed order, once sent

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  async function place() {
    if (!table) {
      setError('Please choose your table number.')
      document.getElementById('table-card')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      return
    }
    setError('')
    setBusy(true)
    try {
      const order = await submitOrder({
        table,
        name: name.trim(),
        note: note.trim(),
        subtotal,
        tax,
        taxRate: cafe.taxRate,
        total,
        items: lines.map(({ item, qty }) => ({
          name: item.name,
          qty,
          price: item.price,
          diet: item.diet,
        })),
      })
      setPlaced(order)
      clear()
      window.scrollTo({ top: 0, behavior: 'instant' })
    } catch {
      setError("Couldn't send your order. Please try again, or tell a member of staff.")
    } finally {
      setBusy(false)
    }
  }

  if (placed) {
    return (
      <>
        <Header title="Order sent" />
        <Confirmation order={placed} />
      </>
    )
  }

  if (lines.length === 0) {
    return (
      <>
        <Header title="Your order" />
        <main className="mx-auto max-w-2xl px-4 py-20 text-center">
          <p className="font-display text-4xl">Nothing here yet</p>
          <p className="mt-2 text-latte">Add something from the menu and it will show up here.</p>
          <a href="#/" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-amber px-8 font-semibold text-ink">
            Back to menu
          </a>
        </main>
      </>
    )
  }

  const inOrder = new Set(lines.map((l) => l.item.name))

  return (
    <>
      <Header title="Your order" />

      <main className="mx-auto max-w-2xl px-4 pt-5 pb-36">
        <section id="table-card" className={card}>
          {table && !changingTable ? (
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-3">
                <span className="rounded-full bg-amber px-4 py-1.5 font-bold text-ink">Table {table}</span>
                <span className="text-latte">Dine-in</span>
              </p>
              <button
                type="button"
                onClick={() => setChangingTable(true)}
                className="text-sm font-semibold text-latte hover:text-amber"
              >
                Change
              </button>
            </div>
          ) : (
            <label className="text-sm font-semibold">
              Which table are you at?
              <select
                value={table}
                onChange={(e) => {
                  setTable(e.target.value)
                  setChangingTable(false)
                  setError('')
                }}
                className={field}
              >
                <option value="">Choose your table…</option>
                {Array.from({ length: cafe.tables }, (_, i) => (
                  <option key={i} value={i + 1}>
                    Table {i + 1}
                  </option>
                ))}
              </select>
            </label>
          )}
          {error && (
            <p role="alert" className="mt-3 text-sm font-semibold text-[#ff8a7a]">
              {error}
            </p>
          )}
        </section>

        <ul className={`${card} mt-4 divide-y divide-line py-2`} aria-label="Items in your order">
          {lines.map(({ item, qty }) => (
            <li key={item.name} className="flex items-center gap-3 py-3">
              {item.image && (
                <img src={item.image} alt="" className="h-16 w-16 shrink-0 rounded-2xl object-cover" />
              )}
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 font-semibold">
                  <DietMark diet={item.diet} />
                  <span className="truncate">{item.name}</span>
                </p>
                <p className="mt-1 text-sm text-latte tabular-nums">
                  {money(item.price)} <span className="text-latte/60">each</span>
                </p>
                <p className="mt-0.5 font-semibold text-amber tabular-nums">{money(item.price * qty)}</p>
              </div>
              <Stepper name={item.name} qty={qty} />
            </li>
          ))}
        </ul>

        <section className={`${card} mt-4 grid gap-4`}>
          <label className="text-sm font-semibold">
            Order instructions <span className="font-normal text-latte">(optional)</span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              maxLength={200}
              placeholder="Less sugar, no onions, nut allergy…"
              className={field}
            />
          </label>
          <label className="text-sm font-semibold">
            Your name <span className="font-normal text-latte">(optional)</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="given-name"
              maxLength={40}
              placeholder="So we can call it out"
              className={field}
            />
          </label>
        </section>

        <Suggestions inOrder={inOrder} />
        <Summary subtotal={subtotal} tax={tax} total={total} />

        <p className="mt-4 px-1 text-center text-xs text-latte">
          You pay at the end, after you've eaten. Once the kitchen starts, an order can't be cancelled.
        </p>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ink pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-4 pt-3">
          <div>
            <p className="text-xs text-latte">Amount to pay</p>
            <p className="font-display text-2xl text-amber tabular-nums">{money(total)}</p>
          </div>
          <button
            type="button"
            onClick={place}
            disabled={busy}
            className="min-h-13 flex-1 rounded-full bg-amber px-6 text-lg font-bold text-ink transition hover:bg-amber-deep active:scale-[0.98] disabled:opacity-60 sm:max-w-xs"
          >
            {busy ? 'Sending…' : 'Place order'}
          </button>
        </div>
      </div>
    </>
  )
}
