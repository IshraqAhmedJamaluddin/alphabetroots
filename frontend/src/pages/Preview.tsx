const Preview = () => {
  return (
    <div className="section-container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="heading-2 text-center mb-12">Preview Your Storybook</h1>

        <div className="card">
          <p className="text-body mb-6">
            Use our preview tool to see how your personalized storybook will look before
            you place your order. Upload your images, add your text, and customize the
            layout to create the perfect storybook.
          </p>

          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-dark-400 mb-4">
              Preview functionality will be available soon.
            </p>
            <p className="text-sm text-dark-400">
              In the meantime, please contact us to discuss your storybook requirements.
            </p>
          </div>

          <div className="mt-6 text-center">
            <a href="/contact" className="btn-primary">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;

