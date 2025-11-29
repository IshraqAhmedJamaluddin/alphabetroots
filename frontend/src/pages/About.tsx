const About = () => {
  return (
    <div className="section-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="heading-2 text-center mb-12">About Alphabetroots</h1>

        <div className="mb-8">
          <img 
            src="/images/about/Family reading.jpg" 
            alt="Family reading together" 
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        <div className="card space-y-6">
          <section>
            <h2 className="heading-3 mb-4">Our Mission</h2>
            <p className="text-body">
              At Alphabetroots, we believe that every story deserves to be told and preserved.
              We specialize in creating personalized storybooks that transform your precious
              memories into beautiful, tangible keepsakes that you and your family will treasure
              for generations.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">What We Do</h2>
            <p className="text-body mb-4">
              We offer a range of personalized storybook services, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-body ml-4">
              <li>Custom storybook creation with your photos and text</li>
              <li>High-quality printing on premium materials</li>
              <li>Secure storage of your images and stories</li>
              <li>Easy-to-use online preview and editing tools</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Secure Storage</h3>
                <p className="text-sm text-dark-400">
                  All your images and stories are securely stored on our servers with
                  regular backups.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">High Quality</h3>
                <p className="text-sm text-dark-400">
                  We use premium materials and professional printing techniques to ensure
                  your storybooks last a lifetime.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Easy to Use</h3>
                <p className="text-sm text-dark-400">
                  Our intuitive design process makes it simple to create your personalized
                  storybook.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Personalized Service</h3>
                <p className="text-sm text-dark-400">
                  We work with you to ensure your storybook perfectly captures your vision
                  and memories.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;

