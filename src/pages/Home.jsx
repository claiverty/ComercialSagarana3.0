import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/landing/Hero';
import OffersSection from '../components/landing/OffersSection';
import LocationSection from '../components/landing/LocationSection';
import ContactSection from '../components/landing/ContactSection';

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <OffersSection />
      <LocationSection />
      <ContactSection />
      <Footer />
    </>
  );
}

export default Home;