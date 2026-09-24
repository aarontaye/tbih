import Link from 'next/link';
import {
  ArrowRight,
  Check,
  HeartHandshake,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const heroImage = 'https://images.pexels.com/photos/14011664/pexels-photo-14011664.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600';
const storyImage = 'https://images.pexels.com/photos/14036251/pexels-photo-14036251.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const philosophyImage = 'https://images.pexels.com/photos/5378703/pexels-photo-5378703.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const peopleImage = 'https://images.pexels.com/photos/5371576/pexels-photo-5371576.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const commitmentImage = 'https://images.pexels.com/photos/9155201/pexels-photo-9155201.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const locationImage = 'https://images.pexels.com/photos/30177512/pexels-photo-30177512.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

interface Badge {
  icon: LucideIcon;
  title: string;
  text: string;
}

const philosophyBadges: Badge[] = [
  { icon: HeartHandshake, title: 'Authentic Ethiopian Hospitality', text: 'Warmth in every welcome.' },
  { icon: Users, title: 'Personalized Service', text: 'Care shaped around you.' },
  { icon: ShieldCheck, title: 'Excellence in Every Detail', text: 'Thoughtful from arrival to departure.' },
];

const commitmentBadges: Badge[] = [
  { icon: Leaf, title: 'Eco-Friendly Practices', text: 'Better choices for tomorrow.' },
  { icon: Users, title: 'Supporting Local Communities', text: 'Growing together, locally.' },
  { icon: Sparkles, title: 'Sustainable Hospitality', text: 'Comfort with a lighter footprint.' },
];

const distances = [
  ['Bole International Airport', '15 min'],
  ['Addis Ababa Museum', '10 min'],
  ['Meskel Square', '12 min'],
  ['Entoto Mountain', '25 min'],
];

function BadgeRow({ badges, light = false }: { badges: Badge[]; light?: boolean }) {
  return <div className="mt-8 grid gap-6 sm:grid-cols-3">{badges.map(({ icon: Icon, title, text }) => <div key={title} className={`border-l pl-4 ${light ? 'border-white/20' : 'border-[#d4ccc0]'}`}><Icon className={`h-6 w-6 ${light ? 'text-[#d0a657]' : 'text-[#b9893e]'}`} /><p className={`mt-3 text-[11px] font-semibold uppercase tracking-wide ${light ? 'text-white' : 'text-[#171513]'}`}>{title}</p><p className={`mt-1 text-xs leading-5 ${light ? 'text-white/55' : 'text-[#756e65]'}`}>{text}</p></div>)}</div>;
}

export default function AboutPage() {
  return (
    <div className="bg-[#f8f5ef]">
      <section className="relative flex min-h-[560px] items-center overflow-hidden bg-[#111]">
        <img src={heroImage} alt="Elegant hotel lobby with warm lighting" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081018]/95 via-[#091019]/70 to-[#081018]/25" />
        <div className="container-hotel relative z-10 py-28"><div className="max-w-xl animate-fade-in"><span className="eyebrow">Our Story</span><h1 className="mt-5 font-serif text-5xl leading-[1.05] text-white sm:text-6xl">Hospitality with Character</h1><p className="mt-5 max-w-md text-lg leading-7 text-white/70">Rooted in Ethiopian heritage. Committed to exceptional hospitality.</p><Link href="#story" className="btn-gold mt-8">Discover Our Story <ArrowRight className="ml-2 h-4 w-4" /></Link></div></div>
      </section>

      <section id="story" className="container-hotel py-20 lg:py-24"><div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"><div><span className="eyebrow">Our Story</span><h2 className="mt-3 font-serif text-4xl leading-tight text-[#171513]">A Legacy of Warmth and Excellence</h2><span className="gold-divider" /><p className="text-sm leading-7 text-[#756e65]">Tewodros Belay International Hotel has been a symbol of Ethiopian hospitality in Addis Ababa for decades. Located in the heart of the city, we blend timeless tradition with modern comforts to create memorable experiences for business and leisure travelers alike.</p><Link href="/contact" className="btn-gold-outline mt-7">Our Journey <ArrowRight className="ml-2 h-4 w-4" /></Link></div><div className="h-[340px] overflow-hidden lg:h-[400px]"><img src={storyImage} alt="Welcoming hotel reception" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" /></div></div></section>

      <section className="bg-[#171717] text-white"><div className="container-hotel grid items-stretch gap-0 lg:grid-cols-2"><div className="flex flex-col justify-center py-16 lg:pr-16"><span className="eyebrow">Our Philosophy</span><h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Genuine. Thoughtful. Ethiopian.</h2><span className="gold-divider" /><p className="max-w-lg text-sm leading-7 text-white/65">We believe true hospitality comes from the heart. We listen. We care. We go the extra mile to make every stay exceptional.</p><BadgeRow badges={philosophyBadges} light /></div><div className="min-h-[360px] overflow-hidden lg:min-h-[480px]"><img src={philosophyImage} alt="Hotel team member welcoming a guest" className="h-full w-full object-cover" /></div></div></section>

      <section className="container-hotel py-20 lg:py-24"><div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"><div className="order-2 h-[340px] overflow-hidden lg:order-1 lg:h-[400px]"><img src={peopleImage} alt="Hotel staff member serving guests" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" /></div><div className="order-1 lg:order-2"><span className="eyebrow">Our People, Our Strength</span><h2 className="mt-3 font-serif text-4xl leading-tight text-[#171513]">Passionate People. Dedicated to You.</h2><span className="gold-divider" /><p className="text-sm leading-7 text-[#756e65]">Our team is the heart of who we are. From our warm welcome to our attentive service, every member is dedicated to making you feel at home.</p><Link href="/contact" className="btn-gold-outline mt-7">Meet the Team <ArrowRight className="ml-2 h-4 w-4" /></Link></div></div></section>

      <section className="bg-[#171717] text-white"><div className="container-hotel grid items-stretch gap-0 lg:grid-cols-2"><div className="flex flex-col justify-center py-16 lg:pr-16"><span className="eyebrow">Our Commitment</span><h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Sustainable. Responsible. Community Focused.</h2><span className="gold-divider" /><p className="max-w-lg text-sm leading-7 text-white/65">We are committed to sustainable practices, supporting our community and preserving the environment for future generations.</p><BadgeRow badges={commitmentBadges} light /></div><div className="min-h-[360px] overflow-hidden lg:min-h-[480px]"><img src={commitmentImage} alt="Hands planting a young tree" className="h-full w-full object-cover" /></div></div></section>

      <section className="container-hotel py-20 lg:py-24"><div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"><div><span className="eyebrow">Our Location</span><h2 className="mt-3 font-serif text-4xl leading-tight text-[#171513]">In the Heart of Addis Ababa</h2><span className="gold-divider" /><p className="text-sm leading-7 text-[#756e65]">Ideally located on CMC Road, Tsehay Real Estate, we are close to business districts, embassies, shopping and cultural attractions.</p><div className="mt-6 space-y-3">{distances.map(([place, time]) => <div key={place} className="flex items-center justify-between border-b border-[#e6dfd4] pb-3 text-sm"><span className="flex items-center gap-2 text-[#5f5851]"><Check className="h-4 w-4 text-[#b9893e]" />{place}</span><span className="font-medium text-[#171513]">{time}</span></div>)}</div><a href="https://www.google.com/maps/search/?api=1&query=CMC+Road%2C+Tsehay+Real+Estate%2C+Addis+Ababa%2C+Ethiopia" target="_blank" rel="noreferrer" className="btn-gold mt-7 w-fit">View on Map <MapPin className="ml-2 h-4 w-4" /></a></div><div className="overflow-hidden border border-[#e6dfd4] bg-white p-2"><iframe title="Map showing Tewodros Belay International Hotel location" src="https://www.google.com/maps?q=CMC+Road,+Tsehay+Real+Estate,+Addis+Ababa,+Ethiopia&output=embed" className="h-[360px] w-full border-0 lg:h-[440px]" loading="lazy" /></div></div></section>
    </div>
  );
}
