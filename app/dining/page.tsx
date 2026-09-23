'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  ChefHat,
  Clock,
  Coffee,
  Smartphone,
  Soup,
  Utensils,
  Users,
  Wine,
} from 'lucide-react';

const heroImage =
  'https://images.pexels.com/photos/33097101/pexels-photo-33097101.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600';
const introImage =
  'https://images.pexels.com/photos/6327536/pexels-photo-6327536.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const restaurantImage =
  'https://images.pexels.com/photos/34874927/pexels-photo-34874927.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const breakfastImage =
  'https://images.pexels.com/photos/29086307/pexels-photo-29086307.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const ethiopianImage =
  'https://images.pexels.com/photos/18541972/pexels-photo-18541972.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const privateDiningImage =
  'https://images.pexels.com/photos/28059309/pexels-photo-28059309.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const phoneMockupImage =
  'https://images.pexels.com/photos/4008580/pexels-photo-4008580.jpeg?auto=compress&cs=tinysrgb&h=650&w=400';

const features = [
  {
    eyebrow: 'Restaurant',
    title: 'International Cuisine & Ethiopian Specialties',
    description:
      'Our flagship restaurant blends global flavours with authentic Ethiopian dishes, prepared by award-winning chefs using locally sourced ingredients.',
    image: restaurantImage,
    buttonText: 'View Menu',
    buttonHref: '/contact',
    note: null,
  },
  {
    eyebrow: 'Breakfast',
    title: 'A Bright Start to Every Morning',
    description:
      'Begin your day with a lavish breakfast buffet featuring fresh pastries, tropical fruits, made-to-order eggs, and traditional Ethiopian coffee.',
    image: breakfastImage,
    buttonText: 'Discover Breakfast',
    buttonHref: '/contact',
    note: null,
  },
  {
    eyebrow: 'Ethiopian Experience',
    title: 'Authentic Ethiopian Dining Journey',
    description:
      'Immerse yourself in the rich heritage of Ethiopian cuisine. Share injera with friends, savour fiery wats, and experience a traditional coffee ceremony.',
    image: ethiopianImage,
    buttonText: 'Verify Availability',
    buttonHref: '/contact',
    note: 'Available experiences may vary',
  },
  {
    eyebrow: 'Private Dining',
    title: 'Intimate Gatherings & Celebrations',
    description:
      'Reserve an exclusive private dining room for your special occasion. Personalised menus, dedicated service, and an atmosphere of refined elegance.',
    image: privateDiningImage,
    buttonText: 'Inquire',
    buttonHref: '/contact',
    note: 'Private dining is subject to availability',
  },
];

const tableIcons = [
  { icon: Utensils, label: 'Restaurant' },
  { icon: Coffee, label: 'Breakfast' },
  { icon: Soup, label: 'Ethiopian Experience' },
  { icon: Wine, label: 'Private Dining' },
  { icon: Smartphone, label: 'MenuBet Digital Menu' },
];

