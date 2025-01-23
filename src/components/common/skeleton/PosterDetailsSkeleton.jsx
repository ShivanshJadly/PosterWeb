import React from "react";

const PosterDetailsSkeleton = () => {
  return (
    <div className="flex justify-evenly w-11/12 mx-auto overflow-x-hidden pt-16 overflow-y-hidden">
      <div className="grid grid-cols-2 mt-8 mb-8 mx-4 gap-4">
        {/* Right Section */}
        <div className="h-[500px] w-full bg-gray-300 animate-pulse rounded-lg"></div>

        {/* Left Section */}
        <div className="flex flex-col gap-5 p-16">
          {/* Title and Rating */}
          <div className="h-10 w-3/4 bg-gray-300 animate-pulse rounded-md"></div>
          <div className="h-6 w-1/4 bg-gray-300 animate-pulse rounded-md"></div>

          {/* Description */}
          <div className="h-16 w-full bg-gray-300 animate-pulse rounded-md"></div>

          {/* Additional Info */}
          <div className="flex gap-2 items-center">
            <div className="h-10 w-10 bg-gray-300 animate-pulse rounded-full"></div>
            <div className="h-6 w-3/4 bg-gray-300 animate-pulse rounded-md"></div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="h-10 w-10 bg-gray-300 animate-pulse rounded-full"></div>
            <div className="h-6 w-3/4 bg-gray-300 animate-pulse rounded-md"></div>
          </div>

          {/* Price */}
          <div className="h-8 w-1/4 bg-gray-300 animate-pulse rounded-md"></div>

          {/* Size Options */}
          <div className="flex gap-4 items-center">
            <div className="h-6 w-12 bg-gray-300 animate-pulse rounded-md"></div>
            <div className="h-12 w-20 bg-gray-300 animate-pulse rounded-full"></div>
            <div className="h-12 w-20 bg-gray-300 animate-pulse rounded-full"></div>
            <div className="h-12 w-20 bg-gray-300 animate-pulse rounded-full"></div>
          </div>

          {/* Quantity Selector */}
          <div className="flex gap-4 items-center">
            <div className="h-6 w-16 bg-gray-300 animate-pulse rounded-md"></div>
            <div className="border border-gray-300 h-14 w-[30%] rounded-full flex justify-evenly items-center animate-pulse">
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="h-12 w-full bg-gray-300 animate-pulse rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default PosterDetailsSkeleton;
