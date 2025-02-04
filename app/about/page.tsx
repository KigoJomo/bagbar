import type { NextPage } from 'next';
import SplitTitle from '../components/SplitTitle';
import Section from '../components/Section';
import CtaBanner from '../components/CtaBanner';

const Page: NextPage = () => {
  return (
    <>
      <section className="flex flex-col items-center gap-8">
        <div className="w-full">
          <SplitTitle text="about bag-bar" />
        </div>
        
        <Section title="The Armpit Bag Authority">
          <div className="space-y-6">
        <p>
          Founded in Nairobi (2024), Bag-Bar has become East Africa&apos;s premier destination for 
          curated armpit bags. We scour global markets to bring you the perfect fusion of 
          urban functionality and avant-garde design - no compromises between style and 
          practicality.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h3 className="font-semibold">Curator&apos;s Eye</h3>
            <p className="text-foreground-light">
          Our team travels from Milan&apos;s design studios to Tokyo&apos;s street markets, 
          handpicking only armpit bags that pass our 23-point assessment for 
          ergonomics, material quality, and urban adaptability.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Fit Specialists</h3>
            <p className="text-foreground-light">
          Every bag undergoes our proprietary ArmFit® assessment - testing strap 
          tension, weight distribution, and mobility across body types. Your comfort 
          isn&apos;t optional; it&apos;s our selection criteria.
            </p>
          </div>
        </div>
          </div>
        </Section>

        <Section title="Our Retail Philosophy">
          <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <h3 className="font-semibold">Edit, Don&apos;t Flood</h3>
          <p className="text-foreground-light">
            We reject fast fashion&apos;s overload. Our seasonal edits feature only 12-15 
            exceptional armpit bag designs - each rigorously vetted for durability and 
            timeless appeal.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold">Transparent Sourcing</h3>
          <p className="text-foreground-light">
            Know your bag&apos;s journey. We disclose each designer&apos;s location, materials 
            provenance, and ethical certifications. No anonymous supply chains.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold">Nairobi Hub</h3>
          <p className="text-foreground-light">
            While our designers span continents, every purchase supports Nairobi&apos;s 
            fashion ecosystem through our Design Incubator program for emerging 
            Kenyan accessories talent.
          </p>
        </div>
          </div>
        </Section>

        <CtaBanner 
          text="Shop Curated Selection"
          link="/products"
          className="mt-12 w-screen"
        />
      </section>
    </>
  );
};

export default Page;