export default function DiningPage() {
  const [form, setForm] = useState({
    date: '',
    time: '',
    guests: 2,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[#f8f5ef]">
      {/* Hero with reservation bar */}
      <section className="relative flex min-h-[600px] items-end overflow-visible bg-[#111]">
        <img
          src={heroImage}
          alt="Fine dining at Tewodros Belay International Hotel"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0c]/95 via-[#0a0b0c]/60 to-[#0a0b0c]/30" />
        <div className="container-hotel relative z-10 pb-32 pt-28">
          <div className="max-w-2xl animate-fade-in">
            <span className="eyebrow">Culinary</span>
            <h1 className="mt-5 font-serif text-5xl leading-tight text-white sm:text-6xl">
              Dining
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/70">
              A journey of flavours — from international fine dining to
              authentic Ethiopian specialities.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20 mx-auto w-full max-w-5xl translate-y-1/2 px-4">
          <form
            onSubmit={handleSubmit}
            className="grid gap-px overflow-hidden border border-white/10 bg-white/10 shadow-2xl backdrop-blur-md sm:grid-cols-[1fr_1fr_1fr_auto]"
          >
            <label className="flex min-h-[70px] flex-col justify-center bg-[#171717]/95 px-5 py-3">
              <span className="mb-2 flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.18em] text-white/55">
                <CalendarDays className="h-3 w-3 text-[#d0a657]" /> Date
              </span>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]"
              />
            </label>
            <label className="flex min-h-[70px] flex-col justify-center bg-[#171717]/95 px-5 py-3">
              <span className="mb-2 flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.18em] text-white/55">
                <Clock className="h-3 w-3 text-[#d0a657]" /> Time
              </span>
              <select
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full appearance-none bg-transparent text-sm text-white outline-none"
              >
                <option value="" className="bg-[#171717]">Select time</option>
                {[
                  '07:00', '08:00', '09:00', '10:00',
                  '12:00', '13:00', '14:00',
                  '18:00', '19:00', '20:00', '21:00',
                ].map((t) => (
                  <option key={t} value={t} className="bg-[#171717]">{t}</option>
                ))}
              </select>
            </label>
            <label className="flex min-h-[70px] flex-col justify-center bg-[#171717]/95 px-5 py-3">
              <span className="mb-2 flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.18em] text-white/55">
                <Users className="h-3 w-3 text-[#d0a657]" /> Guests
              </span>
              <select
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                className="w-full appearance-none bg-transparent text-sm text-white outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n} className="bg-[#171717]">
                    {n} {n > 1 ? 'Guests' : 'Guest'}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="flex min-h-[70px] items-center justify-center gap-2 bg-[#d0a657] px-7 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#17120b] transition-colors hover:bg-[#e2bd73]"
            >
              Check Availability
            </button>
          </form>
        </div>
      </section>

      {/* Intro section */}
      <section className="container-hotel grid items-center gap-0 pt-44 lg:grid-cols-2 lg:py-36">
        <div className="relative order-2 min-h-[380px] overflow-hidden lg:order-1">
          <img
            src={introImage}
            alt="Gourmet plated dish in an elegant restaurant"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="order-1 flex flex-col justify-center bg-[#f8f5ef] py-8 pl-0 lg:order-2 lg:py-8 lg:pl-20">
          <span className="eyebrow">Our Philosophy</span>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-[#171513] sm:text-5xl">
            Taste. Gather. <span className="text-[#b9893e]">Experience.</span>
          </h2>
          <span className="gold-divider" />
          <p className="max-w-md text-sm leading-7 text-[#756e65]">
            At Tewodros Belay International Hotel, dining is more than a meal —
            it is a celebration of culture, craft, and connection. Our chefs
            source the finest local and international ingredients to create
            dishes that delight the senses and tell a story with every bite.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/contact" className="btn-gold w-fit">
              View Menu
            </Link>
            <span className="flex items-center gap-2 text-xs text-[#a09890]">
              <Smartphone className="h-4 w-4 text-[#b9893e]" />
              Powered by MenuBet Digital Menu
            </span>
          </div>
        </div>
      </section>

      {/* Stacked feature rows */}
      <section className="container-hotel space-y-6 pb-20">
        {features.map((feature, idx) => (
          <div
            key={feature.eyebrow}
            className="grid overflow-hidden border border-[#e6dfd4] bg-white lg:grid-cols-2"
          >
            <div
              className={`relative h-64 overflow-hidden lg:h-auto ${
                idx % 2 === 1 ? 'lg:order-2' : ''
              }`}
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div
              className={`flex flex-col justify-center p-8 lg:p-12 ${
                idx % 2 === 1 ? 'lg:order-1' : ''
              }`}
            >
              <span className="eyebrow">{feature.eyebrow}</span>
              <h3 className="mt-3 font-serif text-3xl text-[#171513]">
                {feature.title}
              </h3>
              <span className="gold-divider" />
              <p className="mt-2 max-w-lg text-sm leading-7 text-[#756e65]">
                {feature.description}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href={feature.buttonHref} className="btn-gold w-fit">
                  {feature.buttonText}{' '}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                {feature.note && (
                  <span className="text-xs italic text-[#a09890]">
                    {feature.note}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Dark icon strip with phone mockup */}
      <section className="bg-[#171717] text-white">
        <div className="container-hotel grid items-center gap-12 py-24 lg:grid-cols-[1fr_300px]">
          <div>
            <span className="eyebrow">Reservations</span>
            <h2 className="mt-4 font-serif text-4xl text-white sm:text-5xl">
              Your Table, Your Way
            </h2>
            <span className="block h-px w-16 bg-[#b9893e] my-4" />
            <p className="max-w-lg text-sm leading-7 text-white/60">
              Whether it is a leisurely breakfast, a business lunch, or a
              candlelit dinner, we have the perfect setting waiting for you.
              Browse our digital menu, scan the QR code at your table, or let
              our team craft a bespoke dining experience.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {tableIcons.map(({ icon: Icon, label }) => (
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
          <div className="relative mx-auto flex max-w-[280px] flex-col items-center">
            <div className="relative w-full overflow-hidden rounded-[2rem] border-4 border-white/10 bg-[#0f0f0f] shadow-2xl">
              <img
                src={phoneMockupImage}
                alt="Digital menu on smartphone"
                className="h-[420px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/60 to-transparent" />
            </div>
            <div className="absolute -bottom-4 flex h-20 w-20 flex-col items-center justify-center rounded-lg border-2 border-[#d0a657] bg-[#171717]/95 text-center shadow-xl">
              <div className="grid grid-cols-5 gap-px p-1.5">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-1.5 w-1.5 bg-[#d0a657]"
                  />
                ))}
              </div>
              <span className="mt-1 text-[7px] uppercase tracking-wider text-[#d0a657]">
                Scan to View Menu
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
