import type { NextPage } from 'next';
import SplitTitle from '../components/SplitTitle';
import Section from '../components/Section';
import CtaBanner from '../components/CtaBanner';

const Page: NextPage = () => {
  return (
    <>
      <section className="flex flex-col gap-4">
        <SplitTitle text="return policy" />

        <hr className="border-foreground-faded" />

        <Section title="30-Day Quality Promise">
          <p className="mb-4">
            Not loving your armpit bag? We offer{' '}
            <strong>free returns within Nairobi</strong> and nationwide refunds.
            Kenya&apos;s easiest return process for affordable luxury handbags:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Initiate returns within 30 days</li>
            <li>Original tags and packaging required</li>
            <li>Nairobi customers: Free pickup service</li>
          </ul>
        </Section>

        <Section title="How to Return">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 italic text-foreground-light">Nairobi Returns</h3>
              <p>Book free pickup via WhatsApp: +254 700 123 456</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 italic text-foreground-light">Countrywide Returns</h3>
              <p>Ship to: Bag Bar Returns, ABC Plaza, Nairobi</p>
            </div>
          </div>
        </Section>

        <CtaBanner text="Love Your Bag? Shop New Arrivals!" link="/products" />
      </section>
    </>
  );
};

export default Page;
