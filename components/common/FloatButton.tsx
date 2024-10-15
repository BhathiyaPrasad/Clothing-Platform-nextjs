import React from 'react';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
    <rect width="24" height="24" fill="#1877F2" />
    <path d="M16.5 14.25l.5-3.25h-3.125v-2.114c0-.891.437-1.761 1.838-1.761h1.424V4.266s-1.293-.22-2.528-.22c-2.58 0-4.266 1.564-4.266 4.396v2.58H7.5v3.25h2.844v7.852a11.304 11.304 0 003.512 0V14.25H16.5z" fill="white" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
    <defs>
      <radialGradient id="instagramGradient" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497"/>
        <stop offset="5%" stopColor="#fdf497"/>
        <stop offset="45%" stopColor="#fd5949"/>
        <stop offset="60%" stopColor="#d6249f"/>
        <stop offset="90%" stopColor="#285AEB"/>
      </radialGradient>
    </defs>
    <rect width="24" height="24" fill="url(#instagramGradient)" />
    <path d="M12 6.865A5.135 5.135 0 1 0 17.135 12 5.135 5.135 0 0 0 12 6.865Zm0 8.469A3.334 3.334 0 1 1 15.334 12 3.334 3.334 0 0 1 12 15.334Z" fill="white"/>
    <circle cx="17.338" cy="6.662" r="1.2" fill="white"/>
    <path d="M14.2 1H9.8a8.8 8.8 0 0 0-8.8 8.8v4.4a8.8 8.8 0 0 0 8.8 8.8h4.4a8.8 8.8 0 0 0 8.8-8.8V9.8a8.8 8.8 0 0 0-8.8-8.8Zm6.6 13.2a6.6 6.6 0 0 1-6.6 6.6H9.8a6.6 6.6 0 0 1-6.6-6.6V9.8a6.6 6.6 0 0 1 6.6-6.6h4.4a6.6 6.6 0 0 1 6.6 6.6v4.4Z" fill="white"/>
  </svg>
);

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
    <rect width="24" height="24" fill="white" />
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="black"/>
  </svg>
);

const FloatingSocialButtons = () => {
  const socialLinks = [
    { name: 'Facebook', icon: FacebookIcon, url: 'https://www.facebook.com/SaluniFashion' },
    { name: 'Instagram', icon: InstagramIcon, url: 'https://www.instagram.com/saluni_fashion' },
    { name: 'TikTok', icon: TikTokIcon, url: 'https://www.tiktok.com/@salunifashion' }
  ];

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 flex flex-col ">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-80 transition-opacity duration-200"
          aria-label={`Visit our ${social.name} page`}
        >
          <social.icon />
        </a>
      ))}
    </div>
  );
};

export default FloatingSocialButtons;