import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { cafe } from '../config/cafe'

// Printable table QR cards. Open the site at  /#/qr  → choose tables → Print.
// Light-themed on purpose: it is meant for paper.
export default function QrPage() {
  // Default to the address the page is served from, so it works on any host.
  const [url, setUrl] = useState(() => window.location.origin + window.location.pathname)
  const [tables, setTables] = useState(10)
  const count = Math.min(Math.max(Number(tables) || 1, 1), 60)

  // Every table gets its own code (…?table=5) so the order knows where to be served.
  const tableUrl = (n) => {
    try {
      const u = new URL(url)
      u.searchParams.set('table', n)
      return u.toString()
    } catch {
      return url
    }
  }

  const input = 'mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 font-normal'

  return (
    <div className="min-h-screen bg-cream text-ink">
      <main className="mx-auto max-w-4xl px-5 py-8">
        <div className="no-print mb-8">
          <a href="#/" className="text-sm text-neutral-600 hover:underline">← Back to menu</a>
          <h1 className="mt-3 font-display text-4xl">Table QR codes</h1>
          <p className="mt-1 text-neutral-600">
            Print these and stick one on each table. Guests scan to open the menu.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_8rem]">
            <label className="text-sm font-medium">
              Menu address
              <input value={url} onChange={(e) => setUrl(e.target.value)} className={input} />
            </label>
            <label className="text-sm font-medium">
              Tables
              <input
                type="number"
                min="1"
                max="60"
                value={tables}
                onChange={(e) => setTables(e.target.value)}
                className={input}
              />
            </label>
          </div>

          <button
            onClick={() => window.print()}
            className="mt-5 min-h-12 rounded-full bg-ink px-6 font-semibold text-cream hover:bg-black"
          >
            Print cards
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {Array.from({ length: count }, (_, i) => (
            <div
              key={i}
              className="flex break-inside-avoid flex-col items-center rounded-3xl border border-neutral-300 bg-white p-5 text-center"
            >
              <p className="font-display text-2xl">{cafe.name}</p>
              <div className="my-3 rounded-xl bg-white p-2">
                <QRCodeSVG value={tableUrl(i + 1)} size={132} fgColor="#120e0b" />
              </div>
              <p className="text-sm text-neutral-600">Scan for the menu</p>
              <p className="mt-1 font-display text-xl text-amber-deep">Table {i + 1}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
