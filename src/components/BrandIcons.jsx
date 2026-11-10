import React from 'react';

/**
 * Authentic Instagram Logo with official radial gradient background
 */
export function InstagramIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <radialGradient id="instagram-gradient" cx="0.2" cy="1" r="1.2">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="25%" stopColor="#fd5949" />
          <stop offset="50%" stopColor="#d6249f" />
          <stop offset="100%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      {/* Official Rounded Background */}
      <rect width="24" height="24" rx="5.5" fill="url(#instagram-gradient)" />
      {/* Official White Camera Lens Contour */}
      <rect x="5.2" y="5.2" width="13.6" height="13.6" rx="3.8" stroke="white" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.2" stroke="white" strokeWidth="1.7" />
      <circle cx="15.8" cy="8.2" r="0.9" fill="white" />
    </svg>
  );
}

/**
 * Authentic LinkedIn Logo with official #0A66C2 blue background and white "in"
 */
export function LinkedInIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Official LinkedIn Blue Background */}
      <rect width="24" height="24" rx="4.5" fill="#0A66C2" />
      {/* Official White "in" typography */}
      <path 
        d="M6.5 9.5H9V18H6.5V9.5ZM7.75 6C8.58 6 9.25 6.67 9.25 7.5C9.25 8.33 8.58 9 7.75 9C6.92 9 6.25 8.33 6.25 7.5C6.25 6.67 6.92 6 7.75 6ZM10.5 9.5H13V10.8H13.04C13.4 10.1 14.3 9.3 15.6 9.3C18.3 9.3 18.8 11.1 18.8 13.4V18H16.3V14C16.3 13 16.28 11.8 14.88 11.8C13.46 11.8 13.25 12.9 13.25 13.9V18H10.75V9.5H10.5Z" 
        fill="white" 
      />
    </svg>
  );
}
