import React, { useState, useRef, useEffect, ReactNode } from "react";

interface FlipBookProps {
  width?: number;
  height?: number;
  pages: Array<{
    left: ReactNode;
    right: ReactNode;
  }>;
  onPageChange?: (pageIndex: number) => void;
}

const FlipBook: React.FC<FlipBookProps> = ({
  width = 550,
  height = 733,
  pages,
  onPageChange,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = pages.length;

  const goToPage = (index: number) => {
    if (index >= 0 && index < totalPages && !isFlipping) {
      setIsFlipping(true);
      setCurrentPageIndex(index);
      onPageChange?.(index);
      setTimeout(() => setIsFlipping(false), 800);
    }
  };

  const nextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      goToPage(currentPageIndex + 1);
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      goToPage(currentPageIndex - 1);
    }
  };

  useEffect(() => {
    onPageChange?.(currentPageIndex);
  }, [currentPageIndex, onPageChange]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipping) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = e.clientX - rect.left;
    const bookWidth = rect.width;

    // Click left side = previous page, right side = next page
    if (clickX < bookWidth / 2) {
      prevPage();
    } else {
      nextPage();
    }
  };

  return (
    <div
      ref={containerRef}
      className="flipbook-container"
      onClick={handleClick}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: "relative",
        margin: "0 auto",
        cursor: "pointer",
        perspective: "2000px",
        perspectiveOrigin: "center center",
        overflow: "hidden",
      }}
    >
      <div
        className="flipbook-pages-wrapper"
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {pages.map((page, index) => {
          const offset = index - currentPageIndex;
          const isActive = index === currentPageIndex;
          const isPrev = index < currentPageIndex;
          const isNext = index > currentPageIndex;

          // Calculate transform for realistic page flip animation
          // Pages should flip around their edges, not slide
          let rotateY = 0;
          let translateX = 0;
          let translateZ = 0;
          let zIndex = totalPages - Math.abs(offset);

          if (isActive) {
            // Active page: centered, fully visible, no rotation
            rotateY = 0;
            translateX = 0;
            translateZ = 0;
          } else if (isPrev) {
            // Previous pages: already flipped, positioned behind
            // Rotate -180deg around the left edge of the page
            rotateY = -180;
            translateX = -width * 0.5; // Shift left by half width to pivot around left edge
            translateZ = -30; // Behind the active page
          } else if (isNext) {
            // Next pages: waiting to be flipped, positioned in front
            rotateY = 0;
            translateX = 0; // Start at center
            translateZ = 30; // In front of active page
          }

          return (
            <div
              key={index}
              data-page={index}
              className={`flipbook-page ${isActive ? "active" : ""} ${isPrev ? "prev" : ""} ${isNext ? "next" : ""}`}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                transformStyle: "preserve-3d",
                transformOrigin: isPrev ? "left center" : "right center",
                transition: isFlipping
                  ? "transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)"
                  : "none",
                backfaceVisibility: "hidden",
                zIndex: zIndex,
                pointerEvents: isActive ? "auto" : "none",
                opacity: Math.abs(offset) > 2 ? 0 : 1,
              }}
            >
              {/* Page spread: left and right side by side */}
              <div
                className="flipbook-spread"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  position: "relative",
                }}
              >
                {/* Left page */}
                <div
                  className="flipbook-page-left"
                  style={{
                    width: "50%",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {page.left}
                </div>
                {/* Right page */}
                <div
                  className="flipbook-page-right"
                  style={{
                    width: "50%",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {page.right}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlipBook;

