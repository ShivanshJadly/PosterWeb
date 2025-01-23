import { RiDeleteBin5Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { remove } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const removeItem = () => {
    dispatch(remove({ productId: item._id, size: item.size }));
    toast.error("Item removed from Cart");
  };
  const { cart } = useSelector((state) => state);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/poster/${item._id}`);
  };
  return (
    <div className="flex h-[16rem] border-b-2 pb-10 border-gray-200">

      {/* Left */}
      <div className="h-full w-[20%] flex border-2 border-black relative">
        <img
          onClick={handleClick}
          src={item.image}
          alt="item img"
          className="object-cover w-full h-full cursor-pointer"
        />
        <span className="absolute top-0 right-0 z-10 bg-black text-white rounded-full w-6 flex justify-center items-center animate-bounce">{`${item.quantity}`}</span>
      </div>

      {/* Right */}
      <div className="w-[80%] flex justify-between flex-col p-4">
        <div>
          <div className="flex font-bold justify-between">
            <h1 className="">{item.posterName}</h1>
            <span className="">MRP : ₹ {item.price}</span>
          </div>
          <h3 className="text-sm text-gray-500">{item.description}</h3>
          <p className="text-sm text-gray-500">
            Size : {item.size}
          </p>
        </div>
        
        
        <div className="flex justify-end">
          
            <RiDeleteBin5Line
              onClick={removeItem}
              className="cursor-pointer text-xl text-red-500 hover:text-red-700"
            />
          
        </div>
      </div>
    </div>
  );
};

export default CartItem;
