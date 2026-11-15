
import React from 'react';

export const SectionHeading = ({
  badge = '',
  title = '',
  highlight = '',
  description = '',
  align = 'center',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`space-y-4 ${
        isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'
      } ${className}`}
    >
      {/* Badge */}
      {badge && (
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold tracking-wider text-slate-600 shadow-sm ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-yellow-400" />
          <span>{badge}</span>
        </div>
      )}

      {/* Heading */}
      <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {title}{' '}
        {highlight && (
          <span className="text-yellow-600">
            {highlight}
          </span>
        )}
      </h2>

      {/* Description */}
      {description && (
        <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
