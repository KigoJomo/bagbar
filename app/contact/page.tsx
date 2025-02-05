// app/contact/page.tsx
import type { NextPage } from 'next';
import SplitTitle from '../components/SplitTitle';
import Section from '../components/Section';
import { Input } from '../components/Input';
import CtaButton from '../components/CtaButton';
import { MapPin, Phone, Mail } from 'lucide-react';

const Page: NextPage = () => {
  return (
    <>
      <section className="flex flex-col items-center gap-12">
        <div className="w-full">
          <SplitTitle text="Contact us" />
        </div>
        
        <Section title="Armpit Bag Expertise" className='w-full' style={{ padding: '0' }}>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="flex-shrink-0 text-accent" />
                <div>
                  <h3 className="font-semibold mb-2">Nairobi Showroom</h3>
                  <p className="text-foreground-light">
                    The Village Market, Limuru Road<br/>
                    Open Daily 10AM-7PM<br/>
                    Exclusive armpit bag fittings by appointment
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="flex-shrink-0 text-accent" />
                <div>
                  <h3 className="font-semibold mb-2">Styling Consultations</h3>
                  <p className="text-foreground-light">
                    +254 700 123 456<br/>
                    WhatsApp Support: 11AM-9PM EAT<br/>
                    Ask about our virtual arm-fit assessments
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="flex-shrink-0 text-accent" />
                <div>
                  <h3 className="font-semibold mb-2">Customer Care</h3>
                  <p className="text-foreground-light">
                    care@bagbar.co.ke<br/>
                    Response within 24 hours<br/>
                    Include photos for strap adjustment advice
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="space-y-6">
              <Input
                label="Your Name"
                name="name"
                type="text"
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                required
              />
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
                  required
                >
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
        </Section>

        <Section title="Visit Us" className="w-full">
          <div className="aspect-video bg-foreground-faded">
            <div className="w-full h-full flex items-center justify-center text-foreground-light">
              Map placeholder - The Village Market, Nairobi
            </div>
          </div>
        </Section>
      </section>
    </>
  );
};

export default Page;