import { add, remove } from "../slices/cartSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import RatingStars from "../components/common/RatingStars";

const Product = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const addToCart = () => {
    dispatch(add(post));
    toast.success("Item added to Cart");
  };

  const removeItem = () => {
    dispatch(remove(post._id));
    toast.error("Item removed from Cart");
  };

  const handlePosterDetails = () => {
    navigate(`/poster/${post._id}`);
  };

  const isInCart = cart.some((item) => item._id === post._id);

  return (
    <div className="w-[20rem] flex flex-col justify-center px-2">
      <div className="relative h-96 flex justify-center items-center">
        <img
          onClick={handlePosterDetails}
          src={post.image}
          alt="poster-image"
          className="object-contain w-full h-full"
        />
      </div>
      <div className="w-full flex-col justify-between items-center pr-5 pl-6">
          <div className="flex justify-between w-full">
            <p>{post.posterName}</p>
            <span>₹{post.price}</span>
          </div>

          <div>
          <p className="text-sm text-gray-500">{post.description}</p>
          <RatingStars posterId={post._id} Star_Size={15} />
          </div>
        </div>
      </div>
    
  );
};

export default Product;
