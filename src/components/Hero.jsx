import { useEffect, useState } from 'react'
import { cafe } from '../config/cafe'
import { getOpenStatus } from '../utils'

const Button = ({ href, primary, children, ...rest }) => (
  <a
    href={href}
    {...rest}
    className={[
      'inline-flex min-h-12 items-center justify-center rounded-full px-6 text-[0.95rem] font-semibold transition active:scale-[0.98]',
      primary
        ? 'col-span-2 bg-amber text-ink hover:bg-amber-deep sm:col-span-1'
        : 'bg-cream/10 text-cream/90 ring-1 ring-cream/20 backdrop-blur hover:bg-cream/20',
    ].join(' ')}
  >
    {children}
  </a>
)

export default function Hero() {
  const [status, setStatus] = useState(() => getOpenStatus(cafe.hours))

  // Phones get the small file so the first screen loads fast. Wide screens on a normal
  // connection get the sharper one (the small file is only 426×240 and looks soft when enlarged).
  const [videoSrc] = useState(() =>
    window.matchMedia('(min-width: 1024px)').matches && !navigator.connection?.saveData
      ? '/video/hero-latte-hd.mp4'
      : '/video/hero-latte.mp4',
  )

  useEffect(() => {
    const id = setInterval(() => setStatus(getOpenStatus(cafe.hours)), 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* The photo shows instantly (and stays for anyone who prefers reduced motion);
          the muted looping video fades in over it once it can play. */}
      <img
        src="/images/hero-latte.jpg"
        alt=""
        fetchPriority="high"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-[60%_center]"
      />
      <video
        className="hero-video absolute inset-0 -z-20 h-full w-full object-cover"
        src={videoSrc}
        poster="/images/hero-latte.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/25"
      />

      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 pt-6">
        <p className="font-display text-xl tracking-wide whitespace-nowrap">
          {cafe.name} <span className="text-amber italic">{cafe.suffix}</span>
        </p>
        <p className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3.5 py-1.5 text-[0.8rem] font-medium whitespace-nowrap ring-1 ring-white/15 backdrop-blur">
          <span
            className={`h-2 w-2 rounded-full ${status.open ? 'bg-leaf' : 'bg-amber'}`}
            aria-hidden="true"
          />
          {status.label}
        </p>
      </div>

      <div className="mx-auto mt-auto w-full max-w-5xl px-5 pb-14 text-center">
        <p className="rise text-sm font-semibold tracking-[0.25em] text-amber uppercase">
          Specialty coffee · Bengaluru
        </p>
        <h1
          className="rise mt-3 font-display text-[2.9rem] leading-[0.95] sm:text-8xl"
          style={{ animationDelay: '80ms' }}
        >
          Slow coffee,
          <br />
          <span className="text-amber italic">good company.</span>
        </h1>
        <p className="rise mx-auto mt-5 max-w-md text-lg text-cream/80" style={{ animationDelay: '160ms' }}>
          Fresh bakes, small-batch beans and a corner table with your name on it.
        </p>

        <div className="rise mt-8 mx-auto grid max-w-sm grid-cols-2 gap-3 sm:flex sm:max-w-none sm:justify-center" style={{ animationDelay: '240ms' }}>
          <Button primary href="#menu">
            View the menu
          </Button>
          <Button href={cafe.mapUrl} target="_blank" rel="noreferrer">
            Directions
          </Button>
          <Button href={`tel:${cafe.phone}`}>Call</Button>
        </div>
      </div>
    </header>
  )
}
