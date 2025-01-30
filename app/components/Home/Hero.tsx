import React from 'react';
import ImageCarousel from '../ImageCarousel';

const Hero: React.FC = () => {
  const heroImages = [
    "/images/hero-1.webp",
    "/images/hero-2.webp",
    "/images/hero-3.webp",
    "/images/hero-4.webp",
  ]

  return (
    <section className="flex flex-col gap-6 px-0">
      <div className="w-full aspect-square md:aspect-[3/1] relative flex flex-col justify-end">
        <div className="w-4/5 mx-auto flex flex-col z-[2]">
          <div className="w-full flex items-center">
            <h2 className="uppercase italic">bag</h2>
            <div className="w-full h-[1px] bg-foreground-faded"></div>
          </div>

          <div className="w-full flex items-center -mt-6">
            <div className="w-full h-[1px] bg-foreground-faded"></div>
            <h2 className="uppercase italic">bar</h2>
          </div>
        </div>

        <ImageCarousel images={heroImages} className='absolute z-[1]' />
      </div>
    </section>
  );
};

export default Hero;
