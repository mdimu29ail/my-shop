import Banner from '@/components/banner';
import Footer from '@/components/footer';
import HeroBanner from '@/components/HeroBanner';
import ProductGrid from '@/components/ProductGrid';
import Products from '@/components/products';
import TravelCard from '@/components/TravelCard';

export default function Homepage() {
  return (
    <div className="">
      <Banner></Banner>
      <Products />
      <HeroBanner></HeroBanner>
      <ProductGrid></ProductGrid>
      <TravelCard></TravelCard>
      <Footer></Footer>
    </div>
  );
}
