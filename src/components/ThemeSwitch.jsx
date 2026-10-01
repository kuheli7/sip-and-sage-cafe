import { useTheme } from '../state/ThemeContext'
import { MoonIcon, SunIcon } from './ThemeToggle'

// A labelled two-option switch:  ☀ Light | ☾ Dark.
// It names both choices, so nobody has to guess what a lone icon does.
const OPTIONS = [
  { value: 'light', label: 'Light', Icon: SunIcon },
  { value: 'dark', label: 'Dark', Icon: MoonIcon },
]

export default function ThemeSwitch({ className = '' }) {
  const { theme, setTheme } = useTheme()

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={`inline-flex rounded-full bg-black/40 p-1 ring-1 ring-white/15 backdrop-blur ${className}`}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const on = theme === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => setTheme(value)}
            className={[
              'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition',
              on ? 'bg-amber text-ink' : 'text-cream/80 hover:text-cream',
            ].join(' ')}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        )
      })}
    </div>
  )
}
