import React from 'react'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllPoster } from '../services/operations/posterDetailsAPI';
import HomeSkeleton from '../components/common/skeleton/HomeSkeleton';
import Product from '../components/Product';

const ViewAllPoster = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProductData = async () => {
        setLoading(true);
        try {
          const data = await getAllPoster();
          setPosts(data);
        } catch (error) {
          console.log("Data not found");
          setPosts([]);
        }
        setLoading(false);
      }
    
      useEffect(() => {
        fetchProductData();
      }, []);

  return (
    <div>
        {/* Product Grid */}
      <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 1.3}}
        className="z-10 relative w-full h-full flex justify-center items-center"
      >
        {loading ? (
            <div className='mt-24'>
                <HomeSkeleton skeletonCount={9} />
            </div>
        ) : posts.length > 0 ? (
          <div className="flex flex-col justify-center items-center mt-24">
            <div className="grid grid-cols-2 lg:grid-cols-3 auto-rows-custom lg:w-11/12 pt-0 lg:pt-10 pb-24 lg:gap-y-32 lg:gap-x-14 h-auto">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0}}
                  animate={{ opacity: 1}}
                  transition={{ duration: 1.3}}
                  className="flex justify-center items-center h-fit"
                >
                  <Product post={post} />
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 1.3}}
            className="flex justify-center items-center min-h-screen"
          >
            <p>No data found</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default ViewAllPoster
