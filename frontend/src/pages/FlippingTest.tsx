import React, { useState } from "react";
import HTMLFlipBook from "react-pageflip";

const FlippingTest = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const storyPages = [
    {
      pageNumber: 1,
      imageUrl: "/stories/page1.png",
      text: "Once upon a time, there was a brave boy named Alex.",
    },
    {
      pageNumber: 2,
      imageUrl: "/stories/page2.png",
      text: "Alex loved to explore the magical forest.",
    },
    {
      pageNumber: 3,
      imageUrl: "/stories/page3.png",
      text: "In the forest, Alex discovered many wonderful things.",
    },
  ];

  return (
    <div className="flipbook-page-container">
      <HTMLFlipBook
        width={550}
        height={733}
        maxShadowOpacity={0.5}
        drawShadow={true}
        showCover={true}
        size="fixed"
        onFlip={(e) => setCurrentPage(e.data)}
      >
        <div className="page" style={{ background: "transparent" }}>
          <div className="page-content cover">
            <h2>BOOK TITLE</h2>
          </div>
        </div>

        {storyPages.map((story, index) => (
          <div className="page" key={story.pageNumber}>
            <div className="page-content">
              <h2 className="page-header">Page {story.pageNumber}</h2>
              <div className="page-image">
                <img
                  src={story.imageUrl}
                  alt={`Page ${story.pageNumber}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="page-text">{story.text}</div>
              <div className="page-footer">{story.pageNumber + 1}</div>
            </div>
          </div>
        ))}

        <div className="page" style={{ background: "transparent" }}>
          <div className="page-content cover">
            <h2>THE END</h2>
          </div>
        </div>
      </HTMLFlipBook>
    </div>
  );
};

export default FlippingTest;
