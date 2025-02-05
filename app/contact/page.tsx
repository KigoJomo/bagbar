// app/contact/page.tsx
import type { NextPage } from 'next';
import SplitTitle from '../components/SplitTitle';
import Section from '../components/Section';
import { Input } from '../components/Input';
import CtaButton from '../components/CtaButton';
import { MapPin, Phone, Mail } from 'lucide-react';
import ContactInfoSection from '../components/contact/ContactInfoSection';

const contactInfos = [
  {
    icon: <MapPin />,
    title: 'Physical Location',
    description:
      'Green House Mall\nOpen Daily 10AM-7PM\nExclusive pieces - highest quality in Kenya.',
  },
  {
    icon: <Phone />,
    title: 'Styling Consultations',
    description:
      '+254 758 359 456\nWhatsApp Support: 11AM-9PM EAT\nAsk about available styles for your fashion needs.',
  },
  {
    icon: <Mail />,
    title: 'Customer Care',
    description:
      'care@bagbar.net\nResponse within 24 hours\nInclude photos for strap adjustment advice',
  },
];

const Page: NextPage = () => {
  return (
    <>
      <section className="flex flex-col items-center gap-12">
        <div className="w-full">
          <SplitTitle text="Contact us" />
        </div>

        <Section
          title="Armpit Bag Expertise"
          className="w-full"
          style={{ padding: '0' }}>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Methods */}
            <div className="space-y-6">
              {contactInfos.map((info, index) => (
                <ContactInfoSection
                  key={index}
                  icon={info.icon}
                  title={info.title}
                  description={info.description}
                />
              ))}
            </div>

            {/* Contact Form */}
            <form className="space-y-6">
              <Input label="Your Name" name="name" type="text" required />
              <Input label="Email" name="email" type="email" required />
              <Input
                label="Phone (WhatsApp Preferred)"
                name="phone"
                type="tel"
                required
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Armpit Bag Inquiry About
                </label>
                <select
                  name="subject"
                  className="w-full rounded-none border border-foreground-light px-4 py-2 bg-transparent"
                  required>
                  <option value="">Select Topic</option>
                  <option>Strap Adjustments</option>
                  <option>Size Consultation</option>
                  <option>Bulk Orders (5+ units)</option>
                  <option>Designer Collaborations</option>
                  <option>Press Inquiries</option>
                </select>
              </div>
              <textarea
                name="message"
                placeholder="Include your preferred carrying style (crossbody, single arm, etc.)"
                rows={4}
                className="w-full rounded-none border border-foreground-light px-4 py-2 bg-transparent"
                required
              />
              <CtaButton
                label="Send Inquiry"
                type="submit"
                className="w-full"
              />
            </form>
          </div>

          <br />
        </Section>
        <hr />
      </section>
    </>
  );
};

export default Page;
