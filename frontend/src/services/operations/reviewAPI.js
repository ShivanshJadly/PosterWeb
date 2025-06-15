import { apiConnector} from "../apiConnector";
import { reviewEndpoints } from "../../apis";

const { GET_REVIEW_API, CREATE_REVIEW_API } = reviewEndpoints;

export const getReviews = async (posterId) => {
  let result = [];
  try {
    const response = await apiConnector("POST", GET_REVIEW_API, { posterId });
    if (!response?.data?.success) {
      throw new Error("Could not fetch reviews");
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_REVIEW_API API ERROR: ", error);
    throw new Error(error.message || "Something went wrong while fetching reviews");
  }
  return result;
}
