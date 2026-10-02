import { cafe } from '../config/cafe'
import { DAYS, formatTime } from '../utils'
import { photoCredits } from '../data/menu'
import { rememberMenuScroll } from '../lib/scroll'
import { useCart } from '../state/CartContext'

const heading = 'text-[0.68rem] font-bold tracking-[0.2em] text-latte/70 uppercase'
const link = 'transition hover:text-amber'

export default function Footer() {
  const today = new Date().getDay()
  const hours = cafe.hours[today]
  const { count } = useCart()

  return (
    // Small, muted text throughout: a footer should sit quietly at the bottom, not compete with the menu.
    // Bottom padding leaves room for the floating buttons: the WhatsApp button, plus the cart bar above it
    // once something is in the order. (Without the extra room they covered the last credit lines.)
    <footer className={`border-t border-line pt-10 ${count > 0 ? 'pb-44' : 'pb-28'} text-[0.8125rem] leading-relaxed text-latte`}>
      <div className="mx-auto max-w-5xl px-5">
        {/* Wide screens: the brand on the left, the two link columns grouped on the right.
            (Three equal columns left big empty gaps between short pieces of text.) */}
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="sm:max-w-xs">
            <p className="font-display text-2xl text-cream/90">
              {cafe.name} <span className="text-amber italic">{cafe.suffix}</span>
            </p>
            <p className="mt-2">{cafe.tagline}</p>
            <a
              href="#/about"
              onClick={rememberMenuScroll}
              className={`mt-3 inline-block font-semibold text-amber ${link} hover:text-amber-deep`}
            >
              Our story →
            </a>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-14 lg:gap-20">
            <div>
              <h2 className={heading}>Visit</h2>
              <address className="mt-2.5 not-italic">{cafe.address}</address>
              <p className="mt-1">
                {DAYS[today]}: {hours ? `${formatTime(hours[0])} – ${formatTime(hours[1])}` : 'Closed'}
              </p>
              <a
                href={cafe.mapUrl}
                target="_blank"
                rel="noreferrer"
                className={`mt-2 inline-block ${link} underline decoration-line underline-offset-4`}
              >
                Get directions
              </a>
            </div>

            <div>
              <h2 className={heading}>Say hello</h2>
              <ul className="mt-2.5 space-y-1.5">
                <li>
                  <a href={`tel:${cafe.phone}`} className={link}>
                    Call us
                  </a>
                </li>
                <li>
                  <a href={`https://wa.me/${cafe.whatsapp}`} target="_blank" rel="noreferrer" className={link}>
                    WhatsApp
                  </a>
                </li>
                {cafe.instagram && (
                  <li>
                    <a href={`https://instagram.com/${cafe.instagram}`} target="_blank" rel="noreferrer" className={link}>
                      Instagram
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-5 text-xs sm:flex-row sm:items-start sm:justify-between">
          <p>
            © {new Date().getFullYear()} {cafe.name} {cafe.suffix}. Have an allergy? Please tell us before you order.
          </p>

          {/* credits sit at the far right on a wide screen, out of the way */}
          <details className="sm:text-right">
            <summary className="cursor-pointer hover:text-amber">Photo credits</summary>
            <ul className="mt-3 max-w-sm space-y-1 text-latte/80 sm:ml-auto">
              {photoCredits.map(([area, names]) => (
                <li key={area}>
                  <span className="text-latte">{area}:</span> {names}
                </li>
              ))}
              <li>Photos via Unsplash.</li>
            </ul>
          </details>
        </div>
      </div>
    </footer>
  )
}
