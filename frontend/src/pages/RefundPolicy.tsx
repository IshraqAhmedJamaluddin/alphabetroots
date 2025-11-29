const RefundPolicy = () => {
  return (
    <div className="section-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="heading-2 mb-8">Refund Policy</h1>
        <div className="card space-y-6">
          <section>
            <h2 className="heading-3 mb-4">Returns and Refunds</h2>
            <p className="text-body">
              We want you to be completely satisfied with your purchase. If you are not
              satisfied, please contact us within 30 days of receipt.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Eligibility for Refund</h2>
            <p className="text-body mb-4">Refunds may be issued for:</p>
            <ul className="list-disc list-inside space-y-2 text-body ml-4">
              <li>Defective or damaged products</li>
              <li>Incorrect items received</li>
              <li>Orders cancelled before processing begins</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Non-Refundable Items</h2>
            <p className="text-body">
              Personalized items cannot be returned unless there is a manufacturing defect
              or error on our part.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Refund Process</h2>
            <p className="text-body">
              To request a refund, please contact us with your order number and reason for
              return. Refunds will be processed to the original payment method within
              5-10 business days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;

