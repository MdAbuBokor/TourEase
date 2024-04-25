
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HowItWorks from '../components/HowItWorks';
import Places from '../components/Places';

export default function Home() {
  return (
    <div className='flex flex-col justify-center'>
      <Header />
      <Banner />
      <Places/>
      <HowItWorks />
      <Footer />


    </div>
  )
}
