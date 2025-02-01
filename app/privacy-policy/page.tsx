import type { NextPage } from 'next';
import SplitTitle from '../components/SplitTitle';
import Section from '../components/Section';
import CtaBanner from '../components/CtaBanner';

const Page: NextPage = () => {
  return (
    <>
      <section className="flex flex-col gap-4">
        <SplitTitle text="privacy policy" />

        <hr className="border-foreground-faded" />

        <Section title="We Protect Your Trust">
          <p className="mb-4">
            As Nairobi&apos;s favorite affordable handbag destination, we prioritize your privacy:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Secure Payments:</strong> SSL encryption with Flutterwave</li>
            <li><strong>No Spam:</strong> Opt-in marketing only</li>
            <li><strong>Data Protection:</strong> Never share customer details</li>
          </ul>
        </Section>

        <Section title="Information We Collect">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Essential Data</h3>
              <p>Delivery addresses, contact info, order history</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Payment Security</h3>
              <p>PCI-DSS compliant transaction processing</p>
            </div>
          </div>
        </Section>

        <CtaBanner 
          text="Shop Confidently Today"
          link="/products"
        />
      </section>  
    </>
  );
};

export default Page;
