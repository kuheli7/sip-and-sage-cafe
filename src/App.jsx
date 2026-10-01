import { useEffect, useLayoutEffect, useState } from 'react'
import { menu } from './data/menu'
import { cafe } from './config/cafe'
import { CartProvider } from './state/CartContext'
import { menuScroll } from './lib/scroll'
import Hero from './components/Hero'
import Favourites from './components/Favourites'
import CategoryNav from './components/CategoryNav'
import MenuSection from './components/MenuSection'
import ItemDialog from './components/ItemDialog'
import CartBar from './components/CartBar'
import OrderPage from './components/OrderPage'
import WhatsAppButton from './components/WhatsAppButton'
import StoryTeaser from './components/StoryTeaser'
import AboutPage from './components/AboutPage'
import VisitUs from './components/VisitUs'
import Footer from './components/Footer'
import QrPage from './components/QrPage'

const useHashRoute = () => {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

function MenuPage({ diet, setDiet }) {
  const [active, setActive] = useState(menu[0].id)
  const [selected, setSelected] = useState(null)

  // Coming back from "Your order" or "Our story": land on the same dish the guest left,
  // unless they asked for the menu itself, in which case start at the top of it.
  useLayoutEffect(() => {
    if (menuScroll.toMenu) {
      menuScroll.toMenu = false
      const menuTop = document.getElementById('menu').getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: menuTop, behavior: 'instant' })
    } else {
      window.scrollTo({ top: menuScroll.y, behavior: 'instant' })
    }
  }, [])

  // Highlight the category chip for whichever section is under the reader's eye.
  useEffect(() => {
    const sections = document.querySelectorAll('[data-category]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-25% 0px -65% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [diet])

  return (
    <>
      <Hero />
      <Favourites onSelect={setSelected} />
      {/* the nav sticks only while this wrapper is on screen, so it lets go before "Visit us" */}
      <div id="menu" className="-scroll-mt-18">
        {/* tabs only for categories that still have something to show under the current filter */}
        <CategoryNav
          categories={menu.filter((c) => diet === 'all' || c.items.some((i) => i.diet === diet))}
          active={active}
          diet={diet}
          onDiet={setDiet}
        />
        <main className="mx-auto max-w-5xl px-5">
          <p className="pt-6 text-sm text-latte">
            Prices are before {cafe.taxLabel} ({Math.round(cafe.taxRate * 100)}%), which is added when you order.
          </p>
          {menu.map((category) => (
            <MenuSection key={category.id} category={category} diet={diet} onSelect={setSelected} />
          ))}
        </main>
      </div>
      <StoryTeaser />
      <VisitUs />
      <Footer />

      <ItemDialog item={selected} onClose={() => setSelected(null)} />
      <CartBar />
      <WhatsAppButton />
    </>
  )
}

export default function App() {
  const hash = useHashRoute()
  const [diet, setDiet] = useState('all') // 'all' | 'veg' | 'nonveg' — lives here so it survives a trip to the order page

  let page
  if (hash.startsWith('#/qr')) page = <QrPage />
  else if (hash.startsWith('#/order')) page = <OrderPage />
  else if (hash.startsWith('#/about')) page = <AboutPage />
  else page = <MenuPage diet={diet} setDiet={setDiet} />

  return <CartProvider>{page}</CartProvider>
}
