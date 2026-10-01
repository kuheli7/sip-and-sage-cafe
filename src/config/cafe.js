// Everything that is specific to ONE café lives here.
// To reuse this site for another café: edit this file + src/data/menu.js. Nothing else.

export const cafe = {
  name: 'Sip & Sage',
  suffix: 'Café',
  tagline: 'Slow coffee, fresh bites, good company.',
  currency: '₹',

  taxRate: 0.05, // 5% GST, added at checkout. Prices on the menu are before tax.
  taxLabel: 'GST',

  tables: 12, // how many tables guests can choose from when ordering
  demoMode: true, // shows "orders are saved on this device only" until a real backend is connected

  phone: '+919999999999', // used for the Call button
  whatsapp: '919999999999', // country code + number, no "+" or spaces
  instagram: 'sipandsage.demo',

  address: '12, Garden Road, Bengaluru 560029',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bengaluru+cafe',

  // 0 = Sunday … 6 = Saturday. Times are 24h "HH:MM". Use null for closed.
  hours: {
    0: ['09:00', '22:00'],
    1: ['08:00', '22:00'],
    2: ['08:00', '22:00'],
    3: ['08:00', '22:00'],
    4: ['08:00', '22:00'],
    5: ['08:00', '23:00'],
    6: ['08:00', '23:00'],
  },
}
