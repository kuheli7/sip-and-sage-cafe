import { cafe } from '../config/cafe'
import { useCart } from '../state/CartContext'

export default function WhatsAppButton() {
  const { count } = useCart()

  return (
    <a
      href={`https://wa.me/${cafe.whatsapp}?text=${encodeURIComponent('Hi! I have a question.')}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Message us on WhatsApp"
      // Left edge, so it never covers the "Add" buttons on the right.
      // Sits above the "View order" bar when there is one, so the two never overlap.
      className={[
        'no-print fixed left-4 z-30 grid h-12 w-12 place-items-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/40 transition-all hover:scale-105 active:scale-95',
        count > 0 ? 'bottom-24' : 'bottom-5',
      ].join(' ')}
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.13.56 4.2 1.62 6.03L4 29l8.1-1.58a12 12 0 0 0 3.94.66C22.68 28.08 28 22.68 28 16.04 28 9.4 22.68 3 16.04 3zm0 22.04c-1.2 0-2.37-.32-3.4-.93l-.24-.15-4.8.94.98-4.67-.16-.25a9.97 9.97 0 0 1-1.55-5.3c0-5.5 4.5-9.97 10.05-9.97 5.5 0 9.96 4.47 9.96 9.97 0 5.5-4.46 10.36-9.84 10.36zm5.47-7.46c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.68-1.64-.93-2.25-.24-.58-.5-.5-.68-.5h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.1 3.2 5.1 4.5.72.3 1.28.5 1.7.62.72.23 1.37.2 1.88.12.58-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
      </svg>
    </a>
  )
}
