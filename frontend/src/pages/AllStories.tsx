import { Link } from 'react-router-dom';

// Sample stories with images from the original website
const sampleStories = [
  {
    id: '1',
    title: 'Adventure Story',
    description: 'An exciting adventure story featuring personalized characters.',
    cover_image_url: '/images/stories/story-adventure.jpg',
  },
  {
    id: '2',
    title: 'Family Moments',
    description: 'Capture your family\'s special moments in a beautiful storybook.',
    cover_image_url: '/images/stories/story-family.jpg',
  },
  {
    id: '3',
    title: 'Nature Journey',
    description: 'A journey through nature with your personalized characters.',
    cover_image_url: '/images/stories/story-nature.jpg',
  },
  {
    id: '4',
    title: 'Bedtime Stories',
    description: 'Perfect bedtime stories featuring your loved ones.',
    cover_image_url: '/images/stories/story-bedtime.jpg',
  },
];

const AllStories = () => {
  // Use sample stories, but you can also fetch from API
  const stories = sampleStories;

  return (
    <div className="section-container py-12">
      <h1 className="heading-2 text-center mb-12">All Stories</h1>

      {stories && stories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div key={story.id} className="card">
              {story.cover_image_url && (
                <div className="aspect-[4/3] mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={story.cover_image_url}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="font-semibold text-lg mb-2">{story.title}</h3>
              {story.description && (
                <p className="text-dark-400 mb-4 line-clamp-3">{story.description}</p>
              )}
              <Link
                to="/test"
                className="text-primary-600 font-medium hover:text-primary-700 cursor-pointer"
              >
                View Story →
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-dark-400">No stories available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default AllStories;

