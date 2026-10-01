import { SageSprig } from './icons'

// A quiet break between big sections: a thin line, a sprig of sage, a thin line.
export default function SprigDivider({ className = '' }) {
  return (
    <div className={`mx-auto flex max-w-5xl items-center gap-4 px-5 text-amber/70 ${className}`} role="presentation">
      <span className="h-px flex-1 bg-line" />
      <SageSprig className="h-10 w-10" />
      <span className="h-px flex-1 bg-line" />
    </div>
  )
}
