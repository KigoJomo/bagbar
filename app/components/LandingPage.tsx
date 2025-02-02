// app/components/LandingPage.tsx
// 'use client';
import { Lock, ShieldCheck, Star, Truck } from 'lucide-react';
import ImageCarousel from './ImageCarousel';
import ProductGrid from './ProductGrid';
import CtaBanner from './CtaBanner';
import SplitTitle from './SplitTitle';
import { Product } from '@/types/declarations';

const heroImages = [
  '/images/static/hero-1.webp',
  '/images/static/hero-2.webp',
  '/images/static/hero-3.webp',
];

export default function LandingPage({
  featuredProducts,
  randomProducts,
}: {
  featuredProducts: Product[];
  randomProducts: Product[];
}) {
  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 md:gap-8">
          <div className="w-4/5 mx-auto md:w-full flex flex-col justify-evenly">
            <SplitTitle text="bag bar" />

            <p className="hidden md:flex text-lg">
              Discover Nairobi&apos;s favorite destination for affordable luxury
              handbags. Meticulously crafted with premium materials, our curated
              collection of armpit bags brings runway-inspired designs to Kenyan
              fashionistas. Enjoy free nationwide delivery and a 30-day quality
              guarantee on every purchase.
            </p>

            <CtaBanner
              text="Explore Collection"
              link="/products"
              className="w-full my-0 hidden md:flex"
            />
          </div>

          <div className="w-full md:border border-foreground-faded flex flex-col items-center gap-6 md:gap-0">
            <ImageCarousel
              images={heroImages}
              className="w-screen md:w-full"
              aspectRatio="aspect-[1]"
            />

            <p className="flex md:hidden text-sm">
              Premium handbags at accessible prices. Nairobi-crafted styles with
              free delivery across Kenya. 30-day quality promise included.
            </p>

            <CtaBanner
              text="Explore Collection"
              link="/products"
              className="w-screen my-0 md:hidden"
            />
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="my-12 md:my-20 flex flex-col gap-6 md:gap-12">
        <SplitTitle text="Our Collection" />

        <ProductGrid products={randomProducts} />
      </section>

      {/* Featured Products */}
      <section className="my-12 md:my-20 flex flex-col items-center gap-6 md:gap-12">
        <div className="w-full">
          <SplitTitle text="Best Sellers" />
        </div>
        <ProductGrid products={featuredProducts} />
        <div className="text-center mt-8">
          <CtaBanner
            text="View All Products"
            link="/products"
            className="my-0 w-screen"
          />
        </div>
      </section>

      {/* USP Section */}
      <section className="">
        <div className="grid md:grid-cols-3 gap-8 border-y border-foreground-faded py-12 md:py-16">
          {[
            {
              title: 'Free Nationwide Delivery',
              icon: <Truck size={96} strokeWidth={1} />,
              text: 'Get your order delivered within 3-5 business days across Kenya',
            },
            {
              title: '30-Day Quality Promise',
              icon: <ShieldCheck size={96} strokeWidth={1} />,
              text: 'Not satisfied? We offer free returns within Nairobi',
            },
            {
              title: 'Secure Payments',
              icon: <Lock size={96} strokeWidth={1} />,
              text: 'PCI-DSS compliant transactions with SSL encryption',
            },
          ].map((usp, index) => (
            <div key={index} className="flex flex-col items-center gap-6">
              <div className="text-accent ">{usp.icon}</div>
              <h4 className="text-xl uppercase font-semibold pb-1 border-b border-foreground-faded">
                {usp.title}
              </h4>
              <p className="text-center">{usp.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="my-12 md:my-20 ">
        <SplitTitle text="Loved By Customers" />
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="border border-foreground-faded p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-foreground-faded" />
                <div>
                  <h4 className="font-semibold">Anonymous</h4>
                  <p className="text-sm text-foreground-light">Nairobi</p>
                </div>
              </div>
              <p className="text-foreground-light">
                &quot;Absolutely love my new armpit bag! The quality surpassed
                my expectations and the delivery was faster than promised.&quot;
              </p>
              <div className="flex gap-1 mt-4 text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <CtaBanner text="Ready to Elevate Your Style?" link="/products" />
    </>
  );
}
