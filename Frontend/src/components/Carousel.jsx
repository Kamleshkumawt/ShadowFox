import { useRef } from "react";
import HomePageCarouselCard from "./HomePageCarouselCard";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Install react-icons if not already

const ManualCarousel = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full px-6">
      {/* Prev Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-100 shadow-md p-3 py-5 rounded cursor-pointer hover:bg-gray-50 transition"
      >
        {/* <FaChevronLeft className="text-gray-700" /> */}
        {"<"}
      </button>

      {/* Scrollable Carousel */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-1 snap-x snap-mandatory scroll-smooth scrollbar-hide py-4 px-2"
      >
        {[...Array(9)].map((_, idx) => (
          <div key={idx} className="min-w-[250px] snap-start">
            <HomePageCarouselCard />
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-100 shadow-md p-3 py-5 rounded hover:bg-gray-50 cursor-pointer transition"
      >
         {">"}
      </button>
    </div>
  );
};

export default ManualCarousel;
