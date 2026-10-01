import { story } from '../data/story'
import { rememberMenuScroll } from '../lib/scroll'

// A short invitation on the home page that leads to the full "Our story" page.
export default function StoryTeaser() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-6 pb-4">
      <a
        href="#/about"
        onClick={rememberMenuScroll}
        className="group relative isolate block overflow-hidden rounded-3xl ring-1 ring-line"
      >
        <img
          src="/images/interior-2.jpg"
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/40" />
        <span className="block px-6 pt-28 pb-7 sm:px-10 sm:pt-36">
          <span className="text-xs font-semibold tracking-[0.25em] text-amber uppercase">Our story</span>
          <span className="mt-2 block max-w-lg font-display text-3xl leading-tight sm:text-4xl">{story.headline}</span>
          <span className="mt-2 block max-w-md text-latte">{story.teaser}</span>
          <span className="mt-4 inline-flex items-center gap-2 font-semibold text-amber">
            Read our story{' '}
            <span aria-hidden="true" className="transition group-hover:translate-x-1">
              →
            </span>
          </span>
        </span>
      </a>
    </section>
  )
}
