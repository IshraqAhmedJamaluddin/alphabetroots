const TermsAndConditions = () => {
  return (
    <div className="section-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="heading-2 mb-8">Terms and Conditions</h1>
        <div className="card space-y-6">
          <section>
            <h2 className="heading-3 mb-4">Acceptance of Terms</h2>
            <p className="text-body">
              By using Alphabetroots services, you agree to be bound by these Terms and
              Conditions. Please read them carefully.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Use of Service</h2>
            <p className="text-body">
              You agree to use our service only for lawful purposes and in accordance with
              these Terms. You are responsible for ensuring that all content you provide is
              accurate and does not infringe on any third-party rights.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Orders and Payment</h2>
            <p className="text-body mb-4">
              All orders are subject to acceptance and availability. Payment must be received
              before we begin processing your order. Prices are subject to change without
              notice.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Intellectual Property</h2>
            <p className="text-body">
              You retain all rights to the content you provide. By submitting content, you
              grant us a license to use it for the purpose of creating your storybook.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Limitation of Liability</h2>
            <p className="text-body">
              Alphabetroots shall not be liable for any indirect, incidental, or consequential
              damages arising from the use of our services.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

