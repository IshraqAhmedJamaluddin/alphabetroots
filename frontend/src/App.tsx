import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import OurCollection from './pages/OurCollection';
import AllStories from './pages/AllStories';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import ThankYou from './pages/ThankYou';
import Preview from './pages/Preview';
import Test from './pages/Test';
import FlippingTest from './pages/FlippingTest';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import ShippingPolicy from './pages/ShippingPolicy';
import RefundPolicy from './pages/RefundPolicy';
import AccessibilityStatement from './pages/AccessibilityStatement';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/our-collection" element={<OurCollection />} />
        <Route path="/all-stories" element={<AllStories />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/test" element={<Test />} />
        <Route path="/flipping_test" element={<FlippingTest />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
      </Routes>
    </Layout>
  );
}

export default App;

