'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  Calendar,
  Check,
  ChefHat,
  Heart,
  Mail,
  Monitor,
  Music,
  Phone,
  Sparkles,
  Users,
  Utensils,
  Wifi,
  Wine,
  X,
} from 'lucide-react';
import { createEventInquiry } from '@/lib/api';
import type { EventType } from '@/lib/data/types';

const heroImage =
  'https://images.pexels.com/photos/19569865/pexels-photo-19569865.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600';

const iconStrip = [
  { icon: Building2, label: 'Modern Venues' },
  { icon: Users, label: 'Professional Support' },
  { icon: Monitor, label: 'Advanced Technology' },
  { icon: ChefHat, label: 'Catering Excellence' },
  { icon: Wifi, label: 'High-Speed Wi-Fi' },
  { icon: Sparkles, label: 'Tailored Experiences' },
];

interface EventRow {
  type: EventType;
  title: string;
  description: string;
  image: string;
  capacity: string;
  features: { icon: typeof Users; label: string }[];
}

const eventRows: EventRow[] = [
  {
    type: 'conference',
    title: 'Conferences',
    description:
      'Host impactful conferences in our state-of-the-art venues equipped with advanced audiovisual technology, flexible seating arrangements, and dedicated event coordination. Perfect for keynotes, panel discussions, and large-scale corporate gatherings.',
    image:
      'https://images.pexels.com/photos/30584407/pexels-photo-30584407.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    capacity: 'Up to 200 guests',
    features: [
      { icon: Users, label: 'Up to 200 guests' },
      { icon: Monitor, label: 'AV Equipment' },
      { icon: Wifi, label: 'High-Speed Wi-Fi' },
      { icon: Utensils, label: 'Catering Available' },
    ],
  },
  {
    type: 'corporate',
    title: 'Corporate Meetings',
    description:
      'Professional meeting rooms designed for productivity and comfort. From boardroom sessions to training workshops, our spaces are fully equipped with modern technology and supported by our attentive events team.',
    image:
      'https://images.pexels.com/photos/16985201/pexels-photo-16985201.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    capacity: 'Up to 50 guests',
    features: [
      { icon: Users, label: 'Up to 50 guests' },
      { icon: Monitor, label: 'Smart Screens' },
      { icon: Wifi, label: 'Video Conferencing' },
      { icon: Utensils, label: 'Coffee Breaks' },
    ],
  },
  {
    type: 'wedding',
    title: 'Weddings',
    description:
      'Celebrate your special day in breathtaking surroundings. Our elegant ballrooms and expert wedding coordinators create unforgettable experiences, from intimate ceremonies to grand receptions with exquisite catering and décor.',
    image:
      'https://images.pexels.com/photos/36178502/pexels-photo-36178502.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    capacity: 'Up to 300 guests',
    features: [
      { icon: Users, label: 'Up to 300 guests' },
      { icon: Heart, label: 'Wedding Coordinator' },
      { icon: Utensils, label: 'Custom Menu' },
      { icon: Music, label: 'Entertainment' },
    ],
  },
  {
    type: 'private',
    title: 'Private Events',
    description:
      'From milestone birthdays to anniversary celebrations, our versatile venues provide the perfect setting for your private gatherings. Personalised menus, dedicated service, and an atmosphere of refined elegance await.',
    image:
      'https://images.pexels.com/photos/12689009/pexels-photo-12689009.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    capacity: 'Up to 100 guests',
    features: [
      { icon: Users, label: 'Up to 100 guests' },
      { icon: Wine, label: 'Bar Service' },
      { icon: Utensils, label: 'Custom Catering' },
      { icon: Sparkles, label: 'Personalised Décor' },
    ],
  },
  {
    type: 'grand_hall',
    title: 'Grand Celebration Hall',
    description:
      'Our magnificent grand hall is the pinnacle of event spaces in Addis Ababa. With soaring ceilings, crystal chandeliers, and luxurious finishes, it provides an unparalleled backdrop for galas, awards ceremonies, and the most prestigious celebrations.',
    image:
      'https://images.pexels.com/photos/32990165/pexels-photo-32990165.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    capacity: 'Up to 500 guests',
    features: [
      { icon: Users, label: 'Up to 500 guests' },
      { icon: Sparkles, label: 'Crystal Chandeliers' },
      { icon: Utensils, label: 'Gala Catering' },
      { icon: Music, label: 'Premium Sound System' },
    ],
  },
];

