'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/rooms', label: 'Rooms & Suites' },
  { href: '/booking', label: 'Book Your Stay' },
  { href: '/offers', label: 'Offers & Packages' },
  { href: '/dining', label: 'Dining' },
  { href: '/wellness', label: 'Wellness & Fitness' },
  { href: '/meetings', label: 'Meetings & Events' },
  { href: '/experiences', label: 'Experiences' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact & Location' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:block bg-hotel-dark text-white/60 text-xs py-2">
        <div className="container-hotel flex items-center justify-between">
          <span className="tracking-wider">Addis Ababa, Ethiopia</span>
          <div className="flex items-center gap-6">
            <a href="tel:+251111234567" className="flex items-center gap-2 hover:text-hotel-gold transition-colors">
              <Phone className="w-3 h-3" />
              +251 111 234 567
            </a>
            <span className="text-white/30">|</span>
            <span className="tracking-wider">Reservations 24/7</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-hotel-dark/95 backdrop-blur-md shadow-lg'
            : 'bg-hotel-dark'
        )}
      >
        <nav className="container-hotel">
          <div className="flex items-center justify-between h-20">
            {/* Logo left */}
            <Link href="/" className="flex flex-col leading-none shrink-0">
              <span className="font-serif text-xl md:text-2xl text-white tracking-wide">
                Tewodros Belay
              </span>
              <span className="text-hotel-gold text-[10px] md:text-xs tracking-[0.3em] uppercase mt-1">
                International Hotel
              </span>
            </Link>

            {/* Nav links center (desktop) */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-sm font-medium tracking-wide transition-colors duration-200 relative py-2',
                      isActive
                        ? 'text-hotel-gold'
                        : 'text-white/80 hover:text-hotel-gold'
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-0 w-full h-px bg-hotel-gold" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right: BOOK NOW + hamburger */}
            <div className="flex items-center gap-3 shrink-0">
              <Link href="/booking" className="btn-gold hidden sm:inline-flex">
                Book Now
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-white p-2 hover:text-hotel-gold transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-0 z-40 lg:hidden bg-hotel-dark/98 backdrop-blur-md pt-20"
          onClick={() => setMobileOpen(false)}
        >
          <nav
            className="container-hotel flex flex-col gap-1 py-8"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-lg font-medium py-3 border-b border-white/10 transition-colors',
                    isActive
                      ? 'text-hotel-gold'
                      : 'text-white/80 hover:text-hotel-gold'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/booking" className="btn-gold mt-6 w-full">
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
