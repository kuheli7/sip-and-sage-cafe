// The one place that "sends" an order.
//
// For now it only saves the order on this device so the whole customer flow can be demoed.
// When the owner dashboard exists, replace the body of submitOrder() with a call to the
// real backend (Supabase / Firebase / your own API). Nothing else in the app needs to change.

const KEY = 'sipsage:orders'

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? []
  } catch {
    return []
  }
}

const write = (orders) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(orders))
  } catch {
    /* storage can be blocked (private mode) — the order still succeeds on screen */
  }
}

/**
 * @param {{ table: string, name: string, note: string, subtotal: number, tax: number, taxRate: number, total: number,
 *           items: { name: string, qty: number, price: number, diet: string }[] }} draft
 */
export async function submitOrder(draft) {
  await new Promise((resolve) => setTimeout(resolve, 700)) // stands in for the network round-trip

  const orders = read()
  const order = {
    ...draft,
    id: 1001 + orders.length,
    status: 'new',
    createdAt: new Date().toISOString(),
  }
  write([...orders, order])
  return order
}
