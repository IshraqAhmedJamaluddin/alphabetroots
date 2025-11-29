import { useState } from 'react';
import { getAssetPath } from '../utils/paths';

// Gallery images from the original website
const galleryImages = [
  { id: '1', title: 'Storybook Sample 1', image_url: getAssetPath('images/gallery/gallery-01.jpg'), category: 'Storybooks' },
  { id: '2', title: 'Storybook Sample 2', image_url: getAssetPath('images/gallery/gallery-02.jpg'), category: 'Storybooks' },
  { id: '3', title: 'Storybook Sample 3', image_url: getAssetPath('images/gallery/gallery-03.jpg'), category: 'Storybooks' },
  { id: '4', title: 'Storybook Sample 4', image_url: getAssetPath('images/gallery/gallery-04.jpg'), category: 'Storybooks' },
  { id: '5', title: 'Storybook Sample 5', image_url: getAssetPath('images/gallery/gallery-05.jpg'), category: 'Storybooks' },
  { id: '6', title: 'Storybook Sample 6', image_url: getAssetPath('images/gallery/gallery-06.jpg'), category: 'Storybooks' },
  { id: '7', title: 'Storybook Sample 7', image_url: getAssetPath('images/gallery/gallery-07.jpg'), category: 'Storybooks' },
  { id: '8', title: 'Storybook Sample 8', image_url: getAssetPath('images/gallery/gallery-08.jpg'), category: 'Storybooks' },
  { id: '9', title: 'Storybook Sample 9', image_url: getAssetPath('images/gallery/gallery-09.jpg'), category: 'Storybooks' },
  { id: '10', title: 'Storybook Sample 10', image_url: getAssetPath('images/gallery/gallery-10.jpg'), category: 'Storybooks' },
  { id: '11', title: 'Storybook Sample 11', image_url: getAssetPath('images/gallery/gallery-11.jpg'), category: 'Storybooks' },
  { id: '12', title: 'Storybook Sample 12', image_url: getAssetPath('images/gallery/gallery-12.jpg'), category: 'Storybooks' },
  { id: '13', title: 'Custom Print', image_url: getAssetPath('images/gallery/custom-print.jpg'), category: 'Prints' },
  { id: '14', title: 'Light Item 3', image_url: getAssetPath('images/gallery/light-item-3.jpg'), category: 'Custom' },
  { id: '15', title: 'Light Item 4', image_url: getAssetPath('images/gallery/light-item-4.jpg'), category: 'Custom' },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const categories = ['All', 'Storybooks', 'Prints', 'Custom'];
  
  const filteredImages = selectedCategory && selectedCategory !== 'All'
    ? galleryImages.filter(img => img.category === selectedCategory)
    : galleryImages;

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
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
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

