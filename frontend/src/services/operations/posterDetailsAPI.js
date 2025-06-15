import { toast } from "react-hot-toast";
import { orderEndpoints, posterEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
const {
  GET_POSTERS_API,
  GET_POSTER_INFO_API,
  GET_CATEGORY_WISE_POSTER_API,
} = posterEndpoints;
const { GET_ORDER_API } = orderEndpoints;

export const getAllPoster = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_POSTERS_API);
    if (!response?.data?.success) {
      throw new Error("Could not fetch poster data");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_ALL_POSTER_API API ERROR: ", error);
    toast.error(error.message);
  }
  return result;
};

export const getPosterDetails = async (posterId) => {
  let result = [];
  try {
    const response = await apiConnector("POST", GET_POSTER_INFO_API, null,null, posterId);
    if (!response?.data?.success) {
      throw new Error("Could not fetch poster data");
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("POSTER_DETAILS_API API ERROR: ", error);
    toast.error(error.message || "Something went wrong");
  }
  return result;
};

// export const getOrderHistory = async (token) => {
//   const toastId = toast.loading("Loading");
//   let result = [];
//   try {
//     const response = await apiConnector("GET", GET_ORDER_API, null, {
//       Authorization: `Bearer ${token}`,
//     });

//     if (!response || !response.data) {
//       throw new Error("No response from server");
//     }

//     if (!response.data.success) {
//       throw new Error(response.data.message || "Could not fetch order history");
//     }

//     result = response.data;
//   } catch (error) {
//     console.error("GET_ORDER_HISTORY API ERROR:", error);
//     toast.error(error.message || "Something went wrong");
//   } finally {
//     toast.dismiss(toastId);
//   }
//   return result;
// };

export const getCategories = async (categoryId) => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_CATEGORY_WISE_POSTER_API, {
      categoryId,
    });
    if (!response?.data?.success) {
      throw new Error("Could not fetch categories by ids");
    }
    result = response?.data;
  } catch (error) {
    console.error("GET_ALL_CATEGORIES_API API ERROR: ", error);
    toast.error(error.message);
  }
  return result;
};
