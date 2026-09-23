'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Check, CircleCheck as CheckCircle2, ClipboardList, CreditCard, Search, User } from 'lucide-react';
import { getRooms, getRoomBySlug, getBookings, createBooking, calculateBookingTotal } from '@/lib/api';
import type { Room } from '@/lib/data/types';
import type { BookingInput } from '@/lib/api';

const heroImage = 'https://images.pexels.com/photos/26729563/pexels-photo-26729563.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

type Step = 'search' | 'guest' | 'confirmation';

function datesOverlap(checkIn: string, checkOut: string, existingIn: string, existingOut: string): boolean {
  const newIn = new Date(checkIn).getTime();
  const newOut = new Date(checkOut).getTime();
  const exIn = new Date(existingIn).getTime();
  const exOut = new Date(existingOut).getTime();
  return newIn < exOut && newOut > exIn;
}

function isRoomAvailable(roomId: string, checkIn: string, checkOut: string): boolean {
  if (!checkIn || !checkOut) return true;
  const bookings = getBookings();
  return !bookings.some(
    (b) =>
      b.room_id === roomId &&
      b.status !== 'cancelled' &&
      datesOverlap(checkIn, checkOut, b.check_in, b.check_out)
  );
}

const steps = [
  { icon: Search, label: 'Choose Your Room' },
  { icon: User, label: 'Guest Information' },
  { icon: CreditCard, label: 'Payment & Confirmation' },
];

