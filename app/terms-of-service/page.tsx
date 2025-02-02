import type { NextPage } from 'next';
import SplitTitle from '../components/SplitTitle';
import Section from '../components/Section';
import CtaBanner from '../components/CtaBanner';


const Page: NextPage = () => {
  return (
    <>
      <section className="flex flex-col items-center gap-4">
        <div className="w-full">
          <SplitTitle text="terms_of service" />
        </div>

        <hr className="border-foreground-faded" />

        <Section title="Our Promise to You">
          <p className="mb-4">
            As Kenya&apos;s leader in affordable luxury handbags, we commit to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Accurate product descriptions with size guides</li>
            <li>Transparent pricing (KES)</li>
            <li>Ethical business practices</li>
          </ul>
        </Section>

        <Section title="Customer Responsibilities">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Order Accuracy</h3>
              <p>Review cart before checkout</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Fair Use</h3>
              <p>Personal shopping only</p>
            </div>
          </div>
        </Section>

        <CtaBanner 
          text="Discover Our Bestsellers"
          link="/products"
          className='w-screen'
        />
      </section>  
    </>
  );
};

export default Page;
