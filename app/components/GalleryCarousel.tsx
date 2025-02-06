// components/GalleryCarousel.tsx
'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface GalleryCarouselProps {
  images: string[];
  className?: string;
}

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ images, className }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainSliderRef = useRef<Slider>(null);
  const thumbnailSliderRef = useRef<Slider>(null);

  const mainSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    beforeChange: (current: number, next: number) => setActiveIndex(next),
  };

  const thumbnailSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: false,
    vertical: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          vertical: false,
        }
      }
    ]
  };

  return (
    <div className={`w-full md:aspect-[4/3.22] flex flex-col md:flex-row gap-2 ${className}`}>
      {/* Main Image Carousel */}
      <div className="relative aspect-square md:w-4/5">
        <Slider {...mainSettings} ref={mainSliderRef}>
          {images.map((imgSrc, index) => (
            <Image
              key={index}
              src={imgSrc}
              alt={`Product view ${index + 1}`}
              width={1200}
              height={1200}
              className="w-full aspect-square object-cover border border-foreground-faded"
            />
          ))}
        </Slider>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="px-4 md:px-0">
          <Slider {...thumbnailSettings} ref={thumbnailSliderRef}>
            {images.map((imgSrc, index) => (
              <div
                key={index}
                className={`px-1 cursor-pointer transition-opacity ${
                  index === activeIndex ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                }`}
                onClick={() => {
                  mainSliderRef.current?.slickGoTo(index);
                  thumbnailSliderRef.current?.slickGoTo(index);
                }}
              >
                <Image
                  src={imgSrc}
                  alt={`Thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="aspect-square object-cover border border-foreground-faded"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default GalleryCarousel;