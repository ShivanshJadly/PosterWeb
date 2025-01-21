import { add } from "../slices/cartSlice";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Product = ({ post }) => {
  const navigate = useNavigate();
  // const { cart } = useSelector((state) => state)
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(post));
    toast.success("Item added to Cart");
  };
  // const removeItem = () => {
  //   dispatch(remove(post._id));
  //   toast.error("Item removed from Cart");
  // }

  const handlePosterDetails = () => {
    navigate(`/poster/${post._id}`);
  };
  return (
    <div>
      <CardContainer className="w-[20rem] h-96 flex-shrink-0 flex justify-center px-2">
        <CardBody className="relative group/card h-full flex justify-center items-center rounded-lg">
          <CardItem
            translateZ="60"
            className="relative h-full flex justify-center items-center"
          >
            <img
              onClick={handlePosterDetails}
              src={post.image}
              alt="poster-image"
              className="object-contain w-full h-full"
            />

            <CardItem
              as="p"
              translateZ="100"
              className="absolute text-neutral-500 text-base w-full flex flex-col h-1/3 items-end bottom-5 pr-5 pt-5 rounded-lg bg-gradient-to-b from-[#48494a74] to-[#000] dark:text-white opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 break-words"
            >
              {post.posterName}
              <div>₹{post.price}</div>
            </CardItem>
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
};

export default Product;
