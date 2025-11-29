import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getProduct, addToCart, getSessionId } from '../services/api';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const sessionId = getSessionId();

  const { data: product, isLoading } = useQuery(
    ['product', id],
    () => getProduct(id!),
    { enabled: !!id }
  );

  const addToCartMutation = useMutation(
    (quantity: number) => addToCart(sessionId, id!, quantity),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['cart', sessionId]);
        navigate('/cart');
      },
    }
  );

  if (isLoading) {
    return (
      <div className="section-container py-16">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="section-container py-16">
        <div className="text-center">
          <h2 className="heading-2 mb-4">Product not found</h2>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div>
          {product.image_url ? (
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-square rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="heading-2 mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-primary-600 mb-6">${product.price}</p>
          
          {product.description && (
            <div className="mb-6">
              <p className="text-body whitespace-pre-line">{product.description}</p>
            </div>
          )}

          {product.category && (
            <p className="text-sm text-dark-400 mb-6">
              Category: <span className="font-medium">{product.category}</span>
            </p>
          )}

          <div className="mb-6">
            <p className={`font-medium ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
              {product.in_stock ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => addToCartMutation.mutate(1)}
              disabled={!product.in_stock || addToCartMutation.isLoading}
              className="btn-primary flex-1"
            >
              {addToCartMutation.isLoading ? 'Adding...' : 'Add to Cart'}
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="btn-secondary"
            >
              View Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

