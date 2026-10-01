import { cafe } from '../config/cafe'
import { photoCredits } from '../data/menu'

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 pt-10 pb-28 text-center text-sm text-latte">
      <p className="font-display text-2xl text-cream">
        {cafe.name} <span className="text-amber italic">{cafe.suffix}</span>
      </p>
      {cafe.instagram && (
        <p className="mt-1">
          <a
            href={`https://instagram.com/${cafe.instagram}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber"
          >
            @{cafe.instagram}
          </a>
        </p>
      )}
      <p className="mt-5 text-xs">{cafe.taxLabel} ({Math.round(cafe.taxRate * 100)}%) is added at checkout. Please tell us about any allergies.</p>

      <details className="mx-auto mt-5 max-w-md text-xs">
        <summary className="cursor-pointer hover:text-amber">Photo credits</summary>
        <ul className="mt-3 space-y-1 text-latte/80">
          {photoCredits.map(([area, names]) => (
            <li key={area}>
              <span className="text-latte">{area}:</span> {names}
            </li>
          ))}
          <li>Photos via Unsplash.</li>
        </ul>
      </details>
    </footer>
  )
}
