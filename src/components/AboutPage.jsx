import { useEffect } from 'react'
import { cafe } from '../config/cafe'
import { story } from '../data/story'
import PageHeader from './PageHeader'
import SprigDivider from './SprigDivider'
import Footer from './Footer'
import { goToMenu } from '../lib/scroll'

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <>
      <PageHeader title="Our story" />

      <main className="mx-auto max-w-2xl px-5 pt-8 pb-16">
        <img
          src="/images/interior-2.jpg"
          alt="The café's seating area in soft daylight"
          className="aspect-[16/10] w-full rounded-3xl object-cover ring-1 ring-line"
        />

        <h2 className="mt-10 font-display text-[2.6rem] leading-[1.05] sm:text-5xl">{story.headline}</h2>

        {/* Lora regular: the one place on the site meant to be read slowly, like a page in a book */}
        <div className="font-item mt-6 space-y-5 text-[1.075rem] leading-[1.75] text-cream/90">
          <p className="text-[1.2rem] text-cream">{story.intro}</p>
          {story.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <figure className="my-12 border-l-2 border-amber pl-6">
          <blockquote className="font-display text-[1.7rem] leading-snug">“{story.quote}”</blockquote>
          <figcaption className="mt-3 text-sm text-latte">{story.quoteBy}</figcaption>
        </figure>

        <div className="grid grid-cols-2 gap-3">
          <img src="/images/interior-1.jpg" alt="" loading="lazy" className="aspect-[4/5] w-full rounded-3xl object-cover" />
          <img src="/images/cafe-latte.jpg" alt="" loading="lazy" className="mt-8 aspect-[4/5] w-full rounded-3xl object-cover" />
        </div>

        <SprigDivider className="mt-12 !px-0" />

        <h2 className="mt-10 font-display text-3xl">
          What we <span className="text-amber italic">care about</span>
        </h2>
        <ul className="mt-6 space-y-3">
          {story.values.map((v, i) => (
            <li key={v.title} className="flex gap-4 rounded-3xl bg-roast p-5 ring-1 ring-line">
              <span className="w-7 shrink-0 font-display text-3xl leading-none text-amber">{i + 1}</span>
              <div>
                <h3 className="font-item text-lg font-semibold">{v.title}</h3>
                <p className="mt-1 text-latte">{v.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-3xl bg-roast p-6 text-center ring-1 ring-line">
          <p className="font-display text-3xl">Come and sit a while.</p>
          <p className="mt-2 text-latte">{cafe.address}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href="#/"
              onClick={goToMenu}
              className="flex min-h-12 items-center justify-center rounded-full bg-amber font-semibold text-ink transition hover:bg-amber-deep"
            >
              See the menu
            </a>
            <a
              href={cafe.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-12 items-center justify-center rounded-full border border-line font-semibold transition hover:bg-roast-2"
            >
              Get directions
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
