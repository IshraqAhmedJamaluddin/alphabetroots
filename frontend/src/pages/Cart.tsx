import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getCart, updateCartItem, removeFromCart, getSessionId, createOrder } from '../services/api';
import { useState } from 'react';

const Cart = () => {
  const sessionId = getSessionId();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
  });

  const { data: cartItems, isLoading } = useQuery(
    ['cart', sessionId],
    () => getCart(sessionId)
  );

  const updateMutation = useMutation(
    ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      updateCartItem(sessionId, itemId, quantity),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['cart', sessionId]);
      },
    }
  );

  const removeMutation = useMutation(
    (itemId: string) => removeFromCart(sessionId, itemId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['cart', sessionId]);
      },
    }
  );

  const orderMutation = useMutation(
    (data: any) => createOrder({ ...data, sessionId }),
    {
      onSuccess: (data) => {
        navigate(`/thank-you?order=${data.order.order_number}`);
      },
    }
  );

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cartItems || cartItems.length === 0) return;

    const items = cartItems.map((item: any) => ({
      productId: item.product_id,
      quantity: item.quantity,
    }));

    orderMutation.mutate({
      ...checkoutData,
      items,
    });
  };

  const total = cartItems?.reduce(
    (sum: number, item: any) => sum + parseFloat(item.price) * item.quantity,
    0
  ) || 0;

  if (isLoading) {
    return (
      <div className="section-container py-16">
        <div className="text-center">Loading cart...</div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="section-container py-16">
        <div className="text-center max-w-md mx-auto">
          <h2 className="heading-2 mb-4">Your cart is empty</h2>
          <p className="text-body mb-8">Start adding products to your cart!</p>
          <button onClick={() => navigate('/our-collection')} className="btn-primary">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container py-12">
      <h1 className="heading-2 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item: any) => (
            <div key={item.id} className="card flex items-center gap-4">
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
              <div className="flex-grow">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-primary-600 font-bold">${item.price}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateMutation.mutate({
                        itemId: item.id,
                        quantity: Math.max(1, item.quantity - 1),
                      })
                    }
                    className="w-8 h-8 rounded border border-dark-200 hover:bg-dark-50"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateMutation.mutate({
                        itemId: item.id,
                        quantity: item.quantity + 1,
                      })
                    }
                    className="w-8 h-8 rounded border border-dark-200 hover:bg-dark-50"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeMutation.mutate(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h2 className="heading-3 mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="btn-primary w-full"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="heading-3 mb-6">Checkout</h2>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={checkoutData.customerName}
                  onChange={(e) =>
                    setCheckoutData({ ...checkoutData, customerName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  required
                  className="input-field"
                  value={checkoutData.customerEmail}
                  onChange={(e) =>
                    setCheckoutData({ ...checkoutData, customerEmail: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  className="input-field"
                  value={checkoutData.customerPhone}
                  onChange={(e) =>
                    setCheckoutData({ ...checkoutData, customerPhone: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Shipping Address *</label>
                <textarea
                  required
                  rows={3}
                  className="input-field"
                  value={checkoutData.shippingAddress}
                  onChange={(e) =>
                    setCheckoutData({ ...checkoutData, shippingAddress: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={orderMutation.isLoading}
                  className="btn-primary flex-1"
                >
                  {orderMutation.isLoading ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

