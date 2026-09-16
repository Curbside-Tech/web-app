import type { ReactNode, HTMLAttributes } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  interactive?: boolean;
  accent?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const paddingMap = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function GlassCard({
  children,
  interactive = false,
  accent = false,
  padding = 'md',
  className = '',
  ...rest
}: GlassCardProps) {
  const baseClass = interactive ? 'glass-panel-interactive' : 'glass-panel';
  const accentClass = accent ? 'glass-panel-accent' : '';

  return (
    <div className={`${baseClass} ${accentClass} ${paddingMap[padding]} ${className}`} {...rest}>
      {children}
    </div>
  );
}
