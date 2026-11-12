import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BrandIntro from './components/BrandIntro';
import SmoothScroll from './components/SmoothScroll';
import StickyBookCta from './components/StickyBookCta';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
const Services = lazy(() => import('./pages/Services'));
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'));
const ReplacementServices = lazy(() => import('./pages/ReplacementServices'));
const Packages = lazy(() => import('./pages/Packages'));
const Gallery = lazy(() => import('./pages/Gallery'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Cart = lazy(() => import('./pages/Cart'));
const Booking = lazy(() => import('./pages/Booking'));
const Inspection = lazy(() => import('./pages/Inspection'));
const Health = lazy(() => import('./pages/Health'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Blog = lazy(() => import('./pages/Blog'));
const Faqs = lazy(() => import('./pages/Faqs'));
const fp = (k: string) => lazy(() => import('./pages/FeaturePages').then((m) => ({ default: (m as unknown as Record<string, () => JSX.Element>)[k] })));
const AcServices = fp('AcServices'), CeramicGraphene = fp('CeramicGraphene'), Detailing = fp('Detailing'), Electrical = fp('Electrical'), InteriorRestoration = fp('InteriorRestoration'), Mechanical = fp('Mechanical'), PaintCorrection = fp('PaintCorrection'), Ppf = fp('Ppf');

function NotFound() {
  return (
    <main className="section pt-40 text-center"><h1 className="headline text-5xl">Page not found</h1>
      <p className="mt-4 text-mist">That page does not exist.</p><Link to="/" className="btn-primary mt-8">Back to home</Link></main>
  );
}

function ScrollTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => { if (hash) { setTimeout(() => document.querySelector(hash)?.scrollIntoView(), 50); } else window.scrollTo(0, 0); }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded focus:bg-ember focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      <BrandIntro />
      <SmoothScroll />
      <CustomCursor />
      <ScrollTop />
      <Navbar />
      <div id="main">
        <Suspense fallback={<div className="grid min-h-[60vh] place-items-center text-mist">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetails />} />
          <Route path="/detailing" element={<Detailing />} />
          <Route path="/mechanical" element={<Mechanical />} />
          <Route path="/electrical" element={<Electrical />} />
          <Route path="/ac-services" element={<AcServices />} />
          <Route path="/interior-restoration" element={<InteriorRestoration />} />
          <Route path="/paint-correction" element={<PaintCorrection />} />
          <Route path="/ceramic-graphene" element={<CeramicGraphene />} />
          <Route path="/ppf" element={<Ppf />} />
          <Route path="/replacement-services" element={<ReplacementServices />} />
          <Route path="/related-parts-inspection" element={<Inspection />} />
          <Route path="/vehicle-health-report" element={<Health />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/service-history" element={<Dashboard />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </div>
      <Footer />
      <StickyBookCta />
    </>
  );
}
