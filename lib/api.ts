import type {
  Room,
  Offer,
  Booking,
  EventInquiry,
  ContactMessage,
  NewsletterSubscriber,
  GalleryImage,
  AdminUser,
  EventType,
} from './data/types';
import { seedRooms } from './data/seed-rooms';
import { seedOffers } from './data/seed-offers';
import { seedGallery } from './data/seed-gallery';
import { seedAdminUsers } from './data/seed-admin';

// ─────────────────────────────────────────────────────────────
// localStorage-backed mock data layer
//
// This file is the single seam between mock data and a future
// Supabase backend. Pages call only these functions — never the
// seed arrays directly. Swapping to Supabase means replacing the
// implementations below while keeping the same function signatures.
// ─────────────────────────────────────────────────────────────

const STORAGE_KEYS = {
  bookings: 'tbh_bookings',
  eventInquiries: 'tbh_event_inquiries',
  contactMessages: 'tbh_contact_messages',
  newsletterSubscribers: 'tbh_newsletter_subscribers',
} as const;

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// ── localStorage helpers ──────────────────────────────────────

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function readStore<T>(key: string): T[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function writeStore<T>(key: string, data: T[]): void {
  if (!isBrowser()) return;
  localStorage.setItem(key, JSON.stringify(data));
}

// ── Rooms (read-only from seed — no writes yet) ───────────────

export function getRooms(): Room[] {
  return seedRooms.filter((r) => r.is_active);
}

export function getRoomBySlug(slug: string): Room | undefined {
  return seedRooms.find((r) => r.slug === slug && r.is_active);
}

export function getRoomById(id: string): Room | undefined {
  return seedRooms.find((r) => r.id === id && r.is_active);
}

export function getRoomsByCategory(category: Room['category']): Room[] {
  return seedRooms.filter((r) => r.category === category && r.is_active);
}

// ── Offers (read-only from seed) ──────────────────────────────

export function getOffers(): Offer[] {
  return seedOffers.filter((o) => o.is_active);
}

export function getOfferBySlug(slug: string): Offer | undefined {
  return seedOffers.find((o) => o.slug === slug && o.is_active);
}

// ── Gallery (read-only from seed) ─────────────────────────────

export function getGalleryImages(): GalleryImage[] {
  return [...seedGallery].sort((a, b) => a.sort_order - b.sort_order);
}

export function getGalleryByCategory(
  category: GalleryImage['category']
): GalleryImage[] {
  return seedGallery
    .filter((g) => g.category === category)
    .sort((a, b) => a.sort_order - b.sort_order);
}

// ── Admin Users (read-only from seed) ─────────────────────────

export function getAdminUsers(): AdminUser[] {
  return seedAdminUsers;
}

export function verifyAdminLogin(
  email: string,
  password: string
): AdminUser | null {
  const admin = seedAdminUsers.find(
    (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
  );
  return admin ?? null;
}

// ── Bookings (read + write, localStorage persisted) ───────────

export interface BookingInput {
  room_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  special_requests?: string;
  promo_code?: string;
  total_price: number;
}

export function getBookings(): Booking[] {
  return readStore<Booking>(STORAGE_KEYS.bookings);
}

export function getBookingById(id: string): Booking | undefined {
  return readStore<Booking>(STORAGE_KEYS.bookings).find((b) => b.id === id);
}

export function getBookingsByEmail(email: string): Booking[] {
  return readStore<Booking>(STORAGE_KEYS.bookings).filter(
    (b) => b.guest_email.toLowerCase() === email.toLowerCase()
  );
}

export function createBooking(input: BookingInput): Booking {
  const booking: Booking = {
    id: generateId('booking'),
    room_id: input.room_id,
    guest_name: input.guest_name,
    guest_email: input.guest_email,
    guest_phone: input.guest_phone,
    check_in: input.check_in,
    check_out: input.check_out,
    adults: input.adults,
    children: input.children,
    special_requests: input.special_requests ?? '',
    promo_code: input.promo_code ?? '',
    status: 'pending',
    total_price: input.total_price,
    created_at: new Date().toISOString(),
  };
  const all = readStore<Booking>(STORAGE_KEYS.bookings);
  all.push(booking);
  writeStore(STORAGE_KEYS.bookings, all);
  return booking;
}

export function updateBookingStatus(
  id: string,
  status: Booking['status']
): void {
  const all = readStore<Booking>(STORAGE_KEYS.bookings);
  const idx = all.findIndex((b) => b.id === id);
  if (idx !== -1) {
    all[idx].status = status;
    writeStore(STORAGE_KEYS.bookings, all);
  }
}

// ── Event Inquiries (read + write) ────────────────────────────

export interface EventInquiryInput {
  event_type: EventType;
  name: string;
  email: string;
  phone: string;
  preferred_date: string;
  guest_count: number;
  message: string;
}

export function getEventInquiries(): EventInquiry[] {
  return readStore<EventInquiry>(STORAGE_KEYS.eventInquiries);
}

export function createEventInquiry(input: EventInquiryInput): EventInquiry {
  const inquiry: EventInquiry = {
    id: generateId('inquiry'),
    event_type: input.event_type,
    name: input.name,
    email: input.email,
    phone: input.phone,
    preferred_date: input.preferred_date,
    guest_count: input.guest_count,
    message: input.message,
    status: 'new',
    created_at: new Date().toISOString(),
  };
  const all = readStore<EventInquiry>(STORAGE_KEYS.eventInquiries);
  all.push(inquiry);
  writeStore(STORAGE_KEYS.eventInquiries, all);
  return inquiry;
}

export function updateEventInquiryStatus(
  id: string,
  status: EventInquiry['status']
): void {
  const all = readStore<EventInquiry>(STORAGE_KEYS.eventInquiries);
  const idx = all.findIndex((e) => e.id === id);
  if (idx !== -1) {
    all[idx].status = status;
    writeStore(STORAGE_KEYS.eventInquiries, all);
  }
}

// ── Contact Messages (read + write) ───────────────────────────

export interface ContactMessageInput {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export function getContactMessages(): ContactMessage[] {
  return readStore<ContactMessage>(STORAGE_KEYS.contactMessages);
}

export function createContactMessage(
  input: ContactMessageInput
): ContactMessage {
  const msg: ContactMessage = {
    id: generateId('msg'),
    name: input.name,
    email: input.email,
    phone: input.phone,
    subject: input.subject,
    message: input.message,
    status: 'new',
    created_at: new Date().toISOString(),
  };
  const all = readStore<ContactMessage>(STORAGE_KEYS.contactMessages);
  all.push(msg);
  writeStore(STORAGE_KEYS.contactMessages, all);
  return msg;
}

export function updateContactMessageStatus(
  id: string,
  status: ContactMessage['status']
): void {
  const all = readStore<ContactMessage>(STORAGE_KEYS.contactMessages);
  const idx = all.findIndex((m) => m.id === id);
  if (idx !== -1) {
    all[idx].status = status;
    writeStore(STORAGE_KEYS.contactMessages, all);
  }
}

// ── Newsletter Subscribers (read + write) ─────────────────────

export function getNewsletterSubscribers(): NewsletterSubscriber[] {
  return readStore<NewsletterSubscriber>(STORAGE_KEYS.newsletterSubscribers);
}

export function subscribeToNewsletter(email: string): NewsletterSubscriber {
  const existing = readStore<NewsletterSubscriber>(
    STORAGE_KEYS.newsletterSubscribers
  );
  if (existing.find((s) => s.email.toLowerCase() === email.toLowerCase())) {
    return existing.find(
      (s) => s.email.toLowerCase() === email.toLowerCase()
    )!;
  }
  const sub: NewsletterSubscriber = {
    id: generateId('sub'),
    email,
    subscribed_at: new Date().toISOString(),
  };
  existing.push(sub);
  writeStore(STORAGE_KEYS.newsletterSubscribers, existing);
  return sub;
}

// ── Price calculation helper ──────────────────────────────────

export function calculateBookingTotal(
  room: Room,
  checkIn: string,
  checkOut: string
): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const nights = Math.max(
    1,
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  );
  return room.price_per_night * nights;
}
