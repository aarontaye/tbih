import Link from 'next/link';
import { ArrowRight, Clock, Dumbbell, Flower2, HeartPulse, Waves, Wind } from 'lucide-react';

const heroImage =
  'https://images.pexels.com/photos/7222183/pexels-photo-7222183.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600';

const spaImage =
  'https://images.pexels.com/photos/31234754/pexels-photo-31234754.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const saunaImage =
  'https://images.pexels.com/photos/6626143/pexels-photo-6626143.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const moroccoBathImage =
  'https://images.pexels.com/photos/7598373/pexels-photo-7598373.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const massageImage =
  'https://images.pexels.com/photos/31234753/pexels-photo-31234753.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const relaxationBannerImage =
  'https://images.pexels.com/photos/9155201/pexels-photo-9155201.jpeg?auto=compress&cs=tinysrgb&h=650&w=1600';

const gymImage =
  'https://images.pexels.com/photos/7031717/pexels-photo-7031717.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const equipmentImage =
  'https://images.pexels.com/photos/7031705/pexels-photo-7031705.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const wellnessGrid = [
  {
    title: 'Spa',
    description: 'Rejuvenating treatments in a tranquil sanctuary designed for total relaxation.',
    image: spaImage,
    icon: Flower2,
  },
  {
    title: 'Sauna',
    description: 'Unwind in our Finnish sauna, perfect for soothing muscles and calming the mind.',
    image: saunaImage,
    icon: Wind,
  },
  {
    title: 'Steam & Morocco Bath',
    description: ' cleanse and revitalise with our traditional Moroccan hammam and steam rooms.',
    image: moroccoBathImage,
    icon: Waves,
  },
  {
    title: 'Massage',
    description: 'Expert therapists offer a range of massages tailored to your needs.',
    image: massageImage,
    icon: HeartPulse,
  },
];

const fitnessGrid = [
  {
    title: 'Gym',
    description: 'A fully equipped fitness centre with panoramic views of Addis Ababa.',
    image: gymImage,
  },
  {
    title: 'Equipment',
    description: 'State-of-the-art cardio machines, free weights, and functional training gear.',
    image: equipmentImage,
  },
];

const openingHours = [
  { day: 'Monday – Friday', hours: '6:00 AM – 10:00 PM' },
  { day: 'Saturday', hours: '7:00 AM – 9:00 PM' },
  { day: 'Sunday', hours: '8:00 AM – 8:00 PM' },
];

export default function WellnessPage() {
  return (
    <div className="bg-[#f8f5ef]">
      {/* Hero */}
      <section className="relative flex min-h-[540px] items-center overflow-hidden bg-[#111]">
        <img
          src={heroImage}
          alt="Wellness and spa at Tewodros Belay International Hotel"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081018]/95 via-[#091019]/70 to-[#081018]/30" />
        <div className="container-hotel relative z-10 pb-28 pt-28">
          <div className="max-w-xl animate-fade-in">
            <span className="eyebrow">Rejuvenate</span>
            <h1 className="mt-5 font-serif text-5xl leading-tight text-white sm:text-6xl">
              Wellness & Fitness
            </h1>
            <p className="mt-5 text-lg text-white/70">
              Restore your body and mind. From our serene spa to our modern
              fitness centre, every facility is designed for your wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* Wellness grid */}
      <section className="container-hotel pt-20">
        <div className="mb-10 text-center">
          <span className="eyebrow">Wellness</span>
          <h2 className="mt-3 font-serif text-4xl text-[#171513]">
            Relax &amp; Rejuvenate
          </h2>
          <span className="mx-auto block h-px w-16 bg-[#b9893e]" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {wellnessGrid.map(({ title, description, image, icon: Icon }) => (
            <div
              key={title}
              className="group relative h-72 overflow-hidden border border-[#e6dfd4]"
            >
              <img
                src={image}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0c]/90 via-[#0a0b0c]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#d0a657]">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-serif text-2xl text-white">{title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/70">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Relaxation banner */}
      <section className="container-hotel py-16">
        <div className="relative h-64 overflow-hidden sm:h-80">
          <img
            src={relaxationBannerImage}
            alt="Serene relaxation lounge"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b0c]/85 to-[#0a0b0c]/40" />
          <div className="relative z-10 flex h-full flex-col justify-center p-8 sm:p-14">
            <span className="eyebrow">Pure Tranquility</span>
            <h2 className="mt-3 max-w-lg font-serif text-3xl text-white sm:text-4xl">
              A Sanctuary of Calm
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
              Step away from the bustle of the city and into a world of
              serenity. Our wellness facilities are designed to melt away stress
              and leave you feeling completely renewed.
            </p>
            <Link href="/contact" className="btn-gold mt-6 w-fit">
              Book a Treatment <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Fitness grid */}
      <section className="container-hotel pb-20">
        <div className="mb-10 text-center">
          <span className="eyebrow">Fitness</span>
          <h2 className="mt-3 font-serif text-4xl text-[#171513]">
            Stay Active
          </h2>
          <span className="mx-auto block h-px w-16 bg-[#b9893e]" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {fitnessGrid.map(({ title, description, image }) => (
            <div
              key={title}
              className="group relative h-72 overflow-hidden border border-[#e6dfd4]"
            >
              <img
                src={image}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0c]/90 via-[#0a0b0c]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#d0a657]">
                  <Dumbbell className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-serif text-2xl text-white">{title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/70">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Opening hours */}
      <section className="container-hotel pb-28">
        <div className="mx-auto max-w-md border border-[#e6dfd4] bg-white p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f8f5ef]">
            <Clock className="h-6 w-6 text-[#b9893e]" />
          </div>
          <h3 className="font-serif text-2xl text-[#171513]">Opening Hours</h3>
          <span className="mx-auto mt-3 block h-px w-12 bg-[#b9893e]" />
          <div className="mt-6 space-y-3 text-left">
            {openingHours.map(({ day, hours }) => (
              <div
                key={day}
                className="flex items-center justify-between border-b border-[#eee8df] pb-3 text-sm last:border-0"
              >
                <span className="font-medium text-[#171513]">{day}</span>
                <span className="text-[#756e65]">{hours}</span>
              </div>
            ))}
          </div>
          <Link href="/contact" className="btn-gold-outline mt-6 w-full">
            Enquire Now
          </Link>
        </div>
      </section>
    </div>
  );
}
