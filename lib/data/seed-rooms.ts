import type { Room } from './types';

export const seedRooms: Room[] = [
  {
    id: 'room-001',
    slug: 'deluxe-room',
    name: 'Deluxe Room',
    category: 'deluxe',
    short_description:
      'Contemporary comfort with elegant finishes and city views.',
    full_description:
      'Our Deluxe Rooms offer a refined retreat with contemporary design, premium bedding, and floor-to-ceiling windows overlooking the vibrant streets of Addis Ababa. Thoughtfully appointed with modern amenities to ensure a restful and productive stay.',
    price_per_night: 4500,
    currency: 'ETB',
    capacity_adults: 2,
    capacity_children: 1,
    size_sqm: 28,
    bed_type: 'Queen Bed',
    amenities: ['wifi', 'ac', 'smart_tv', 'minibar', 'work_desk', 'private_bathroom'],
    images: [
      'https://images.pexels.com/photos/2736384/pexels-photo-2736384.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/6466236/pexels-photo-6466236.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/6466496/pexels-photo-6466496.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'room-002',
    slug: 'executive-room',
    name: 'Executive Room',
    category: 'executive',
    short_description:
      'Elevated luxury with enhanced space and executive lounge access.',
    full_description:
      'Designed for the discerning business traveler, our Executive Rooms feature expanded living space, a dedicated work area, and complimentary access to the Executive Lounge. Enjoy panoramic city views, premium toiletries, and personalized service that exceeds expectations.',
    price_per_night: 6500,
    currency: 'ETB',
    capacity_adults: 2,
    capacity_children: 2,
    size_sqm: 38,
    bed_type: 'King Bed',
    amenities: ['wifi', 'ac', 'smart_tv', 'minibar', 'work_desk', 'private_bathroom'],
    images: [
      'https://images.pexels.com/photos/2725675/pexels-photo-2725675.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/6466289/pexels-photo-6466289.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/6467627/pexels-photo-6467627.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'room-003',
    slug: 'suite-room',
    name: 'Suite Room',
    category: 'suite',
    short_description:
      'Spacious one-bedroom suite with separate living area.',
    full_description:
      'Our Suite Rooms provide an exceptional blend of space and sophistication, featuring a separate living area, premium king bedroom, and a luxurious en-suite bathroom. Perfect for extended stays or those seeking an elevated level of comfort and privacy.',
    price_per_night: 9500,
    currency: 'ETB',
    capacity_adults: 3,
    capacity_children: 2,
    size_sqm: 55,
    bed_type: 'King Bed + Sofa Bed',
    amenities: ['wifi', 'ac', 'smart_tv', 'minibar', 'work_desk', 'private_bathroom'],
    images: [
      'https://images.pexels.com/photos/18285947/pexels-photo-18285947.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/26859049/pexels-photo-26859049.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/34645081/pexels-photo-34645081.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'room-004',
    slug: 'presidential-suite',
    name: 'Presidential Suite',
    category: 'presidential',
    short_description:
      'The pinnacle of luxury with panoramic views and private terrace.',
    full_description:
      'Experience the ultimate in luxury at our Presidential Suite. Spanning over 90 square meters, this extraordinary residence features a private terrace with sweeping views of Addis Ababa, a grand living and dining area, a dedicated butler service, and the finest furnishings and amenities available.',
    price_per_night: 18000,
    currency: 'ETB',
    capacity_adults: 4,
    capacity_children: 3,
    size_sqm: 95,
    bed_type: 'King Bed + Two Singles',
    amenities: ['wifi', 'ac', 'smart_tv', 'minibar', 'work_desk', 'private_bathroom'],
    images: [
      'https://images.pexels.com/photos/34645131/pexels-photo-34645131.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/6466484/pexels-photo-6466484.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
  },
];
