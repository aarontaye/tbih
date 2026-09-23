'use client';

import { useState } from 'react';
import { CalendarDays, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AvailabilityBarProps {
  compact?: boolean;
  initialRoomId?: string;
  onSearch?: (values: AvailabilityValues) => void;
}

export interface AvailabilityValues {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
}

export default function AvailabilityBar({ compact = false, initialRoomId, onSearch }: AvailabilityBarProps) {
  const [values, setValues] = useState<AvailabilityValues>({
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    rooms: 1,
  });

  const update = (key: keyof AvailabilityValues, value: string | number) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSearch?.(values);
      }}
      className={cn(
        'grid gap-px overflow-hidden border border-white/10 bg-white/10 shadow-2xl backdrop-blur-md',
        compact ? 'lg:grid-cols-[1fr_1fr_1.2fr_auto]' : 'lg:grid-cols-[1fr_1fr_1.35fr_auto]'
      )}
    >
      <label className="group flex min-h-[70px] flex-col justify-center bg-[#171717]/95 px-5 py-3">
        <span className="mb-2 text-[9px] font-medium uppercase tracking-[0.18em] text-white/55">Check-in</span>
        <span className="relative flex items-center gap-2 text-sm text-white">
          <input
            type="date"
            value={values.checkIn}
            onChange={(event) => update('checkIn', event.target.value)}
            className="w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]"
          />
          <CalendarDays className="pointer-events-none absolute right-0 h-4 w-4 text-[#d0a657]" />
        </span>
      </label>
      <label className="group flex min-h-[70px] flex-col justify-center bg-[#171717]/95 px-5 py-3">
        <span className="mb-2 text-[9px] font-medium uppercase tracking-[0.18em] text-white/55">Check-out</span>
        <span className="relative flex items-center gap-2 text-sm text-white">
          <input
            type="date"
            value={values.checkOut}
            onChange={(event) => update('checkOut', event.target.value)}
            className="w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]"
          />
          <CalendarDays className="pointer-events-none absolute right-0 h-4 w-4 text-[#d0a657]" />
        </span>
      </label>
      <label className="flex min-h-[70px] flex-col justify-center bg-[#171717]/95 px-5 py-3">
        <span className="mb-2 text-[9px] font-medium uppercase tracking-[0.18em] text-white/55">Guests & rooms</span>
        <span className="relative flex items-center text-sm text-white">
          <select
            value={`${values.adults}-${values.children}-${values.rooms}`}
            onChange={(event) => {
              const [adults, children, rooms] = event.target.value.split('-').map(Number);
              setValues((current) => ({ ...current, adults, children, rooms }));
            }}
            className="w-full appearance-none bg-transparent text-sm text-white outline-none"
          >
            <option value="1-0-1" className="bg-[#171717]">1 Guest, 1 Room</option>
            <option value="2-0-1" className="bg-[#171717]">2 Guests, 1 Room</option>
            <option value="2-1-1" className="bg-[#171717]">2 Guests + child, 1 Room</option>
            <option value="3-0-1" className="bg-[#171717]">3 Guests, 1 Room</option>
            <option value="4-1-2" className="bg-[#171717]">4 Guests + child, 2 Rooms</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-[#d0a657]" />
        </span>
      </label>
      <button type="submit" className="flex min-h-[70px] items-center justify-center gap-2 bg-[#d0a657] px-7 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#17120b] transition-colors hover:bg-[#e2bd73]">
        <Search className="h-4 w-4" />
        <span>{compact ? 'Check Availability' : 'Check Availability'}</span>
      </button>
      {initialRoomId && <input type="hidden" name="room" value={initialRoomId} />}
    </form>
  );
}
