
import type { NextPage } from 'next';
import SplitTitle from '../components/SplitTitle';
import Section from '../components/Section';
import CtaBanner from '../components/CtaBanner';

const Page: NextPage = () => {
  return (
    <>
      <section className="flex flex-col items-center gap-4">
        <div className="w-full">
          <SplitTitle text='shipping policy' />
        </div>

        <hr className='border-foreground-faded' />

        <Section title="Free Nationwide Delivery">
          <p className="mb-4">
            Enjoy <strong>free shipping on all orders</strong> across Kenya! Whether you&apos;re in Nairobi&apos;s 
            bustling CBD or anywhere else in the country, we deliver trendy armpit bags and handbags 
            straight to your doorstep within <strong>3-5 business days</strong>.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Nairobi Orders: Typically delivered within 24-48 hours</li>
            <li>Major Cities: 3 business days (Mombasa, Kisumu, Nakuru)</li>
            <li>Countrywide: 5 business days maximum</li>
          </ul>
        </Section>

        <Section title="Tracking Your Order">
          <p>
            Receive real-time SMS updates from our Nairobi hub. Track your affordable luxury handbags 
            via our partnership with <strong>G4S</strong>.
          </p>
        </Section>

        <CtaBanner 
          text="Shop Now & Enjoy Free Shipping!"
          link="/products"
          className='w-screen'
        />
      </section>  
    </>
  );
};

export default Page;
