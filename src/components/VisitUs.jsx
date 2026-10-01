import { cafe } from '../config/cafe'
import { DAYS, formatTime } from '../utils'

export default function VisitUs() {
  const today = new Date().getDay()
  // Monday-first reads more naturally than Sunday-first
  const order = [1, 2, 3, 4, 5, 6, 0]

  return (
    <section id="visit" className="relative isolate mt-10 overflow-hidden">
      <img
        src="/images/interior-1.jpg"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/80" />

      <div className="mx-auto max-w-5xl px-5 py-16">
        <h2 className="font-display text-4xl sm:text-5xl">
          Come say <span className="text-amber italic">hi</span>
        </h2>
        <p className="mt-2 text-cream/80">{cafe.address}</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <dl className="rounded-3xl bg-roast/90 p-5 ring-1 ring-line backdrop-blur">
            {order.map((d) => {
              const h = cafe.hours[d]
              const isToday = d === today
              return (
                <div
                  key={d}
                  className={[
                    'flex justify-between py-2 text-[0.95rem]',
                    isToday ? 'font-semibold text-amber' : 'text-latte',
                  ].join(' ')}
                >
                  <dt>
                    {DAYS[d]}
                    {isToday && <span className="ml-2 text-xs">today</span>}
                  </dt>
                  <dd className="tabular-nums">
                    {h ? `${formatTime(h[0])} – ${formatTime(h[1])}` : 'Closed'}
                  </dd>
                </div>
              )
            })}
          </dl>

          <div className="flex flex-col justify-end gap-3">
            <a
              href={cafe.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-12 items-center justify-center rounded-full bg-amber font-semibold text-ink transition hover:bg-amber-deep active:scale-[0.98]"
            >
              Get directions
            </a>
            <a
              href={`tel:${cafe.phone}`}
              className="flex min-h-12 items-center justify-center rounded-full bg-cream/10 font-semibold text-cream/90 ring-1 ring-cream/20 backdrop-blur transition hover:bg-cream/20 active:scale-[0.98]"
            >
              Call us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
