'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  Building2,
  CalendarHeart,
  Check,
  Heart,
  Mail,
  Plane,
  Users,
} from 'lucide-react';
import { getOffers } from '@/lib/api';
import type { Offer } from '@/lib/data/types';

const heroImage =
  'https://images.pexels.com/photos/17057034/pexels-photo-17057034.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600';

const iconMap: Record<string, typeof Briefcase> = {
  CalendarHeart,
  Briefcase,
  Heart,
  Building2,
  Users,
  Plane,
};

export default function OffersPage() {
  const offers = getOffers();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setErrorMessage('');
    try {
      const { subscribeToNewsletter } = await import('@/lib/api');
      await subscribeToNewsletter(email);
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <div className="bg-[#f8f5ef]">
      {/* Hero */}
      <section className="relative flex min-h-[480px] items-center overflow-hidden bg-[#111]">
        <img
          src={heroImage}
          alt="Special offers at Tewodros Belay International Hotel"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081018]/95 via-[#091019]/70 to-[#081018]/30" />
        <div className="container-hotel relative z-10 py-28">
          <div className="max-w-xl animate-fade-in">
            <span className="eyebrow">Special Deals</span>
            <h1 className="mt-5 font-serif text-5xl leading-tight text-white sm:text-6xl">
              Offers &amp; Packages
            </h1>
            <p className="mt-5 text-lg text-white/70">
              Exclusive deals crafted to make every stay more rewarding —
              whether you are here for business, romance, or relaxation.
            </p>
          </div>
        </div>
      </section>

      {/* Offers grid */}
      <section className="container-hotel py-20">
        <div className="mb-12 text-center">
          <span className="eyebrow">Curated for You</span>
          <h2 className="mt-3 font-serif text-4xl text-[#171513]">
            Choose Your Perfect Package
          </h2>
          <span className="mx-auto block h-px w-16 bg-[#b9893e]" />
        </div>

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((offer: Offer) => {
            const Icon = iconMap[offer.icon] ?? Briefcase;
            return (
              <article
                key={offer.id}
                className="group flex flex-col overflow-hidden border border-[#e6dfd4] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Icon badge */}
                <div className="relative flex h-44 items-center justify-center overflow-hidden bg-[#171717]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c] to-[#0f0f0f]" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[#d0a657]/30 bg-[#171717]">
                    <Icon className="h-7 w-7 text-[#cda257]" />
                  </div>
                  <span className="absolute bottom-4 left-6 text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
                    {offer.valid_days}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-serif text-2xl text-[#171513]">
                    {offer.title}
                  </h3>
                  <span className="gold-divider" />
                  <p className="text-sm leading-7 text-[#756e65]">
                    {offer.description}
                  </p>

                  {/* Perks checklist */}
                  <ul className="mt-6 flex-1 space-y-3">
                    {offer.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-start gap-3 text-sm text-[#5f5851]"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f0ebe2]">
                          <Check className="h-3 w-3 text-[#b9893e]" />
                        </span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href="/book"
                    className="mt-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#171513] transition-colors hover:text-[#b9893e]"
                  >
                    Discover Offer
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Newsletter signup bar */}
      <section className="bg-[#171717] text-white">
        <div className="container-hotel py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="eyebrow">More Reasons to Stay</span>
              <h2 className="mt-4 font-serif text-4xl text-white sm:text-5xl">
                Get Exclusive Offers Delivered
              </h2>
              <span className="block h-px w-16 bg-[#b9893e] my-4" />
              <p className="max-w-lg text-sm leading-7 text-white/60">
                Subscribe to our newsletter and be the first to know about
                seasonal promotions, special packages, and exclusive events
                at Tewodros Belay International Hotel.
              </p>
            </div>

            <div>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full border border-white/15 bg-[#0f0f0f] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#d0a657]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center justify-center bg-[#d0a657] px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#17120b] transition-colors hover:bg-[#e2bd73] disabled:opacity-60"
                >
                  {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>

              {status === 'success' && (
                <p className="mt-3 text-sm text-[#cda257]" role="status">
                  Thank you for subscribing! Check your inbox for confirmation.
                </p>
              )}
              {status === 'error' && (
                <p className="mt-3 text-sm text-red-400" role="alert">
                  {errorMessage || 'Something went wrong. Please try again.'}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
