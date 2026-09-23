import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from 'lucide-react';

const quickLinks = [
  { href: '/rooms', label: 'Rooms & Suites' },
  { href: '/booking', label: 'Book Your Stay' },
  { href: '/offers', label: 'Offers & Packages' },
  { href: '/dining', label: 'Dining' },
  { href: '/wellness', label: 'Wellness & Fitness' },
];

const exploreLinks = [
  { href: '/meetings', label: 'Meetings & Events' },
  { href: '/experiences', label: 'Experiences' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact & Location' },
];

const socialIcons = [
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Youtube, href: '#', label: 'Youtube' },
];

export default function Footer() {
  return (
    <footer className="bg-hotel-dark text-white">
      {/* Top section */}
      <div className="container-hotel py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand blurb + social */}
          <div className="space-y-5">
            <div className="flex flex-col leading-none">
              <span className="font-serif text-2xl text-white tracking-wide">
                Tewodros Belay
              </span>
              <span className="text-hotel-gold text-xs tracking-[0.3em] uppercase mt-1">
                International Hotel
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Experience the finest Ethiopian hospitality in the heart of Addis Ababa.
              Where timeless elegance meets modern comfort, and every stay becomes a
              cherished memory.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialIcons.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center border border-white/20 rounded-full transition-all duration-300 hover:border-hotel-gold hover:bg-hotel-gold hover:text-white"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-hotel-gold text-sm font-medium tracking-[0.2em] uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-hotel-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Explore */}
          <div className="space-y-4">
            <h4 className="text-hotel-gold text-sm font-medium tracking-[0.2em] uppercase">
              Explore
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-hotel-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact info */}
          <div className="space-y-4">
            <h4 className="text-hotel-gold text-sm font-medium tracking-[0.2em] uppercase">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-hotel-gold shrink-0 mt-0.5" />
                <span>Bole Road, Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="w-4 h-4 text-hotel-gold shrink-0" />
                <a href="tel:+251111234567" className="hover:text-hotel-gold transition-colors">
                  +251 111 234 567
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="w-4 h-4 text-hotel-gold shrink-0" />
                <a href="mailto:reservations@tewodrosbelayhotel.com" className="hover:text-hotel-gold transition-colors">
                  reservations@tewodrosbelayhotel.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-hotel py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40 tracking-wide">
            &copy; {new Date().getFullYear()} Tewodros Belay International Hotel. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="text-xs text-white/40 hover:text-hotel-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-xs text-white/40 hover:text-hotel-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
