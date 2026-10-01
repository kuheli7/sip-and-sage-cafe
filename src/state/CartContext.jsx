import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { menu } from '../data/menu'
import { cafe } from '../config/cafe'
import { roundMoney } from '../utils'

const KEY = 'sipsage:cart'
const MAX_QTY = 20

// name -> item, so the cart always shows today's price even if the menu changed since last visit
const byName = new Map(menu.flatMap((c) => c.items).map((i) => [i.name, i]))

const load = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY)) ?? {}
    return Object.fromEntries(Object.entries(saved).filter(([name]) => byName.has(name)))
  } catch {
    return {}
  }
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [qtys, setQtys] = useState(load) // { [itemName]: quantity }

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(qtys))
    } catch {
      /* ignore */
    }
  }, [qtys])

  const setQty = useCallback((name, qty) => {
    const q = Math.max(0, Math.min(MAX_QTY, qty))
    setQtys((prev) => {
      const next = { ...prev }
      if (q === 0) delete next[name]
      else next[name] = q
      return next
    })
  }, [])

  const clear = useCallback(() => setQtys({}), [])

  const value = useMemo(() => {
    const lines = Object.entries(qtys).map(([name, qty]) => ({ item: byName.get(name), qty }))
    const subtotal = lines.reduce((n, l) => n + l.qty * l.item.price, 0)
    const tax = roundMoney(subtotal * cafe.taxRate)
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal,
      tax,
      total: roundMoney(subtotal + tax),
      qtyOf: (name) => qtys[name] ?? 0,
      setQty,
      clear,
    }
  }, [qtys, setQty, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
