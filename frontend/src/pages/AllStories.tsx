import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getStories } from '../services/api';

const AllStories = () => {
  const { data: stories, isLoading } = useQuery('stories', () => getStories());

  return (
    <div className="section-container py-12">
      <h1 className="heading-2 text-center mb-12">All Stories</h1>

      {isLoading ? (
        <div className="text-center py-16">Loading stories...</div>
      ) : stories && stories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story: any) => (
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
              {story.pdf_url && (
                <a
                  href={story.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 font-medium hover:text-primary-700"
                >
                  View PDF →
                </a>
              )}
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

