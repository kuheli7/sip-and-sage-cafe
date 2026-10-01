import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const KEY = 'sipsage:theme'
const META_COLOUR = { dark: '#120e0b', light: '#f6efe3' }

const ThemeContext = createContext(null)

// Dark is the default. A visitor's choice is remembered on their device.
// (index.html applies the saved choice before the page paints, so there is no flash.)
const initial = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initial)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLOUR[theme])
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      /* storage can be blocked (private mode): the choice just won't be remembered */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
