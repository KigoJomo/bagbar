'use client';
import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ImageCarouselProps {
  images: string[];
  className?: string;
  aspectRatio?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, className, aspectRatio="aspect-[1]" }) => {
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
    <div className={`w-full h-fit flex-shrink-0 ${className} ${aspectRatio}`}>
      <Slider {...settings}>
        {images.map((imgSrc, index) => (
          <Image
            key={index}
            src={imgSrc}
            alt={`Bag bar ${index + 1}`}
            width={1000}
            height={1000}
            className={`w-full ${aspectRatio}`}
          />
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
