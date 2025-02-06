import type { NextPage } from 'next';
import SplitTitle from '../components/SplitTitle';
import Section from '../components/Section';
import CtaBanner from '../components/CtaBanner';
import Image from 'next/image';
import FeatureSection from '../components/About/FeatureSection';

const features = [
  {
    title: "Curated Selection",
    description:
      "We carefully select a limited range of high-quality armpit bags, focusing on style, functionality, and durability to ensure our customers get the best options available.",
  },
  {
    title: "Quality Assurance",
    description:
      "Each bag in our collection undergoes thorough quality checks. We partner with trusted suppliers to maintain high standards in materials and craftsmanship.",
  },
  {
    title: "Customer Focus",
    description:
      "We believe in providing excellent service and guidance to help you find the perfect armpit bag that matches your style and needs.",
  },
];

const Page: NextPage = () => {
  return (
    <>
      <section className="flex flex-col items-center gap-8 px-0">
        <div className="w-full px-6 md:px-12">
          <SplitTitle text="about bag-bar" />
        </div>

        <Section title="We Are The Armpit Bag Authority">
          <div className="space-y-6">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8">
              <Image
                src="/images/hero-1.webp"
                alt="About Bag-Bar"
                width={800}
                height={500}
                className="w-full aspect-[4/3]"
              />

              <p className="w-full md:aspect-[4/3] md:flex md:items-center px-4 md:px-0">
                Founded in Nairobi (2024), Bag-Bar has become East Africa&apos;s
                premier destination for curated armpit bags. We scour global
                markets to bring you the perfect fusion of urban functionality
                and avant-garde design - no compromises between style and
                practicality.
              </p>
            </div>

            <br />
            <hr className="border-foreground-faded" />
            <br />

            <div className="grid md:grid-cols-2 gap-8">
              <div className="w-full md:aspect-[4/3] flex flex-col md:justify-center gap-2">
                <h3 className="font-semibold px-4 md:px-0">Curator&apos;s Eye</h3>
                <p className="text-foreground-light px-4 md:px-0">
                  Our team carefully selects the finest armpit bags from global
                  designers. <br /> Each piece is meticulously evaluated to meet
                  our high standards of quality and style for our discerning
                  customers.
                </p>
              </div>

              <Image
                src="/images/static/hero-2.webp"
                alt="About Bag-Bar"
                width={800}
                height={500}
                className="w-full aspect-[4/3]"
              />
            </div>
          </div>
        </Section>

        <Section title="Our Retail Philosophy px-0">
          <div className="grid grid-cols-1 gap-8 pl-4 md:px-12">
            {features.map((feature, index) => (
              <FeatureSection
                key={index}
                index={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </Section>

        <CtaBanner
          text="Shop Curated Selection"
          link="/products"
          className="w-screen"
        />
      </section>
    </>
  );
};

export default Page;
