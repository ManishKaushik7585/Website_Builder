export const motionTokens = {
  duration: {
    fast: '150ms',
    base: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  delay: {
    none: '0ms',
    short: '100ms',
    medium: '200ms',
  },
  easing: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    enter: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    exit: 'cubic-bezier(0.4, 0.0, 1, 1)',
    emphasized: 'cubic-bezier(0.2, 0.0, 0.0, 1)',
  },
  distance: {
    sm: '4px',
    md: '16px',
    lg: '32px',
  },
  scale: {
    sm: '0.98',
    md: '0.95',
    lg: '0.90',
  },
  visibility: {
    fadeIn: 'opacity: 1',
    fadeOut: 'opacity: 0',
  },
  intensity: {
    restrained: 'restrained',
    standard: 'standard',
    expressive: 'expressive',
  }
};
