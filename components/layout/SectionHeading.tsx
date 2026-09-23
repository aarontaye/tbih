import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'space-y-3',
        align === 'center' && 'text-center items-center',
        align === 'left' && 'text-left items-start',
        className
      )}
    >
      {eyebrow && (
        <span className="eyebrow block">{eyebrow}</span>
      )}
      <h2
        className={cn(
          'heading-serif',
          light ? 'text-white' : 'text-hotel-dark'
        )}
      >
        {title}
      </h2>
      <span
        className={cn(
          'block h-px bg-hotel-gold',
          align === 'center' ? 'mx-auto w-16' : 'w-16'
        )}
      />
      {description && (
        <p
          className={cn(
            'text-base leading-relaxed max-w-2xl',
            align === 'center' && 'mx-auto',
            light ? 'text-white/60' : 'text-foreground/60'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
