/**
 * Little Lemon reservation occasions and seating options
 */

export const OCCASIONS = [
  { value: 'none', label: 'No special occasion' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'business', label: 'Business Dining' },
  { value: 'other', label: 'Other' },
];

export const SEATING_OPTIONS = [
  { id: 'seating-standard', value: 'standard', label: 'Standard Indoor Dining' },
  { id: 'seating-outdoor', value: 'outdoor', label: 'Outdoor Patio' },
  { id: 'seating-bar', value: 'bar', label: 'Bar High-top' },
];

export const DEFAULT_TIMES = [
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
];
