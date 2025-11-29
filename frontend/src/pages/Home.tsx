import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getProducts } from "../services/api";

const Home = () => {
  const { data: products, isLoading } = useQuery("products", getProducts);

  const features = [
    {
      title: "Secure Storage",
      description: "All images are securely stored on our servers.",
      image: "/images/Bookshelf.jpg",
      link: "/about",
    },
    {
      title: "Personalized Prints",
      description: "Enjoy high-quality prints delivered to your door.",
      image: "/images/personalized-storybook.jpg",
      link: "/our-collection",
    },
    {
      title: "Instant Preview",
      description: "Preview your storybook before printing.",
      image: "/images/hero-1.jpg",
      link: "/preview",
    },
    {
      title: "User-Friendly",
      description: "Experience a simple and intuitive design process.",
      image: "/images/family-reading-storybook.jpg",
      link: "/contact",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-neutral-100 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/images/Storytime.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="section-container relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="heading-1 mb-6 text-dark-500">
              Create Your Personalized Storybook
            </h1>
            <p className="text-body mb-8 text-dark-400">
              Transform your memories into beautiful, custom storybooks that
              you'll treasure forever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/our-collection" className="btn-primary">
                Explore Collection
              </Link>
              <Link to="/all-stories" className="btn-secondary">
                View Stories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {!isLoading && products && products.length > 0 && (
        <section className="py-16 bg-white">
          <div className="section-container">
            <h2 className="heading-2 text-center mb-12">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product: any) => (
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
                  <p className="text-dark-400 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-primary-600 font-bold text-xl">
                    ${product.price}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 bg-neutral-50">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center overflow-hidden">
                {feature.image && (
                  <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <h3 className="heading-3 mb-3">{feature.title}</h3>
                <p className="text-body mb-4">{feature.description}</p>
                <Link
                  to={feature.link}
                  className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="section-container text-center">
          <h2 className="heading-2 mb-6 text-white">
            Ready to Create Your Story?
          </h2>
          <p className="text-body mb-8 text-white/90 max-w-2xl mx-auto">
            Start your journey today and create a personalized storybook that
            captures your most precious moments.
          </p>
          <Link
            to="/contact"
            className="btn-secondary bg-white text-primary-600 hover:bg-gray-100"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
