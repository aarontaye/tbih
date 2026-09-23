import type { Offer } from './types';

export const seedOffers: Offer[] = [
  {
    id: 'offer-001',
    slug: 'weekend-escape',
    title: 'Weekend Escape',
    description:
      'Unwind and recharge with a luxurious weekend getaway. Enjoy complimentary breakfast, late checkout, and access to our wellness facilities.',
    icon: 'CalendarHeart',
    perks: [
      '15% off room rate',
      'Complimentary breakfast for two',
      'Late checkout at 2:00 PM',
      'Access to spa and pool',
    ],
    valid_days: 'Friday – Sunday',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'offer-002',
    slug: 'business-stay',
    title: 'Business Stay',
    description:
      'Designed for the modern professional. Stay connected and productive with premium amenities and executive services tailored to your business needs.',
    icon: 'Briefcase',
    perks: [
      'Executive lounge access',
      'Complimentary high-speed Wi-Fi',
      'Daily press & coffee service',
      'Meeting room (2 hours/day)',
    ],
    valid_days: 'Monday – Thursday',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'offer-003',
    slug: 'romantic-getaway',
    title: 'Romantic Getaway',
    description:
      'Celebrate your love with an unforgettable romantic experience. From champagne on arrival to a candlelit dinner, every detail is crafted for two.',
    icon: 'Heart',
    perks: [
      'Champagne & chocolate on arrival',
      'Candlelit dinner for two',
      'Late checkout & room upgrade',
      'Couples spa treatment',
    ],
    valid_days: 'Any day',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'offer-004',
    slug: 'long-stay',
    title: 'Long Stay',
    description:
      'The longer you stay, the more you save. Enjoy exclusive rates and the comforts of home with our extended stay package, perfect for relocation or extended business.',
    icon: 'Building2',
    perks: [
      '20% off stays of 7+ nights',
      'Weekly housekeeping service',
      'Complimentary laundry (2 loads/week)',
      'Kitchenette access',
    ],
    valid_days: 'Any day',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'offer-005',
   slug: 'conference-package',
    title: 'Conference Package',
    description:
      'Host your next corporate event with confidence. Our all-inclusive conference package provides everything you need for a seamless and productive gathering.',
    icon: 'Users',
    perks: [
      'Full-day meeting room rental',
      'AV equipment & projector',
      'Coffee break & lunch catering',
      'Accommodation for 10 delegates',
    ],
    valid_days: 'Monday – Friday',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'offer-006',
    slug: 'airport-stay',
    title: 'Airport Stay',
    description:
      'Convenient and comfortable accommodation near the airport. Ideal for transit passengers and early departures, with complimentary shuttle service.',
    icon: 'Plane',
    perks: [
      'Complimentary airport shuttle',
      '24-hour flexible check-in',
      'Grab-and-go breakfast',
      'Free parking for 3 days',
    ],
    valid_days: 'Any day',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
  },
];
