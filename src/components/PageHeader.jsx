// Sticky top bar used by the inner pages (Your order, Our story): back arrow + title.
export default function PageHeader({ title }) {
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
