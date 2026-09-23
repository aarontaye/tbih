import SectionHeading from '@/components/layout/SectionHeading';

export default function Home() {
  return (
    <div className="bg-hotel-cream">
      {/* Hero placeholder — full content will be built in next step */}
      <section className="relative h-[60vh] min-h-[400px] bg-hotel-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-hotel-dark/80 to-hotel-dark/60" />
        <div className="relative container-hotel text-center text-white">
          <span className="eyebrow">Welcome to Addis Ababa</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 leading-tight">
            Tewodros Belay
            <br />
            <span className="text-hotel-gold">International Hotel</span>
          </h1>
          <span className="block w-20 h-px bg-hotel-gold mx-auto my-6" />
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Where timeless Ethiopian elegance meets modern luxury.
          </p>
        </div>
      </section>

      {/* Placeholder section showing SectionHeading component */}
      <section className="container-hotel py-20">
        <SectionHeading
          eyebrow="Design System Verified"
          title="Navbar & Footer Active"
          description="The shared layout is working. Page content will be built in the next step."
        />
      </section>
    </div>
  );
}
