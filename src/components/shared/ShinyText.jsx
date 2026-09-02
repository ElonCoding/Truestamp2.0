'use client';

import React from 'react';

const ShinyText = ({
  text,
  disabled = false,
  speed = 3,
  className = '',
  color = '#a1a1aa',
  shineColor = '#ffffff',
  spread = 120,
}) => {
  if (disabled) {
    return <span className={className} style={{ color }}>{text}</span>;
  }

  return (
    <span
      className={`inline-block shiny-text-css ${className}`}
      style={{
        backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 38%, ${shineColor} 50%, ${color} 62%, ${color} 100%)`,
        backgroundSize: '250% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