const eventTypes: { value: EventType; label: string }[] = [
  { value: 'conference', label: 'Conference' },
  { value: 'corporate', label: 'Corporate Meeting' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'private', label: 'Private Event' },
  { value: 'grand_hall', label: 'Grand Celebration Hall' },
];

export default function MeetingsEventsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [prefillType, setPrefillType] = useState<EventType | ''>('');
  const [form, setForm] = useState({
    event_type: '' as EventType | '',
    name: '',
    email: '',
    phone: '',
    preferred_date: '',
    guest_count: 50,
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const openModal = (type?: EventType) => {
    setPrefillType(type ?? '');
    setForm((prev) => ({ ...prev, event_type: type ?? prev.event_type }));
    setStatus('idle');
    setErrorMessage('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setStatus('idle');
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.event_type) {
      setStatus('error');
      setErrorMessage('Please select an event type.');
      return;
    }
    setStatus('loading');
    setErrorMessage('');
    try {
      await createEventInquiry({
        event_type: form.event_type,
        name: form.name,
        email: form.email,
        phone: form.phone,
        preferred_date: form.preferred_date,
        guest_count: form.guest_count,
        message: form.message,
      });
      setStatus('success');
      setForm({
        event_type: '' as EventType | '',
        name: '',
        email: '',
        phone: '',
        preferred_date: '',
        guest_count: 50,
        message: '',
      });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <div className="bg-[#f8f5ef]">
      {/* Hero */}
      <section className="relative flex min-h-[540px] items-center overflow-hidden bg-[#111]">
        <img
          src={heroImage}
          alt="Grand ballroom at Tewodros Belay International Hotel"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081018]/95 via-[#091019]/70 to-[#081018]/30" />
        <div className="container-hotel relative z-10 py-28">
          <div className="max-w-xl animate-fade-in">
            <span className="eyebrow">Gather</span>
            <h1 className="mt-5 font-serif text-5xl leading-tight text-white sm:text-6xl">
              Meetings &amp; Events
            </h1>
            <p className="mt-5 text-lg text-white/70">
              From intimate boardroom sessions to grand celebrations, our
              versatile venues and dedicated team ensure every event is
              extraordinary.
            </p>
            <button
              onClick={() => openModal()}
              className="btn-gold mt-8"
            >
              Request an Event Proposal
            </button>
          </div>
        </div>
      </section>

      {/* Icon strip */}
      <section className="bg-[#171717] text-white">
        <div className="container-hotel py-16">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
            {iconStrip.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-[#d0a657]">
                  <Icon className="h-6 w-6 text-[#cda257]" />
                </div>
                <span className="mt-3 text-[10px] uppercase tracking-wider text-white/60">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stacked event rows */}
      <section className="container-hotel py-20">
        <div className="mb-12 text-center">
          <span className="eyebrow">Our Venues</span>
          <h2 className="mt-3 font-serif text-4xl text-[#171513]">
            Spaces for Every Occasion
          </h2>
          <span className="mx-auto block h-px w-16 bg-[#b9893e]" />
        </div>

        <div className="space-y-6">
          {eventRows.map((row, idx) => (
            <div
              key={row.type}
              className="grid overflow-hidden border border-[#e6dfd4] bg-white lg:grid-cols-2"
            >
              <div
                className={`relative h-64 overflow-hidden lg:h-auto ${
                  idx % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <img
                  src={row.image}
                  alt={row.title}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div
                className={`flex flex-col justify-center p-8 lg:p-12 ${
                  idx % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <span className="eyebrow">{row.capacity}</span>
                <h3 className="mt-3 font-serif text-3xl text-[#171513]">
                  {row.title}
                </h3>
                <span className="gold-divider" />
                <p className="mt-2 max-w-lg text-sm leading-7 text-[#756e65]">
                  {row.description}
                </p>

                {/* Feature icons */}
                <div className="mt-6 flex flex-wrap gap-4">
                  {row.features.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 border border-[#e6dfd4] bg-[#faf8f4] px-4 py-2.5"
                    >
                      <Icon className="h-4 w-4 text-[#b9893e]" />
                      <span className="text-[11px] text-[#5f5851]">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    onClick={() => openModal(row.type)}
                    className="btn-gold w-fit"
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="relative overflow-hidden bg-[#171717] py-20 text-white">
        <div className="container-hotel text-center">
          <span className="eyebrow">Ready to Plan?</span>
          <h2 className="mt-4 font-serif text-4xl text-white sm:text-5xl">
            Let&apos;s Create Something Memorable
          </h2>
          <span className="mx-auto mt-4 block h-px w-16 bg-[#b9893e]" />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60">
            Tell us about your event and our dedicated team will craft a
            tailored proposal to bring your vision to life.
          </p>
          <button
            onClick={() => openModal()}
            className="btn-gold mt-8"
          >
            Request an Event Proposal
          </button>
        </div>
      </section>

      {/* Inquiry modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-10">
          <div className="relative w-full max-w-lg border border-[#e6dfd4] bg-white p-8 shadow-2xl">
            {/* Close button */}
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-4 top-4 text-[#a09890] transition-colors hover:text-[#171513]"
            >
              <X className="h-5 w-5" />
            </button>

            {status === 'success' ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f0ebe2]">
                  <Check className="h-8 w-8 text-[#b9893e]" />
                </div>
                <h3 className="mt-6 font-serif text-2xl text-[#171513]">
                  Inquiry Submitted!
                </h3>
                <p className="mt-3 text-sm text-[#756e65]">
                  Thank you for your interest. Our events team will contact you
                  within 24 hours to discuss your proposal.
                </p>
                <button
                  onClick={closeModal}
                  className="btn-gold mt-8"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <span className="eyebrow">Event Inquiry</span>
                <h3 className="mt-3 font-serif text-2xl text-[#171513]">
                  Request an Event Proposal
                </h3>
                <span className="gold-divider" />

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-[#a09890]">Event Type *</span>
                    <select
                      required
                      value={form.event_type}
                      onChange={(e) => setForm({ ...form, event_type: e.target.value as EventType })}
                      className="w-full border border-[#e0d8cc] bg-[#faf8f4] px-3 py-2.5 text-sm outline-none focus:border-[#b9893e]"
                    >
                      <option value="">Select event type</option>
                      {eventTypes.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-[#a09890]">Full Name *</span>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-[#e0d8cc] bg-[#faf8f4] px-3 py-2.5 text-sm outline-none focus:border-[#b9893e]"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-[#a09890]">Email *</span>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-[#e0d8cc] bg-[#faf8f4] px-3 py-2.5 text-sm outline-none focus:border-[#b9893e]"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-[#a09890]">Phone *</span>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-[#e0d8cc] bg-[#faf8f4] px-3 py-2.5 text-sm outline-none focus:border-[#b9893e]"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-[#a09890]">Preferred Date *</span>
                      <input
                        type="date"
                        required
                        value={form.preferred_date}
                        onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
                        className="w-full border border-[#e0d8cc] bg-[#faf8f4] px-3 py-2.5 text-sm outline-none focus:border-[#b9893e]"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-[#a09890]">Guest Count *</span>
                    <input
                      type="number"
                      required
                      min={1}
                      value={form.guest_count}
                      onChange={(e) => setForm({ ...form, guest_count: Number(e.target.value) })}
                      className="w-full border border-[#e0d8cc] bg-[#faf8f4] px-3 py-2.5 text-sm outline-none focus:border-[#b9893e]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-[#a09890]">Message</span>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={3}
                      placeholder="Tell us about your event vision, requirements, or questions…"
                      className="w-full border border-[#e0d8cc] bg-[#faf8f4] px-3 py-2.5 text-sm outline-none focus:border-[#b9893e]"
                    />
                  </label>

                  {status === 'error' && (
                    <p className="text-sm text-red-700" role="alert">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-gold w-full disabled:opacity-60"
                  >
                    {status === 'loading' ? 'Submitting…' : 'Submit Inquiry'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
