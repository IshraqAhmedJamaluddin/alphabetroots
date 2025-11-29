const PrivacyPolicy = () => {
  return (
    <div className="section-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="heading-2 mb-8">Privacy Policy</h1>
        <div className="card space-y-6">
          <section>
            <h2 className="heading-3 mb-4">Introduction</h2>
            <p className="text-body">
              At Alphabetroots, we are committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, and safeguard your personal information.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Information We Collect</h2>
            <p className="text-body mb-4">We collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-2 text-body ml-4">
              <li>Personal information (name, email, phone number)</li>
              <li>Shipping and billing addresses</li>
              <li>Payment information (processed securely through our payment provider)</li>
              <li>Images and content you upload for your storybooks</li>
              <li>Usage data and website analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-3 mb-4">How We Use Your Information</h2>
            <p className="text-body mb-4">We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 text-body ml-4">
              <li>Process and fulfill your orders</li>
              <li>Create your personalized storybooks</li>
              <li>Communicate with you about your orders</li>
              <li>Improve our services and website</li>
              <li>Send you marketing communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Data Security</h2>
            <p className="text-body">
              We implement appropriate security measures to protect your personal information
              and images. All data is stored securely and encrypted in transit.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Contact Us</h2>
            <p className="text-body">
              If you have questions about this Privacy Policy, please contact us through
              our contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

