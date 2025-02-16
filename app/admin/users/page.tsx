
import FeatureUnderDevelopment from '@/app/components/FeatureUnderDevelopment';
import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <>
      <section className="flex flex-col gap-6">
        <h3>manage users</h3>
        <FeatureUnderDevelopment />
      </section>  
    </>
  );
};

export default Page;
