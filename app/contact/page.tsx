'use client';

import { useState } from 'react';
import {
  ArrowRight,
  Car,
  Check,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Plane,
  Send,
  Smartphone,
} from 'lucide-react';
import { createContactMessage } from '@/lib/api';

const heroImage =
  'https://images.pexels.com/photos/39459699/pexels-photo-39459699.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600';
const transferImage =
  'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const contactCards = [
  {
    icon: MapPin,
    title: 'Location',
    content: <>CMC Road<br />Tsehay Real Estate<br />Addis Ababa, Ethiopia</>,
    image:
      'https://images.pexels.com/photos/39459699/pexels-photo-39459699.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Smartphone,
    title: 'Phone',
    content: <><a href="tel:+251116292929">+251 11 629 2929</a><br /><a href="tel:+251116293939">+251 11 629 3939</a></>,
    image:
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Mail,
    title: 'Email',
    content: <a href="mailto:info@tewodrosbelayhotel.com">info@tewodrosbelayhotel.com</a>,
    image:
      'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    content: <><a href="https://wa.me/251116292929" target="_blank" rel="noreferrer">+251 11 629 2929</a><br /><span>Chat with us on WhatsApp</span></>,
    image:
      'https://images.pexels.com/photos/5699382/pexels-photo-5699382.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Headphones,
    title: 'Reservations',
    content: <><a href="mailto:reservations@tewodrosbelayhotel.com">reservations@tewodrosbelayhotel.com</a><br /><span>Our reservations team is ready to assist you.</span></>,
    image:
      'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' };

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      createContactMessage(form);
      setForm(initialForm);
      setError('');
      setSubmitted(true);
    } catch {
      setError('We could not send your message. Please try again.');
    }
  };

  return (
    <div className="bg-[#f8f5ef]">
      <section className="relative flex min-h-[560px] items-center overflow-hidden bg-[#111]">
        <img src={heroImage} alt="Tewodros Belay International Hotel at dusk" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06090f]/95 via-[#081018]/70 to-[#081018]/25" />
        <div className="container-hotel relative z-10 py-28">
          <div className="max-w-xl animate-fade-in">
            <span className="eyebrow">Contact &amp; Location</span>
            <h1 className="mt-5 max-w-md font-serif text-5xl leading-[1.08] text-white sm:text-6xl">We Are Here for You</h1>
            <span className="gold-divider" />
            <p className="max-w-md text-lg leading-7 text-white/70">Whether you&apos;re planning a stay, an event, or need assistance, our team is ready to help make your experience exceptional.</p>
          </div>
        </div>
      </section>

      <section className="container-hotel pt-4 sm:pt-8">
        <div className="overflow-hidden border border-[#e6dfd4] bg-white p-2">
          <iframe
            title="Map showing Tewodros Belay International Hotel"
            src="https://www.google.com/maps?q=CMC+Road,+Tsehay+Real+Estate,+Addis+Ababa,+Ethiopia&output=embed"
            className="h-[300px] w-full border-0 sm:h-[390px]"
            loading="lazy"
          />
        </div>
      </section>

      <section className="container-hotel py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Get in Touch</span>
          <h2 className="mt-3 font-serif text-4xl text-[#171513] sm:text-5xl">We&apos;d Love to Hear From You</h2>
          <span className="mx-auto mt-5 block h-px w-16 bg-[#b9893e]" />
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {contactCards.map(({ icon: Icon, title, content, image }) => (
            <article key={title} className="group relative min-h-[230px] overflow-hidden border border-white/70 bg-[#171717] text-center text-white shadow-sm">
              <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#111]/80 to-[#111]/55" />
              <div className="relative z-10 flex h-full flex-col items-center px-4 py-7">
                <Icon className="h-7 w-7 text-[#d0a657]" />
                <h3 className="mt-5 font-serif text-lg uppercase tracking-wide">{title}</h3>
                <div className="mt-4 text-xs leading-6 text-white/80">{content}</div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 flex flex-col items-center justify-between gap-5 border border-[#302b24] bg-[#171717] px-7 py-6 text-white sm:flex-row sm:px-10">
          <div className="flex items-center gap-4"><Headphones className="h-8 w-8 shrink-0 text-[#d0a657]" /><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d0a657]">Need assistance?</p><p className="mt-1 text-sm text-white/70">Our Guest Relations team is available 24/7 to help you.</p></div></div>
          <a href="https://wa.me/251116292929" target="_blank" rel="noreferrer" className="btn-gold-outline shrink-0">Message us on WhatsApp <ArrowRight className="ml-2 h-4 w-4" /></a>
        </div>
      </section>

      <section className="container-hotel pb-24">
        <div className="mx-auto max-w-2xl text-center"><span className="eyebrow">Getting Here</span><h2 className="mt-3 font-serif text-4xl text-[#171513] sm:text-5xl">Easy Access to Your Destination</h2><span className="mx-auto mt-5 block h-px w-16 bg-[#b9893e]" /></div>
        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="divide-y divide-[#e6dfd4] border border-[#e6dfd4] bg-white">
            <div className="flex gap-4 p-5"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#c99b4a] text-white"><Plane className="h-5 w-5" /></span><div><h3 className="font-serif text-lg text-[#171513]">Bole International Airport → Hotel</h3><p className="mt-2 text-sm leading-6 text-[#756e65]">We are conveniently located just 15 minutes from Bole International Airport.</p><p className="mt-2 text-xs text-[#5f5851]">Distance: 6.7 km <span className="mx-2 text-[#b9893e]">•</span> Approx. 15 min</p></div></div>
            <div className="flex gap-4 p-5"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#c99b4a] text-white"><Car className="h-5 w-5" /></span><div><h3 className="font-serif text-lg text-[#171513]">Airport Transfer</h3><p className="mt-2 text-sm leading-6 text-[#756e65]">Enjoy a seamless arrival with our airport transfer service. Available 24/7 upon request.</p><a href="tel:+251116292929" className="mt-2 inline-flex text-[10px] font-semibold uppercase tracking-wider text-[#9a6f2e]">Book your transfer <ArrowRight className="ml-2 h-3.5 w-3.5" /></a></div></div>
            <div className="flex gap-4 p-5"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#c99b4a] text-white"><MapPin className="h-5 w-5" /></span><div><h3 className="font-serif text-lg text-[#171513]">Directions</h3><p className="mt-2 text-sm leading-6 text-[#756e65]">Located on CMC Road, in the heart of Addis Ababa. Easily accessible from major business districts, embassies, and attractions.</p><a href="https://www.google.com/maps/search/?api=1&query=CMC+Road%2C+Tsehay+Real+Estate%2C+Addis+Ababa%2C+Ethiopia" target="_blank" rel="noreferrer" className="mt-2 inline-flex text-[10px] font-semibold uppercase tracking-wider text-[#9a6f2e]">Get directions <ArrowRight className="ml-2 h-3.5 w-3.5" /></a></div></div>
          </div>
          <div className="min-h-[360px] overflow-hidden border border-[#e6dfd4] bg-white p-2"><img src={transferImage} alt="Premium hotel transfer vehicle" className="h-full min-h-[360px] w-full object-cover" /></div>
        </div>
      </section>

      <section className="border-t border-[#e6dfd4] bg-white py-20">
        <div className="container-hotel grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div><span className="eyebrow">Send a Message</span><h2 className="mt-3 font-serif text-4xl text-[#171513]">Let&apos;s Start a Conversation</h2><span className="gold-divider" /><p className="max-w-md text-sm leading-7 text-[#756e65]">Have a question about your stay, an event, or our facilities? Complete the form and our team will respond as soon as possible.</p></div>
          <div className="border border-[#e6dfd4] bg-[#faf8f4] p-6 sm:p-8">
            {submitted ? <div className="flex min-h-[280px] flex-col items-center justify-center text-center"><div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f0ebe2]"><Check className="h-7 w-7 text-[#b9893e]" /></div><h3 className="mt-5 font-serif text-2xl text-[#171513]">Message received</h3><p className="mt-2 max-w-sm text-sm leading-6 text-[#756e65]">Thank you for reaching out. A member of our team will be in touch shortly.</p><button onClick={() => setSubmitted(false)} className="btn-gold-outline mt-6">Send another message</button></div> : <form onSubmit={handleSubmit} className="space-y-5"><div className="grid gap-5 sm:grid-cols-2"><label className="block"><span className="form-label">Full Name *</span><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="form-field" /></label><label className="block"><span className="form-label">Email *</span><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="form-field" /></label></div><div className="grid gap-5 sm:grid-cols-2"><label className="block"><span className="form-label">Phone</span><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="form-field" /></label><label className="block"><span className="form-label">Subject *</span><input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="form-field" /></label></div><label className="block"><span className="form-label">Message *</span><textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="form-field resize-none" /></label>{error && <p className="text-sm text-red-700" role="alert">{error}</p>}<button type="submit" className="btn-gold">Send Message <Send className="ml-2 h-4 w-4" /></button></form>}
          </div>
        </div>
      </section>
    </div>
  );
}
