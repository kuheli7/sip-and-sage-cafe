// Menu data. Edit freely — the layout updates itself.
// diet: 'veg' | 'egg' | 'nonveg'
// tag (optional): 'Bestseller' | 'New' | "Chef's pick"
// light (optional): true marks a drink or small bite that is suggested on the order page
// image: file in /public/images (replace with the café's own photos for a real client)

const img = (name) => `/images/${name}.jpg`

export const menu = [
  {
    id: 'coffee',
    name: 'Coffee',
    blurb: 'Single-origin beans, roasted in small batches.',
    items: [
      { name: 'Latte', desc: 'Silky steamed milk over a double shot, finished with latte art.', price: 170, diet: 'veg', image: img('cafe-latte') },
      { name: 'Flat White', desc: 'Velvety microfoam over a double shot. Strong, smooth, small.', price: 180, diet: 'veg', tag: 'Bestseller', image: img('pour') },
      { name: 'Cappuccino', desc: 'Equal parts espresso, milk and foam.', price: 160, diet: 'veg', image: img('cappuccino') },
      { name: 'Iced Latte', desc: 'Cold milk, ice and slow-pulled espresso.', price: 190, diet: 'veg', light: true, image: img('iced-latte') },
      { name: 'Jaggery Cold Brew', desc: '18-hour cold brew with milk, sweetened with jaggery.', price: 210, diet: 'veg', tag: "Chef's pick", image: img('cold-brew') },
    ],
  },
  {
    id: 'tea-and-more',
    name: 'Tea & More',
    blurb: 'For the days you want something gentler.',
    items: [
      { name: 'Masala Chai', desc: 'Ginger, cardamom and strong tea, poured fresh.', price: 90, diet: 'veg', light: true, image: img('chai-a') },
      { name: 'Matcha Latte', desc: 'Ceremonial matcha over cold milk. Served iced.', price: 230, diet: 'veg', tag: 'New', light: true, image: img('matcha') },
      { name: 'Hot Chocolate', desc: 'Dark chocolate, steamed milk, marshmallows.', price: 190, diet: 'veg', image: img('hot-chocolate') },
      { name: 'Fresh Lime Soda', desc: 'Sweet, salted or mixed. Very cold.', price: 100, diet: 'veg', light: true, image: img('lime-soda') },
    ],
  },
  {
    id: 'breakfast',
    name: 'Breakfast',
    blurb: 'Served until 12 noon.',
    items: [
      { name: 'Avocado Sourdough Toast', desc: 'Smashed avocado, cherry tomato, chilli flakes, lemon.', price: 260, diet: 'veg', tag: 'Bestseller', image: img('avocado-toast') },
      { name: 'Sunny-Side Egg Toast', desc: 'Fried egg on buttered sourdough with avocado.', price: 220, diet: 'egg', image: img('egg-toast') },
      { name: 'Granola Bowl', desc: 'Greek yoghurt, honey granola, blackberries.', price: 230, diet: 'veg', light: true, image: img('granola') },
      { name: 'Full Breakfast Plate', desc: 'Egg, baked beans, grilled tomato, mushrooms and toast.', price: 290, diet: 'egg', image: img('breakfast-plate') },
    ],
  },
  {
    id: 'bites',
    name: 'All-Day Bites',
    blurb: 'Comfort food that pairs with everything above.',
    items: [
      { name: 'Grilled Veg Ciabatta', desc: 'Roasted peppers, zucchini and aubergine, pesto spread.', price: 250, diet: 'veg', image: img('paneer-sandwich') },
      { name: 'Pesto Farfalle', desc: 'Basil pesto, cherry tomato and parmesan.', price: 290, diet: 'veg', tag: "Chef's pick", image: img('pasta') },
      { name: 'Chicken Club Sandwich', desc: 'Herb chicken, greens, tomato and garlic mayo.', price: 280, diet: 'nonveg', image: img('chicken-sandwich') },
      { name: 'Crispy Chicken Burger', desc: 'Buttermilk fried chicken, cheddar, pickled onion and house sauce in a brioche bun.', price: 320, diet: 'nonveg', tag: 'New', image: img('crispy-chicken') },
      { name: 'Buffalo Chicken Wings', desc: 'Six sticky wings tossed in buffalo sauce, with a cool ranch dip.', price: 310, diet: 'nonveg', image: img('wings') },
      { name: 'Chicken Pepperoni Pizza', desc: 'Stone-baked, mozzarella and a generous layer of spicy chicken pepperoni.', price: 380, diet: 'nonveg', image: img('pizza') },
      { name: 'Peri-Peri Fries', desc: 'Crisp fries, peri-peri dust, dip of your choice.', price: 170, diet: 'veg', light: true, image: img('fries') },
    ],
  },
  {
    id: 'desserts',
    name: 'Desserts',
    blurb: 'Baked fresh every morning.',
    items: [
      { name: 'Biscoff Cheesecake', desc: 'Creamy cheesecake on a biscuit base with caramel drizzle.', price: 240, diet: 'egg', tag: 'Bestseller', image: img('cheesecake') },
      { name: 'Brownie Sundae', desc: 'Warm brownie, vanilla ice cream, fudge sauce.', price: 220, diet: 'egg', image: img('brownie') },
      { name: 'Banana Walnut Loaf', desc: 'Moist and spiced. We toast it if you ask.', price: 150, diet: 'veg', light: true, image: img('banana-loaf') },
    ],
  },
]

// Photos are from Unsplash (free to use). Swap these for the café's own photos.
export const photoCredits = [
  ['Hero & latte', 'tabitha turner, Phil Desforges'],
  ['Hero video', 'K, via Pexels'],
  ['Coffee', 'Armin Lotfi, Andreas Behr, Demi DeHerrera, Nathan Dumlao'],
  ['Tea & more', 'Dhruval Upadhyay, Gaia&Co, Elena Leya, engin akyurt'],
  ['Food', 'Jasper Gribble, Ben Kolde, Natalie Behn, Deepansh Khurana, Eiliv Aceron, Eaters Collective, charlesdeluvio, Chad Montano, Sultan Abdulrazzaq, David Foodphototasty'],
  ['Desserts', 'Med Wael Laraiedh, Abhishek Hajare, Cody Chan'],
  ['Interior', 'Natali N'],
]
