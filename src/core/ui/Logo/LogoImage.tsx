
import React, { CSSProperties } from 'react';

const LogoImage: React.FC<{
  className?: string;
  style?: CSSProperties;
}> = ({ className, style }) => { // Add style here
  const logoUrl = 'https://firebasestorage.googleapis.com/v0/b/daf1-76f17.appspot.com/o/Screenshot%20at%20Jun%2021%2009-36-40.png?alt=media&token=b6c10d7a-c5b5-45c4-ba7b-18b3c130e7cd'; // Replace with your actual image URL

  return (
    <img
      className={`${className ?? 'w-[95px] sm:w-[105px]'}`}
      style={style} // Now style is defined
      src={logoUrl}
      alt="Logo"
    />
  );
};

export default LogoImage;