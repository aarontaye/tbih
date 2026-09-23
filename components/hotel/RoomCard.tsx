import Link from 'next/link';
import { ArrowRight, Bath, BedDouble, Snowflake, Tv, Wifi } from 'lucide-react';
import type { Room } from '@/lib/data/types';

const amenityIcons = [Wifi, Snowflake, Tv, Bath];

export default function RoomCard({ room, featured = false }: { room: Room; featured?: boolean }) {
  return (
    <article className="group overflow-hidden border border-[#e6dfd4] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/rooms/${room.slug}`} className="block overflow-hidden">
        <div className={featured ? 'h-72 overflow-hidden' : 'h-60 overflow-hidden'}>
          <img src={room.images[0]} alt={room.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
      </Link>
      <div className="p-6">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#b9893e]">{room.category} collection</p>
            <h3 className="font-serif text-2xl text-[#171513]">{room.name}</h3>
          </div>
          <div className="text-right">
            <span className="block font-serif text-lg text-[#b9893e]">{room.price_per_night.toLocaleString()} ETB</span>
            <span className="text-[10px] uppercase tracking-wider text-[#7e766c]">per night</span>
          </div>
        </div>
        <p className="min-h-[48px] text-sm leading-6 text-[#756e65]">{room.short_description}</p>
        <div className="my-5 flex items-center gap-4 border-y border-[#eee8df] py-4 text-[#a4865b]">
          <span className="flex items-center gap-1.5 text-[11px] text-[#756e65]"><BedDouble className="h-4 w-4" /> {room.bed_type}</span>
          {amenityIcons.map((Icon) => <Icon key={Icon.displayName ?? Icon.name} className="h-4 w-4" aria-hidden="true" />)}
        </div>
        <Link href={`/rooms/${room.slug}`} className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#171513] transition-colors hover:text-[#b9893e]">
          Explore room <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
