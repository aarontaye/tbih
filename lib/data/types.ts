export type RoomCategory = 'deluxe' | 'executive' | 'suite' | 'presidential';
export type RoomAmenity =
  | 'wifi'
  | 'ac'
  | 'smart_tv'
  | 'minibar'
  | 'work_desk'
  | 'private_bathroom';

export interface Room {
  id: string;
  slug: string;
  name: string;
  category: RoomCategory;
  short_description: string;
  full_description: string;
  price_per_night: number;
  currency: string;
  capacity_adults: number;
  capacity_children: number;
  size_sqm: number;
  bed_type: string;
  amenities: RoomAmenity[];
  images: string[];
  is_active: boolean;
  created_at: string;
}

export interface Offer {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  perks: string[];
  valid_days: string;
  is_active: boolean;
  created_at: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Booking {
  id: string;
  room_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  special_requests: string;
  promo_code: string;
  status: BookingStatus;
  total_price: number;
  created_at: string;
}

export type EventType =
  | 'conference'
  | 'corporate'
  | 'wedding'
  | 'private'
  | 'grand_hall';
export type InquiryStatus = 'new' | 'responded' | 'closed';

export interface EventInquiry {
  id: string;
  event_type: EventType;
  name: string;
  email: string;
  phone: string;
  preferred_date: string;
  guest_count: number;
  message: string;
  status: InquiryStatus;
  created_at: string;
}

export type MessageStatus = 'new' | 'read' | 'replied';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: MessageStatus;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

export type GalleryCategory =
  | 'hotel'
  | 'rooms'
  | 'dining'
  | 'wellness'
  | 'events'
  | 'experiences';

export interface GalleryImage {
  id: string;
  url: string;
  category: GalleryCategory;
  caption: string;
  sort_order: number;
}

export type AdminRole = 'admin' | 'staff';

export interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
  password: string;
  created_at: string;
}
