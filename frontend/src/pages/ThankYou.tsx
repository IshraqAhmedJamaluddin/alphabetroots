import { useSearchParams, Link } from 'react-router-dom';

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('order');

  return (
    <div className="section-container py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="heading-2 mb-4">Thank You for Your Order!</h1>
          {orderNumber && (
            <p className="text-body mb-2">
              Your order number is: <span className="font-bold">{orderNumber}</span>
            </p>
          )}
          <p className="text-body text-dark-400">
            We've received your order and will process it shortly. You will receive a
            confirmation email with your order details.
          </p>
        </div>

        <div className="card space-y-4">
          <h2 className="heading-3">What's Next?</h2>
          <ul className="text-left space-y-2 text-body">
            <li>• You will receive an email confirmation with your order details</li>
            <li>• We'll begin processing your personalized storybook</li>
            <li>• You'll be notified when your order ships</li>
            <li>• Estimated delivery time: 7-14 business days</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">
            Continue Shopping
          </Link>
          <Link to="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;

