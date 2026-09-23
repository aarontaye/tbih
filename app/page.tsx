import Link from 'next/link';
import { ArrowLeft, ArrowRight, BedDouble, Car, ChefHat, Dumbbell, Play, Sparkles, Users } from 'lucide-react';
import AvailabilityBar from '@/components/hotel/AvailabilityBar';
import RoomCard from '@/components/hotel/RoomCard';
import { getRooms } from '@/lib/api';

const heroImage = 'https://images.pexels.com/photos/39459699/pexels-photo-39459699.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const introImage = 'https://images.pexels.com/photos/14011664/pexels-photo-14011664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const offerImage = 'https://images.pexels.com/photos/17057034/pexels-photo-17057034.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const hotelFeatures = [
  { icon: ChefHat, title: 'Restaurant & Bar', text: 'Enjoy international cuisine and Ethiopian specialties.' },
  { icon: Dumbbell, title: 'Wellness & Fitness', text: 'Relax, rejuvenate and stay fit during your stay.' },
  { icon: Users, title: 'Meetings & Events', text: 'Modern venues for successful meetings and celebrations.' },
  { icon: Car, title: 'Airport Transfer', text: 'Comfortable and reliable airport pick-up and drop-off.' },
];

export default function Home() {
  const rooms = getRooms().slice(0, 3);

  return (
    <div className="bg-[#f8f5ef]">
      <section className="relative flex min-h-[760px] items-center overflow-visible bg-[#111]">
        <img src={heroImage} alt="Tewodros Belay International Hotel exterior" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081018]/95 via-[#091019]/70 to-[#081018]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0c]/80 via-transparent to-[#0a0b0c]/10" />
        <div className="container-hotel relative z-10 pb-28 pt-28">
          <div className="max-w-2xl animate-fade-in">
            <span className="eyebrow">Luxury. Hospitality. Excellence.</span>
            <h1 className="mt-5 max-w-xl font-serif text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">Tewodros Belay <span className="block">International Hotel</span></h1>
            <p className="mt-6 text-lg text-white/75">A refined stay in the heart of Addis Ababa.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/book" className="btn-gold">Book Your Stay</Link>
              <Link href="/about" className="inline-flex items-center justify-center border border-white/50 px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white hover:text-[#171513]">Explore the Hotel <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20 mx-auto w-full max-w-6xl translate-y-1/2 px-4">
          <AvailabilityBar />
        </div>
      </section>

      <section className="container-hotel grid items-stretch gap-0 py-28 lg:grid-cols-2 lg:py-36">
        <div className="flex flex-col justify-center bg-[#f8f5ef] py-8 pr-8 lg:pr-20">
          <span className="eyebrow">Welcome to</span>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-[#171513] sm:text-5xl">Where Comfort <span className="text-[#b9893e]">Meets Elegance</span></h2>
          <span className="gold-divider" />
          <p className="max-w-md text-sm leading-7 text-[#756e65]">Tewodros Belay International Hotel offers a perfect blend of modern luxury and authentic Ethiopian hospitality. Whether you are here for business or leisure, we ensure an exceptional experience that stays with you.</p>
          <Link href="/about" className="btn-gold mt-8 w-fit">Discover More</Link>
        </div>
        <div className="relative min-h-[380px] overflow-hidden">
          <img src={introImage} alt="Elegant hotel lobby" className="h-full w-full object-cover" />
          <button aria-label="Play hotel introduction video" className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#b9893e] shadow-2xl transition-transform hover:scale-110"><Play className="ml-1 h-6 w-6 fill-current" /></button>
        </div>
      </section>

      <section className="container-hotel pb-28">
        <div className="flex flex-col items-end justify-between gap-5 border-b border-[#ddd4c7] pb-6 sm:flex-row sm:items-end">
          <div><span className="eyebrow">Rooms & Suites</span><h2 className="mt-3 font-serif text-4xl text-[#171513]">Designed for Your Comfort</h2></div>
          <div className="flex items-center gap-3"><Link href="/rooms" className="border border-[#cfc5b8] px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-[#171513] hover:border-[#b9893e]">View all rooms</Link><button aria-label="Previous rooms" className="flex h-10 w-10 items-center justify-center border border-[#cfc5b8] text-[#b9893e] hover:bg-white"><ArrowLeft className="h-4 w-4" /></button><button aria-label="Next rooms" className="flex h-10 w-10 items-center justify-center border border-[#cfc5b8] text-[#b9893e] hover:bg-white"><ArrowRight className="h-4 w-4" /></button></div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">{rooms.map((room) => <RoomCard key={room.id} room={room} featured />)}</div>
      </section>

      <section className="bg-[#171717] text-white"><div className="container-hotel grid gap-0 md:grid-cols-4">{hotelFeatures.map(({ icon: Icon, title, text }) => <div key={title} className="flex flex-col items-center border-b border-white/10 px-6 py-10 text-center md:border-b-0 md:border-r md:last:border-r-0"><Icon className="h-7 w-7 text-[#cda257]" /><h3 className="mt-4 font-serif text-lg">{title}</h3><p className="mt-2 max-w-[210px] text-xs leading-5 text-white/55">{text}</p></div>)}</div></section>

      <section className="container-hotel py-28"><div className="grid overflow-hidden bg-[#171717] lg:grid-cols-2"><div className="flex flex-col justify-center p-8 text-white sm:p-14"><span className="eyebrow">Special offer</span><h2 className="mt-4 font-serif text-4xl">Stay More, Save More</h2><p className="mt-5 max-w-sm text-sm leading-7 text-white/60">Enjoy exclusive benefits when you book directly through our official website.</p><ul className="mt-6 space-y-3 text-sm text-white/80"><li>✓ Best rate guarantee</li><li>✓ Complimentary breakfast</li><li>✓ Flexible cancellation</li></ul><Link href="/offers" className="btn-gold mt-8 w-fit">View all offers</Link></div><div className="relative min-h-[380px]"><img src={offerImage} alt="Dining table prepared for an evening" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute bottom-8 right-8 flex h-32 w-32 flex-col items-center justify-center border border-[#d0a657] bg-[#171717]/85 text-center"><span className="text-[10px] uppercase tracking-widest text-[#d0a657]">Up to</span><strong className="font-serif text-4xl">20%</strong><span className="text-[10px] uppercase tracking-widest text-white/70">off</span></div></div></div></section>

      <section className="relative overflow-hidden bg-[#eee9e0] py-24"><div className="container-hotel grid items-center gap-12 lg:grid-cols-2"><div><span className="eyebrow">Guests love us</span><h2 className="mt-4 font-serif text-4xl text-[#171513]">Exceptional Hospitality, Every Time</h2><span className="gold-divider" /><blockquote className="max-w-lg text-lg leading-8 text-[#4f4942]">“The best hotel experience in Addis Ababa. The rooms are beautiful, the food is amazing, and the staff are incredibly professional and friendly.”</blockquote><div className="mt-7 flex items-center gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d0a657] font-serif text-lg text-white">M</div><div><p className="text-sm font-semibold text-[#171513]">Michael T.</p><p className="text-xs text-[#756e65]">Business Traveler</p></div></div></div><div className="h-72 overflow-hidden lg:h-96"><img src={rooms[0]?.images[1] ?? introImage} alt="Comfortable hotel suite" className="h-full w-full object-cover" /></div></div></section>
    </div>
  );
}
