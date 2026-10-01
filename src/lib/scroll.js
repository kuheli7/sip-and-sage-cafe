// Where the guest was on the menu, so "back" drops them at the same dish.
export const menuScroll = { y: 0, toMenu: false }
export const rememberMenuScroll = () => {
  menuScroll.y = window.scrollY
  menuScroll.toMenu = false
}

// For links that mean "take me to the menu" (rather than "take me back to where I was"):
// the home page jumps straight to the start of the menu when it opens.
export const goToMenu = () => {
  menuScroll.toMenu = true
}
