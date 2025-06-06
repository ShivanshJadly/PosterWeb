import React from 'react';

const CategoriesSkeleton = () => {
    const skeletonCount = 6; // Adjust the number of skeletons to display

    return (
        <div className='p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10'>
            {Array.from({ length: skeletonCount }).map((_, index) => (
                <div
                    key={index}
                    className='w-[19rem] h-[24rem] bg-gray-300 animate-pulse rounded-md'
                ></div>
            ))}
        </div>
    );
};

export default CategoriesSkeleton;
