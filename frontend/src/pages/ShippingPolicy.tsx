const ShippingPolicy = () => {
  return (
    <div className="section-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="heading-2 mb-8">Shipping Policy</h1>
        <div className="card space-y-6">
          <section>
            <h2 className="heading-3 mb-4">Shipping Methods</h2>
            <p className="text-body mb-4">
              We offer standard and express shipping options. Shipping costs are calculated
              at checkout based on your location and selected shipping method.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Processing Time</h2>
            <p className="text-body">
              Personalized storybooks typically take 5-7 business days to process before
              shipping. You will receive a notification when your order ships.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Delivery Times</h2>
            <ul className="list-disc list-inside space-y-2 text-body ml-4">
              <li>Standard Shipping: 7-14 business days</li>
              <li>Express Shipping: 3-5 business days</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-3 mb-4">International Shipping</h2>
            <p className="text-body">
              We ship internationally. Additional shipping costs and delivery times apply.
              Customers are responsible for any customs duties or taxes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;

