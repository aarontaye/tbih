'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Bath, BedDouble, Snowflake, Tv, Wifi, Wine, Users, Ruler } from 'lucide-react';
import { getRoomBySlug } from '@/lib/api';

const amenityMap: Record<string, { icon: typeof Wifi; label: string }> = {
  wifi: { icon: Wifi, label: 'High-Speed Wi-Fi' },
  ac: { icon: Snowflake, label: 'Air Conditioning' },
  smart_tv: { icon: Tv, label: 'Smart TV' },
  minibar: { icon: Wine, label: 'Minibar' },
  work_desk: { icon: BedDouble, label: 'Work Desk' },
  private_bathroom: { icon: Bath, label: 'Private Bathroom' },
};

export default function RoomDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const room = getRoomBySlug(slug);
  const [activeImage, setActiveImage] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const diff = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(1, diff);
  }, [checkIn, checkOut]);

  const totalPrice = room ? room.price_per_night * nights : 0;

  if (!room) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f8f5ef] text-center">
        <h1 className="font-serif text-3xl text-[#171513]">Room Not Found</h1>
        <p className="mt-3 text-sm text-[#756e65]">The room you are looking for is no longer available.</p>
        <Link href="/rooms" className="btn-gold mt-8">Back to Rooms</Link>
      </div>
    );
  }

  const handleBook = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    params.set('room', room.slug);
    router.push(`/book?${params.toString()}`);
  };

  return (
    <div className="bg-[#f8f5ef]">
      <section className="relative h-[460px] overflow-hidden bg-[#111]">
        <img src={room.images[activeImage]} alt={room.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0c]/85 via-transparent to-[#0a0b0c]/30" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container-hotel pb-8">
            <Link href="/rooms" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-white/70 transition-colors hover:text-[#d0a657]">
              <ArrowLeft className="h-4 w-4" /> All Rooms
            </Link>
            <span className="mt-4 block eyebrow">Room</span>
            <h1 className="mt-2 font-serif text-4xl text-white sm:text-5xl">{room.name}</h1>
          </div>
        </div>
      </section>

      <section className="container-hotel py-12">
        <div className="grid gap-3 sm:grid-cols-3">
          {room.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`relative h-32 overflow-hidden border-2 transition-all sm:h-40 ${activeImage === idx ? 'border-[#b9893e]' : 'border-transparent opacity-70 hover:opacity-100'}`}
            >
              <img src={img} alt={`${room.name} view ${idx + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      <section className="container-hotel pb-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            <span className="eyebrow">{room.category} Collection</span>
            <h2 className="mt-3 font-serif text-3xl text-[#171513]">About this room</h2>
            <span className="gold-divider" />
            <p className="text-sm leading-7 text-[#5f5851]">{room.full_description}</p>

            <h3 className="mt-10 font-serif text-xl text-[#171513]">Room Amenities</h3>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {room.amenities.map((key) => {
                const item = amenityMap[key];
                if (!item) return null;
                const Icon = item.icon;
                return (
                  <div key={key} className="flex items-center gap-3 border border-[#e6dfd4] bg-white px-4 py-3">
                    <Icon className="h-5 w-5 text-[#b9893e]" />
                    <span className="text-xs text-[#5f5851]">{item.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: Users, label: 'Adults', value: room.capacity_adults },
                { icon: BedDouble, label: 'Bed', value: room.bed_type },
                { icon: Ruler, label: 'Size', value: `${room.size_sqm} m²` },
                { icon: Bath, label: 'Bathroom', value: 'Private' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="border border-[#e6dfd4] bg-white p-5 text-center">
                  <Icon className="mx-auto h-6 w-6 text-[#b9893e]" />
                  <p className="mt-2 text-[10px] uppercase tracking-wider text-[#a09890]">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-[#171513]">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit border border-[#e6dfd4] bg-white p-7 lg:sticky lg:top-28">
            <div className="flex items-baseline justify-between border-b border-[#eee8df] pb-5">
              <div>
                <span className="font-serif text-3xl text-[#b9893e]">{room.price_per_night.toLocaleString()}</span>
                <span className="ml-1 text-sm text-[#a09890]">ETB / night</span>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-[#a09890]">Check-in</span>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full border border-[#e0d8cc] bg-[#faf8f4] px-3 py-2.5 text-sm outline-none focus:border-[#b9893e]" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-[#a09890]">Check-out</span>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full border border-[#e0d8cc] bg-[#faf8f4] px-3 py-2.5 text-sm outline-none focus:border-[#b9893e]" />
              </label>
            </div>

            {checkIn && checkOut && (
              <div className="mt-5 space-y-2 border-y border-[#eee8df] py-4 text-sm">
                <div className="flex justify-between text-[#5f5851]"><span>{nights} night{nights > 1 ? 's' : ''}</span><span>{room.price_per_night.toLocaleString()} ETB</span></div>
                <div className="flex justify-between font-semibold text-[#171513]"><span>Total</span><span>{totalPrice.toLocaleString()} ETB</span></div>
              </div>
            )}

            <button onClick={handleBook} className="btn-gold mt-6 w-full">Book This Room</button>
            <p className="mt-3 text-center text-[11px] text-[#a09890]">Free cancellation up to 48 hours before arrival</p>
          </aside>
        </div>
      </section>
    </div>
  );
}
