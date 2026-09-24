import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  Check,
  Coffee,
  Landmark,
  MapPin,
  Mountain,
  ShoppingBag,
  Sparkles,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const heroImage =
  'https://images.pexels.com/photos/35368884/pexels-photo-35368884.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600';

interface Experience {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
}

const experiences: Experience[] = [
  {
    title: 'Entoto Mountain',
    description: 'Enjoy panoramic views of Addis Ababa from the highest peak. A perfect escape for nature and fresh air.',
    image: 'https://images.pexels.com/photos/33337903/pexels-photo-33337903.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Mountain,
  },
  {
    title: 'National Museum',
    description: 'Home to Lucy and Ethiopia’s rich heritage. A must-visit for history and culture enthusiasts.',
    image: 'https://images.pexels.com/photos/12227297/pexels-photo-12227297.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Landmark,
  },
  {
    title: 'Ethiopian Culture',
    description: 'Experience Ethiopia’s vibrant traditions, music, dance and the warmth of its people.',
    image: 'https://images.pexels.com/photos/15227915/pexels-photo-15227915.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Users,
  },
  {
    title: 'Coffee Experience',
    description: 'Savor the rich aroma of Ethiopian coffee with an authentic traditional coffee ceremony.',
    image: 'https://images.pexels.com/photos/6742970/pexels-photo-6742970.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Coffee,
  },
  {
    title: 'Shopping in Addis',
    description: 'From local crafts to international brands, discover the best shopping destinations in the city.',
    image: 'https://images.pexels.com/photos/34728541/pexels-photo-34728541.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: ShoppingBag,
  },
  {
    title: 'Business Districts',
    description: 'Stay connected to the heart of business. Close to major corporate hubs and embassies.',
    image: 'https://images.pexels.com/photos/36200692/pexels-photo-36200692.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Briefcase,
  },
];

const attractions = [
  'Lalibela & Rock Churches',
  'Blue Nile Falls',
  'Debre Libanos Monastery',
  'Bishoftu Crater Lakes',
  'Awash National Park',
  'Many More',
];

export default function ExperiencesPage() {
  return (
    <div className="bg-[#f8f5ef]">
      <section className="relative flex min-h-[560px] items-center overflow-hidden bg-[#111]">
        <img src={heroImage} alt="Addis Ababa city skyline at dusk" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081018]/95 via-[#091019]/65 to-[#081018]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0c]/75 via-transparent to-transparent" />
        <div className="container-hotel relative z-10 py-28">
          <div className="max-w-xl animate-fade-in">
            <span className="eyebrow">Experiences</span>
            <h1 className="mt-5 font-serif text-5xl leading-[1.05] text-white sm:text-6xl">Discover Addis Ababa</h1>
            <p className="mt-5 max-w-md text-lg leading-7 text-white/70">Explore the culture, history and vibrant spirit of Ethiopia’s dynamic capital.</p>
            <Link href="#experiences" className="btn-gold mt-8">Plan Your Experience <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section id="experiences" className="container-hotel py-20 lg:py-24">
        <div className="mb-12 text-center">
          <span className="eyebrow">Explore the City</span>
          <h2 className="mt-3 font-serif text-4xl text-[#171513] sm:text-5xl">Curated Experiences Just for You</h2>
          <span className="mx-auto mt-5 block h-px w-16 bg-[#b9893e]" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map(({ title, description, image, icon: Icon }) => (
            <article key={title} className="group overflow-hidden border border-[#e6dfd4] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-56 overflow-hidden">
                <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute bottom-0 left-6 flex h-14 w-14 translate-y-1/2 items-center justify-center rounded-full border-4 border-[#f8f5ef] bg-[#c99b4a] text-white shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="p-6 pt-10">
                <h3 className="font-serif text-2xl text-[#171513]">{title}</h3>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#756e65]">{description}</p>
                <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9a6f2e] transition-colors hover:text-[#171513]">Explore More <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-hotel pb-20 lg:pb-24">
        <div className="grid overflow-hidden border border-[#e6dfd4] bg-white lg:grid-cols-2">
          <div className="relative min-h-[320px] overflow-hidden">
            <img src="https://images.pexels.com/photos/6742986/pexels-photo-6742986.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Historic Ethiopian church and mountain landscape" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#c99b4a] text-white"><MapPin className="h-5 w-5" /></div>
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <span className="eyebrow">Beyond the City</span>
            <h2 className="mt-3 font-serif text-4xl text-[#171513]">Local Attractions</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#756e65]">From UNESCO world heritage sites to hidden gems, explore the diverse beauty Ethiopia has to offer.</p>
            <div className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {attractions.map((attraction) => <div key={attraction} className="flex items-center gap-2 text-xs text-[#5f5851]"><Check className="h-3.5 w-3.5 shrink-0 text-[#b9893e]" />{attraction}</div>)}
            </div>
            <Link href="/contact" className="btn-gold mt-7 w-fit">View All Attractions <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="container-hotel pb-24">
        <div className="flex flex-col items-start justify-between gap-5 border border-[#c99b4a] bg-[#171717] p-7 text-white sm:flex-row sm:items-center sm:px-10">
          <div className="flex items-center gap-5"><Sparkles className="h-8 w-8 shrink-0 text-[#d0a657]" /><div><h2 className="font-serif text-2xl">Let us take care of the details.</h2><p className="mt-1 text-sm text-white/60">Our concierge team is happy to help you plan personalised experiences.</p></div></div>
          <Link href="/contact" className="btn-gold-outline shrink-0">Contact Concierge <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </div>
      </section>
    </div>
  );
}
