import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonHref: string;
  className?: string;
}

export default function FeatureCard({
  image,
  imageAlt,
  icon: Icon,
  title,
  description,
  features,
  buttonText,
  buttonHref,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        'group bg-white rounded-sm overflow-hidden shadow-sm border border-hotel-cream-dark/40 transition-all duration-300 hover:shadow-xl flex flex-col',
        className
      )}
    >
      {/* Image top */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Icon badge */}
        <div className="absolute -bottom-6 left-6 w-12 h-12 bg-hotel-gold rounded-full flex items-center justify-center shadow-lg">
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-8 flex flex-col flex-1">
        <h3 className="font-serif text-xl text-hotel-dark mb-3">{title}</h3>
        <p className="text-sm text-foreground/60 leading-relaxed mb-5">{description}</p>

        {/* Checklist */}
        <ul className="space-y-2 mb-6 flex-1">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-foreground/70">
              <Check className="w-4 h-4 text-hotel-gold shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Button */}
        <Link
          href={buttonHref}
          className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-hotel-gold hover:text-hotel-gold-dark transition-colors group/btn"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
