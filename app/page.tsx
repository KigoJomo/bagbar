import LandingPage from './components/LandingPage';
import { getFeaturedProducts, getRandomProducts } from '@/lib/supabase/queries';

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const randomProducts = await getRandomProducts();
  
  return <LandingPage featuredProducts={featuredProducts} randomProducts={randomProducts} />;
}