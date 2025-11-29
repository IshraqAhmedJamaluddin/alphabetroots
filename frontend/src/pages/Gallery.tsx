import { useQuery } from 'react-query';
import { getGalleryImages } from '../services/api';
import { useState } from 'react';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const { data: images, isLoading } = useQuery(
    ['gallery', selectedCategory],
    () => getGalleryImages(selectedCategory)
  );

  const categories = ['All', 'Storybooks', 'Prints', 'Custom'];

  return (
    <div className="section-container py-12">
      <h1 className="heading-2 text-center mb-12">Gallery</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category === 'All' ? undefined : category)
            }
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category || (category === 'All' && !selectedCategory)
                ? 'bg-primary-600 text-white'
                : 'bg-white text-dark-500 border border-dark-200 hover:bg-primary-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {isLoading ? (
        <div className="text-center py-16">Loading gallery...</div>
      ) : images && images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image: any) => (
            <div key={image.id} className="card p-0 overflow-hidden group">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={image.image_url}
                  alt={image.title || 'Gallery image'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {image.title && (
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{image.title}</h3>
                  {image.description && (
                    <p className="text-sm text-dark-400">{image.description}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-dark-400">No images found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;

