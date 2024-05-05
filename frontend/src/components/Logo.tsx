import Image from 'next/image';
import React from 'react';

// Define an interface for component props
interface LogoProps {
  src: string;
}

const Logo = ({ src }: LogoProps) => {
  return (
    <div className="absolute top-0 left-0 p-4">
      <Image 
        src={src} 
        alt="Logo" 
        width={256}  // Specify width
        height={256} // Specify height
        layout="fixed"
      />
    </div>
  );
};

export default Logo;

