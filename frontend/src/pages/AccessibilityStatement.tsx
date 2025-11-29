const AccessibilityStatement = () => {
  return (
    <div className="section-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="heading-2 mb-8">Accessibility Statement</h1>
        <div className="card space-y-6">
          <section>
            <h2 className="heading-3 mb-4">Our Commitment</h2>
            <p className="text-body">
              Alphabetroots is committed to ensuring digital accessibility for people with
              disabilities. We are continually improving the user experience for everyone and
              applying the relevant accessibility standards.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Accessibility Standards</h2>
            <p className="text-body">
              We aim to conform to WCAG 2.1 Level AA standards. Our website is designed to
              be accessible to users with various disabilities, including visual, auditory,
              and motor impairments.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Feedback</h2>
            <p className="text-body">
              We welcome your feedback on the accessibility of our website. If you encounter
              any accessibility barriers, please contact us and we will work to address them.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityStatement;