function BookingContent() {
  const searchParams = useSearchParams();
  const allRooms = getRooms();

  const [step, setStep] = useState<Step>('search');
  const [searchPerformed, setSearchPerformed] = useState(false);

  const [searchForm, setSearchForm] = useState({
    checkIn: searchParams.get('checkIn') ?? '',
    checkOut: searchParams.get('checkOut') ?? '',
    adults: 2,
    children: 0,
    roomSlug: searchParams.get('room') ?? '',
    promoCode: '',
  });

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [guestForm, setGuestForm] = useState({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    special_requests: '',
  });
  const [bookingResult, setBookingResult] = useState<{ id: string; total: number; nights: number } | null>(null);

  useEffect(() => {
    const roomParam = searchParams.get('room');
    if (roomParam) {
      setSearchForm((prev) => ({ ...prev, roomSlug: roomParam }));
    }
  }, [searchParams]);

  const nights = useMemo(() => {
    if (!searchForm.checkIn || !searchForm.checkOut) return 0;
    const diff = Math.ceil((new Date(searchForm.checkOut).getTime() - new Date(searchForm.checkIn).getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  }, [searchForm.checkIn, searchForm.checkOut]);

  const availableRooms = useMemo(() => {
    if (!searchPerformed) return allRooms;
    return allRooms.filter((room) => isRoomAvailable(room.id, searchForm.checkIn, searchForm.checkOut));
  }, [searchPerformed, allRooms, searchForm.checkIn, searchForm.checkOut]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchPerformed(true);
  };

  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
    setStep('guest');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;
    const total = calculateBookingTotal(selectedRoom, searchForm.checkIn, searchForm.checkOut);
    const input: BookingInput = {
      room_id: selectedRoom.id,
      guest_name: guestForm.guest_name,
      guest_email: guestForm.guest_email,
      guest_phone: guestForm.guest_phone,
      check_in: searchForm.checkIn,
      check_out: searchForm.checkOut,
      adults: searchForm.adults,
      children: searchForm.children,
      special_requests: guestForm.special_requests,
      promo_code: searchForm.promoCode,
      total_price: total,
    };
    const booking = createBooking(input);
    setBookingResult({ id: booking.id, total, nights });
    setStep('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetBooking = () => {
    setStep('search');
    setSearchPerformed(false);
    setSelectedRoom(null);
    setBookingResult(null);
    setGuestForm({ guest_name: '', guest_email: '', guest_phone: '', special_requests: '' });
  };

  const currentStepIndex = step === 'search' ? 0 : step === 'guest' ? 1 : 2;

  return (
    <div className="bg-[#f8f5ef]">
      <section className="relative flex min-h-[400px] items-center overflow-hidden bg-[#111]">
        <img src={heroImage} alt="Hotel interior" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081018]/95 via-[#091019]/75 to-[#081018]/40" />
        <div className="container-hotel relative z-10 py-20">
          <span className="eyebrow">Reservations</span>
          <h1 className="mt-4 font-serif text-5xl text-white sm:text-6xl">Book Your Stay</h1>
          <p className="mt-4 max-w-md text-lg text-white/70">Check availability and reserve your room in just a few simple steps.</p>
        </div>
      </section>

      <section className="container-hotel py-16">
        <div className="mx-auto mb-12 max-w-3xl">
          <div className="flex items-center justify-between">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              const isActive = idx === currentStepIndex;
              const isDone = idx < currentStepIndex;
              return (
                <div key={s.label} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${isDone ? 'border-[#b9893e] bg-[#b9893e] text-white' : isActive ? 'border-[#b9893e] bg-white text-[#b9893e]' : 'border-[#d4ccc0] bg-white text-[#bbb1a5]'}`}>
                      {isDone ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    <span className={`mt-2 max-w-[100px] text-center text-[10px] uppercase tracking-wider ${isActive || isDone ? 'text-[#171513]' : 'text-[#bbb1a5]'}`}>{s.label}</span>
                  </div>
                  {idx < steps.length - 1 && <div className={`mx-2 h-0.5 flex-1 ${idx < currentStepIndex ? 'bg-[#b9893e]' : 'bg-[#d4ccc0]'}`} />}
                </div>
              );
            })}
          </div>
        </div>

        {step === 'search' && (
          <div className="mx-auto max-w-5xl">
            <form onSubmit={handleSearch} className="mb-12 border border-[#e6dfd4] bg-white p-7">
              <h2 className="mb-6 font-serif text-2xl text-[#171513]">Search Available Rooms</h2>
              <div className="grid gap-5 md:grid-cols-3">
                <label className="block">
                  <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-[#a09890]">Check-in</span>
                  <input type="date" required value={searchForm.checkIn} onChange={(e) => setSearchForm({ ...searchForm, checkIn: e.target.value })} className="w-full border border-[#e0d8cc] bg-[#faf8f4] px-3 py-2.5 text-sm outline-none focus:border-[#b9893e]" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-[#a09890]">Check-out</span>
                  <input type="date" required value={searchForm.checkOut} onChange={(e) => setSearchForm({ ...searchForm, checkOut: e.target.value })} className="w-full border border-[#e0d8cc] bg-[#faf8f4] px-3 py-2.5 text-sm outline-none focus:border-[#b9893e]" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-[#a09890]">Room Type</span>
                  <select value={searchForm.roomSlug} onChange={(e) => setSearchForm({ ...searchForm, roomSlug: e.target.value })} className="w-full border border-[#e0d8cc] bg-[#faf8f4] px-3 py-2.5 text-sm outline-none focus:border-[#b9893e]">
                    <option value="">Any Room</option>
                    {allRooms.map((r) => <option key={r.id} value={r.slug}>{r.name}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-[#a09890]">Adults</span>
                  <select value={searchForm.adults} onChange={(e) => setSearchForm({ ...searchForm, adults: Number(e.target.value) })} className="w-full border border-[#e0d8cc] bg-[#faf8f4] px-3 py-2.5 text-sm outline-none focus:border-[#b9893e]">
                    {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-[#a09890]">Children</span>
                  <select value={searchForm.children} onChange={(e) => setSearchForm({ ...searchForm, children: Number(e.target.value) })} className="w-full border border-[#e0d8cc] bg-[#faf8f4] px-3 py-2.5 text-sm outline-none focus:border-[#b9893e]">
                    {[0, 1, 2, 3].map((n) => <option key={n} value={n}>{n} Child{n !== 1 ? 'ren' : ''}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-[#a09890]">Special Code</span>
                  <input type="text" value={searchForm.promoCode} onChange={(e) => setSearchForm({ ...searchForm, promoCode: e.target.value })} placeholder="Promo / group code" className="w-full border border-[#e0d8cc] bg-[#faf8f4] px-3 py-2.5 text-sm outline-none focus:border-[#b9893e]" />
                </label>
              </div>
              <button type="submit" className="btn-gold mt-6">
                <Search className="mr-2 h-4 w-4" /> Search Rooms
              </button>
            </form>

            {searchPerformed && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-serif text-2xl text-[#171513]">
                    {availableRooms.length > 0 ? 'Available Rooms' : 'No Rooms Available'}
                  </h2>
                  {nights > 0 && <span className="text-sm text-[#756e65]">{nights} night{nights > 1 ? 's' : ''} · {searchForm.adults} adult{searchForm.adults > 1 ? 's' : ''}{searchForm.children > 0 ? ` · ${searchForm.children} child${searchForm.children > 1 ? 'ren' : ''}` : ''}</span>}
                </div>
                {availableRooms.length === 0 ? (
                  <div className="border border-[#e6dfd4] bg-white p-12 text-center">
                    <p className="text-[#756e65]">No rooms are available for the selected dates. Please try different dates.</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {availableRooms.map((room) => {
                      const total = calculateBookingTotal(room, searchForm.checkIn, searchForm.checkOut);
                      return (
                        <div key={room.id} className="grid overflow-hidden border border-[#e6dfd4] bg-white sm:grid-cols-[280px_1fr]">
                          <div className="h-48 overflow-hidden sm:h-auto"><img src={room.images[0]} alt={room.name} className="h-full w-full object-cover" /></div>
                          <div className="flex flex-col p-6">
                            <p className="text-[10px] uppercase tracking-wider text-[#b9893e]">{room.category} Collection</p>
                            <h3 className="mt-1 font-serif text-2xl text-[#171513]">{room.name}</h3>
                            <p className="mt-2 flex-1 text-sm leading-6 text-[#756e65]">{room.short_description}</p>
                            <div className="mt-4 flex items-end justify-between border-t border-[#eee8df] pt-4">
                              <div>
                                <span className="font-serif text-2xl text-[#b9893e]">{total.toLocaleString()}</span>
                                <span className="ml-1 text-xs text-[#a09890]">ETB · {nights || 1} night{(nights || 1) > 1 ? 's' : ''}</span>
                              </div>
                              <button onClick={() => handleSelectRoom(room)} className="btn-gold">Select Room <ArrowRight className="ml-2 h-4 w-4" /></button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {!searchPerformed && (
              <div className="mx-auto max-w-3xl">
                <div className="mb-10 text-center">
                  <span className="eyebrow">How it works</span>
                  <h2 className="mt-3 font-serif text-3xl text-[#171513]">Your Stay in 3 Simple Steps</h2>
                  <span className="mx-auto block h-px w-16 bg-[#b9893e]" />
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    { icon: ClipboardList, title: 'Choose Your Room', text: 'Search for available rooms by entering your dates and preferences.' },
                    { icon: User, title: 'Guest Information', text: 'Tell us who will be staying and any special requests you may have.' },
                    { icon: CreditCard, title: 'Payment & Confirmation', text: 'Confirm your booking and receive your reservation reference instantly.' },
                  ].map(({ icon: Icon, title, text }, idx) => (
                    <div key={title} className="border border-[#e6dfd4] bg-white p-7 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8f5ef]">
                        <Icon className="h-6 w-6 text-[#b9893e]" />
                      </div>
                      <span className="mt-4 block font-serif text-3xl text-[#e6dfd4]">{idx + 1}</span>
                      <h3 className="mt-1 font-serif text-lg text-[#171513]">{title}</h3>
                      <p className="mt-2 text-xs leading-5 text-[#756e65]">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 'guest' && selectedRoom && (
          <div className="mx-auto max-w-4xl">
            <button onClick={() => setStep('search')} className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#756e65] hover:text-[#b9893e]">
              <ArrowRight className="h-4 w-4 rotate-180" /> Back to room selection
            </button>
            <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
              <form onSubmit={handleGuestSubmit} className="border border-[#e6dfd4] bg-white p-7">
                <h2 className="mb-6 font-serif text-2xl text-[#171513]">Guest Information</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-[#a09890]">Full Name *</span>
                    <input type="text" required value={guestForm.guest_name} onChange={(e) => setGuestForm({ ...guestForm, guest_name: e.target.value })} className="w-full border border-[#e0d8cc] bg-[#faf8f4] px-3 py-2.5 text-sm outline-none focus:border-[#b9893e]" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-[#a09890]">Email *</span>
                    <input type="email" required value={guestForm.guest_email} onChange={(e) => setGuestForm({ ...guestForm, guest_email: e.target.value })} className="w-full border border-[#e0d8cc] bg-[#faf8f4] px-3 py-2.5 text-sm outline-none focus:border-[#b9893e]" />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-[#a09890]">Phone *</span>
                    <input type="tel" required value={guestForm.guest_phone} onChange={(e) => setGuestForm({ ...guestForm, guest_phone: e.target.value })} className="w-full border border-[#e0d8cc] bg-[#faf8f4] px-3 py-2.5 text-sm outline-none focus:border-[#b9893e]" />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-[#a09890]">Special Requests</span>
                    <textarea value={guestForm.special_requests} onChange={(e) => setGuestForm({ ...guestForm, special_requests: e.target.value })} rows={3} className="w-full border border-[#e0d8cc] bg-[#faf8f4] px-3 py-2.5 text-sm outline-none focus:border-[#b9893e]" />
                  </label>
                </div>
                <button type="submit" className="btn-gold mt-6 w-full">Confirm Booking <Check className="ml-2 h-4 w-4" /></button>
              </form>

              <aside className="h-fit border border-[#e6dfd4] bg-white p-6">
                <h3 className="mb-4 font-serif text-lg text-[#171513]">Booking Summary</h3>
                <div className="mb-4 overflow-hidden">
                  <img src={selectedRoom.images[0]} alt={selectedRoom.name} className="h-32 w-full object-cover" />
                </div>
                <p className="font-serif text-lg text-[#171513]">{selectedRoom.name}</p>
                <div className="mt-3 space-y-2 border-y border-[#eee8df] py-4 text-sm">
                  <div className="flex justify-between text-[#5f5851]"><span>Check-in</span><span>{searchForm.checkIn || '—'}</span></div>
                  <div className="flex justify-between text-[#5f5851]"><span>Check-out</span><span>{searchForm.checkOut || '—'}</span></div>
                  <div className="flex justify-between text-[#5f5851]"><span>Nights</span><span>{nights || 1}</span></div>
                  <div className="flex justify-between text-[#5f5851]"><span>Guests</span><span>{searchForm.adults} adult{searchForm.adults > 1 ? 's' : ''}{searchForm.children > 0 ? ` + ${searchForm.children}` : ''}</span></div>
                </div>
                <div className="mt-4 flex justify-between">
                  <span className="font-semibold text-[#171513]">Total</span>
                  <span className="font-serif text-xl text-[#b9893e]">{calculateBookingTotal(selectedRoom, searchForm.checkIn, searchForm.checkOut).toLocaleString()} ETB</span>
                </div>
              </aside>
            </div>
          </div>
        )}

        {step === 'confirmation' && bookingResult && selectedRoom && (
          <div className="mx-auto max-w-2xl">
            <div className="border border-[#e6dfd4] bg-white p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f0ebe2]">
                <CheckCircle2 className="h-8 w-8 text-[#b9893e]" />
              </div>
              <h2 className="mt-6 font-serif text-3xl text-[#171513]">Booking Confirmed!</h2>
              <p className="mt-3 text-sm text-[#756e65]">Thank you, {guestForm.guest_name.split(' ')[0]}. Your reservation has been received.</p>

              <div className="mx-auto mt-8 max-w-sm border border-dashed border-[#d4ccc0] bg-[#faf8f4] p-5">
                <p className="text-[10px] uppercase tracking-wider text-[#a09890]">Your booking reference</p>
                <p className="mt-1 font-serif text-2xl text-[#b9893e]">{bookingResult.id}</p>
              </div>

              <div className="mt-8 space-y-3 border-t border-[#eee8df] pt-6 text-left text-sm">
                <div className="flex justify-between"><span className="text-[#a09890]">Room</span><span className="font-medium text-[#171513]">{selectedRoom.name}</span></div>
                <div className="flex justify-between"><span className="text-[#a09890]">Check-in</span><span className="text-[#171513]">{searchForm.checkIn}</span></div>
                <div className="flex justify-between"><span className="text-[#a09890]">Check-out</span><span className="text-[#171513]">{searchForm.checkOut}</span></div>
                <div className="flex justify-between"><span className="text-[#a09890]">Nights</span><span className="text-[#171513]">{bookingResult.nights}</span></div>
                <div className="flex justify-between"><span className="text-[#a09890]">Guest</span><span className="text-[#171513]">{guestForm.guest_name}</span></div>
                <div className="flex justify-between border-t border-[#eee8df] pt-3"><span className="font-semibold text-[#171513]">Total</span><span className="font-serif text-lg text-[#b9893e]">{bookingResult.total.toLocaleString()} ETB</span></div>
              </div>

              <div className="mt-8 flex justify-center gap-3">
                <button onClick={resetBooking} className="btn-gold-outline">Book Another Stay</button>
                <Link href="/" className="inline-flex items-center justify-center border border-[#cfc5b8] px-6 py-3 text-sm font-medium uppercase tracking-wider text-[#171513] transition-colors hover:border-[#b9893e]">Return Home</Link>
              </div>
              <p className="mt-6 text-xs text-[#a09890]">A confirmation email has been sent to {guestForm.guest_email}.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center bg-[#f8f5ef]"><p className="text-sm text-[#756e65]">Loading booking…</p></div>}>
      <BookingContent />
    </Suspense>
  );
}
