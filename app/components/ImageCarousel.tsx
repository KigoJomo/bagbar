'use client';
import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ImageCarouselProps {
  images: string[];
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, className }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
    // adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className={`w-full h-fit flex-shrink-0 aspect-square md:aspect-[3/1] ${className}`}>
      <Slider {...settings}>
        {images.map((imgSrc, index) => (
          <Image
            key={index}
            src={imgSrc}
            alt={`Bag bar ${index + 1}`}
            width={1000}
            height={1000}
            className="w-full aspect-square md:aspect-[3/1]"
          />
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
