import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { path: '/our-collection', label: 'Our Collection' },
      { path: '/all-stories', label: 'All Stories' },
      { path: '/gallery', label: 'Gallery' },
    ],
    company: [
      { path: '/about', label: 'About Us' },
      { path: '/contact', label: 'Contact' },
    ],
    legal: [
      { path: '/privacy-policy', label: 'Privacy Policy' },
      { path: '/terms-and-conditions', label: 'Terms & Conditions' },
      { path: '/shipping-policy', label: 'Shipping Policy' },
      { path: '/refund-policy', label: 'Refund Policy' },
      { path: '/accessibility-statement', label: 'Accessibility' },
    ],
  };

  return (
    <footer className="bg-dark-500 text-white mt-auto">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Alphabetroots</h3>
            <p className="text-gray-300 mb-4">
              Creating personalized storybooks that bring your memories to life.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Alphabetroots. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

