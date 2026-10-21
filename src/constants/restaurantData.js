/**
 * Restaurant content, menu specials, testimonials, and navigation items.
 */

export const RESTAURANT_INFO = {
  name: 'Little Lemon',
  tagline: 'Chicago',
  shortDescription:
    'We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.',
  fullDescription:
    'Little Lemon opened in 1995 when two Italian brothers, Mario and Adrian, decided to bring their grandmothers authentic Mediterranean recipes to Chicago. Located in the vibrant heart of the city, we craft every dish using locally sourced ingredients, cold-pressed olive oils, and time-honored Mediterranean traditions.',
  address: {
    street: '123 South Michigan Avenue',
    city: 'Chicago',
    state: 'IL',
    zip: '60603',
  },
  phone: '(312) 555-0199',
  email: 'reservations@littlelemon.com',
  hours: [
    { days: 'Monday – Thursday', time: '11:00 AM – 10:00 PM' },
    { days: 'Friday – Saturday', time: '11:00 AM – 11:00 PM' },
    { days: 'Sunday', time: '12:00 PM – 9:00 PM' },
  ],
  socials: [
    { name: 'Instagram', url: 'https://instagram.com', handle: '@littlelemonchicago' },
    { name: 'Facebook', url: 'https://facebook.com', handle: 'LittleLemonChicago' },
    { name: 'Twitter', url: 'https://twitter.com', handle: '@littlelemon_chi' },
    { name: 'TripAdvisor', url: 'https://tripadvisor.com', handle: 'Little Lemon Restaurant' },
  ],
};

export const NAV_LINKS = [
  { id: 'nav-home', label: 'Home', href: '#home' },
  { id: 'nav-about', label: 'About', href: '#about' },
  { id: 'nav-menu', label: 'Menu', href: '#menu' },
  { id: 'nav-reservations', label: 'Reservations', href: '#reservations' },
  { id: 'nav-order', label: 'Order Online', href: '#order-online' },
  { id: 'nav-login', label: 'Login', href: '#login' },
];

export const SPECIALS = [
  {
    id: 'special-greek-salad',
    title: 'Greek Salad',
    price: '$12.99',
    description:
      'The famous Greek salad of crispy lettuce, peppers, olives, and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
    image: './images/greek-salad.jpg',
    alt: 'Fresh Greek Salad with ripe tomatoes, cucumber slices, kalamata olives, and a seasoned block of feta cheese in a ceramic bowl',
    deliveryTime: '20-30 min',
  },
  {
    id: 'special-bruschetta',
    title: 'Bruschetta',
    price: '$7.99',
    description:
      'Our Bruschetta is made from grilled artisanal sourdough bread smeared with roasted garlic, seasoned with sea salt, vine tomatoes, fresh basil, and extra virgin olive oil.',
    image: './images/bruschetta.jpg',
    alt: 'Plated sourdough bruschetta topped with diced fresh vine tomatoes, aromatic basil, and olive oil drizzle',
    deliveryTime: '15-25 min',
  },
  {
    id: 'special-lemon-dessert',
    title: 'Lemon Dessert',
    price: '$6.99',
    description:
      'Straight from nonnas handwritten recipe book, every last organic lemon has been sourced to craft an authentic lemon curd layered sponge cake dusted with powdered sugar.',
    image: './images/lemon-dessert.jpg',
    alt: 'Layered lemon dessert cake with zesty curd filling, sprinkled with confectioners sugar and garnished with a candied lemon wheel',
    deliveryTime: '15-20 min',
  },
];

export const TESTIMONIALS = [
  {
    id: 'review-1',
    name: 'Sophia Chen',
    role: 'Food Blogger & Local Guide',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
    comment:
      'The reservation system was seamless and our table was ready the second we walked in. The Greek Salad and lemon dessert were unforgettable!',
  },
  {
    id: 'review-2',
    name: 'Marcus Ramirez',
    role: 'Chicago Resident',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
    comment:
      'Celebrated our wedding anniversary here. Mario personally came by to recommend the daily special. Incredible hospitality and vibrant Mediterranean flavors.',
  },
  {
    id: 'review-3',
    name: 'Emily Davis',
    role: 'Verified Diner',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80',
    comment:
      'Booking online took under a minute. The outdoor patio has a charming ambiance, and the Bruschetta was crisp and bursting with flavor.',
  },
  {
    id: 'review-4',
    name: 'David Wilson',
    role: 'Corporate Event Host',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80',
    comment:
      'We booked a group table for 8 colleagues. Everything was handled with precision and grace. Little Lemon is our team’s new go-to restaurant.',
  },
];
