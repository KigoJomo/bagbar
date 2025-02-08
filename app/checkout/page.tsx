import type { NextPage } from 'next';
import CartSection from '../components/Checkout/CartSection';
import MpesaForm from '../components/Checkout/MpesaForm';

const Page: NextPage = () => {
  return (
    <>
      <section className="">
        <h2 className="uppercase">Checkout</h2>
        <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="w-full md:w-1/3">
            <CartSection />
          </div>

          <div className="w-full md:w-2/3 md:max-h-[72.5vh] pb-2 overflow-y-scroll scrollbar-custom md:pr-4">
            <h4 className="uppercase text-foreground-light italic">
              shipping details
            </h4>
            <div className="w-full  md:pl-6">
              {/* <p className='text-xs'>Details go here</p> */}
              <hr className='border-foreground-faded' />
            </div>

            <h4 className="uppercase text-foreground-light italic mt-4">
              payment details
            </h4>
            <div className="w-full aspect-video md:pl-6 py-6 flex flex-col gap-4">
              <MpesaForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
