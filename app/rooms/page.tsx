'use client';

import { useState } from 'react';
import { getRooms } from '@/lib/api';
import RoomCard from '@/components/hotel/RoomCard';
import AvailabilityBar from '@/components/hotel/AvailabilityBar';
import type { AvailabilityValues } from '@/components/hotel/AvailabilityBar';
import { Bath, Coffee, CircleParking as ParkingCircle, Snowflake, Tv, Utensils, Wifi, Wine } from 'lucide-react';

const heroImage = 'https://images.pexels.com/photos/2725675/pexels-photo-2725675.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const includedItems = [
  { icon: Wifi, label: 'High-Speed Wi-Fi' },
  { icon: Snowflake, label: 'Air Conditioning' },
  { icon: Coffee, label: 'Daily Breakfast' },
  { icon: ParkingCircle, label: 'Free Parking' },
  { icon: Utensils, label: 'Room Service' },
  { icon: Wine, label: 'Minibar' },
  { icon: Tv, label: 'Smart TV' },
  { icon: Bath, label: 'Premium Toiletries' },
];

export default function RoomsPage() {
  const [submitted, setSubmitted] = useState<AvailabilityValues | null>(null);
  const allRooms = getRooms();

  return (
    <div className="bg-[#f8f5ef]">
      <section className="relative flex min-h-[540px] items-center overflow-visible bg-[#111]">
        <img src={heroImage} alt="Hotel room interior" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081018]/95 via-[#091019]/70 to-[#081018]/30" />
        <div className="container-hotel relative z-10 pb-32 pt-28">
          <div className="max-w-xl animate-fade-in">
            <span className="eyebrow">Accommodations</span>
            <h1 className="mt-5 font-serif text-5xl leading-tight text-white sm:text-6xl">Rooms & Suites</h1>
            <p className="mt-5 text-lg text-white/70">Elegant spaces designed for rest, work and indulgence.</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20 mx-auto w-full max-w-6xl translate-y-1/2 px-4">
          <AvailabilityBar compact onSearch={(v) => setSubmitted(v)} />
        </div>
      </section>

      <section className="container-hotel pb-20 pt-44">
        <div className="mb-12 text-center">
          <span className="eyebrow">Our Collection</span>
          <h2 className="mt-3 font-serif text-4xl text-[#171513]">Choose Your Perfect Stay</h2>
          <span className="mx-auto block h-px w-16 bg-[#b9893e]" />
        </div>
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {allRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      <section className="bg-[#171717] py-20">
        <div className="container-hotel">
          <div className="mb-10 text-center">
            <span className="eyebrow">Complimentary</span>
            <h2 className="mt-3 font-serif text-3xl text-white">Every Stay Includes</h2>
            <span className="mx-auto block h-px w-16 bg-[#b9893e]" />
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            {includedItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center text-center">
                <Icon className="h-7 w-7 text-[#cda257]" />
                <span className="mt-3 text-xs uppercase tracking-wider text-white/70">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
