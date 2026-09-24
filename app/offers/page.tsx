'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  Building2,
  CalendarHeart,
  Check,
  Gift,
  Heart,
  Mail,
  Plane,
  Users,
} from 'lucide-react';
import { getOffers, subscribeToNewsletter } from '@/lib/api';
import type { Offer } from '@/lib/data/types';

const heroImage =
  'https://images.pexels.com/photos/17057034/pexels-photo-17057034.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600';

const offerImages = [
  'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/261949/pexels-photo-261949.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/1006293/pexels-photo-1006293.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

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

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      await subscribeToNewsletter(email);
      setEmail('');
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong.');
    }
  };

  return (
    <div className="bg-[#f8f5ef]">
      <section className="relative flex min-h-[540px] items-center overflow-hidden bg-[#111]">
        <img src={heroImage} alt="Elegant hotel room prepared for a special stay" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090d]/95 via-[#091019]/70 to-[#081018]/25" />
        <div className="container-hotel relative z-10 py-28">
          <div className="max-w-xl animate-fade-in">
            <span className="eyebrow">Offers &amp; Packages</span>
            <h1 className="mt-5 max-w-md font-serif text-5xl leading-[1.08] text-white sm:text-6xl">Exclusivity Made for You</h1>
            <span className="gold-divider" />
            <p className="max-w-md text-lg leading-7 text-white/70">Handpicked offers for every kind of journey.</p>
          </div>
        </div>
      </section>

      <section className="container-hotel py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center"><span className="eyebrow">Special Offers</span><h2 className="mt-3 font-serif text-4xl text-[#171513] sm:text-5xl">Find the Perfect Stay</h2><span className="mx-auto mt-5 block h-px w-16 bg-[#b9893e]" /></div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((offer: Offer, index) => {
            const Icon = iconMap[offer.icon] ?? Briefcase;
            return (
              <article key={offer.id} className="group flex flex-col overflow-hidden border border-[#e6dfd4] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-56 overflow-hidden">
                  <img src={offerImages[index % offerImages.length]} alt={offer.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-6 flex h-14 w-14 translate-y-1/2 items-center justify-center rounded-full border-4 border-[#f8f5ef] bg-[#c99b4a] text-white shadow-lg"><Icon className="h-6 w-6" /></div>
                </div>
                <div className="flex flex-1 flex-col p-6 pt-10">
                  <h3 className="font-serif text-2xl text-[#171513]">{offer.title}</h3>
                  <span className="gold-divider" />
                  <p className="text-sm leading-6 text-[#756e65]">{offer.description}</p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {offer.perks.map((perk) => <li key={perk} className="flex items-start gap-2.5 text-sm text-[#5f5851]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#b9893e]" /><span>{perk}</span></li>)}
                  </ul>
                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#eee8df] pt-5"><span className="text-[10px] uppercase tracking-[0.15em] text-[#a09890]">{offer.valid_days}</span><Link href="/book" className="btn-gold px-4 py-2.5 text-[10px]">Discover Offer <ArrowRight className="ml-2 h-3.5 w-3.5" /></Link></div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container-hotel pb-24">
        <div className="flex flex-col items-start justify-between gap-6 border border-[#302b24] bg-[#171717] px-7 py-7 text-white sm:flex-row sm:items-center sm:px-10"><div className="flex items-center gap-5"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#d0a657] text-[#d0a657]"><Gift className="h-7 w-7" /></div><div><span className="eyebrow">More Reasons to Stay</span><p className="mt-2 max-w-md text-sm text-white/70">Check back often for exclusive seasonal offers and member-only deals.</p></div></div><form onSubmit={handleSubscribe} className="flex w-full max-w-md flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" /><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" className="w-full border border-white/15 bg-[#0f0f0f] py-3 pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#d0a657]" /></div><button type="submit" disabled={status === 'loading'} className="btn-gold whitespace-nowrap px-5 py-3 text-[10px] disabled:opacity-60">{status === 'loading' ? 'Joining…' : 'Join Newsletter'} <ArrowRight className="ml-2 h-3.5 w-3.5" /></button></form></div>
        {status === 'success' && <p className="mt-3 text-right text-sm text-[#9a6f2e]" role="status">Thank you for subscribing. Watch your inbox for our latest offers.</p>}
        {status === 'error' && <p className="mt-3 text-right text-sm text-red-700" role="alert">{errorMessage}</p>}
      </section>
    </div>
  );
}
