import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';

const OurCollection = () => {
  const { data: products, isLoading } = useQuery('products', getProducts);

  return (
    <div className="section-container py-12">
      <h1 className="heading-2 text-center mb-12">Our Collection</h1>

      {isLoading ? (
        <div className="text-center py-16">Loading products...</div>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="card group"
            >
              {product.image_url && (
                <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-dark-400 mb-4 line-clamp-2">{product.description}</p>
              <p className="text-primary-600 font-bold text-xl">${product.price}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-dark-400">No products available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default OurCollection;

