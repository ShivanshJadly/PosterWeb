import { toast } from "react-hot-toast"
import { posterEndpoints } from "../apis";
import { apiConnector } from "../apiConnector"
const {
    POSTER_DETAILS_API,
    GET_ALL_POSTER_API,
    GET_MULTIPLE_POSTER_API,
    GET_ORDER_HISTORY
} = posterEndpoints;

export const getAllPoster = async () =>{
    const toastId = toast.loading("Loading");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_POSTER_API);
        if(!response?.data?.success){
            throw new Error("Could not fetch poster data");
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("GET_ALL_POSTER_API API ERROR: ", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const getPosterDetails = async (posterId) => {
    const toastId = toast.loading("Loading");
    let result = [];
    try {
        const response = await apiConnector("POST", POSTER_DETAILS_API, {posterId});
        if (!response?.data?.success) {
            throw new Error("Could not fetch poster data");
        }
        result = response?.data?.data;
    } catch (error) {
        console.error("POSTER_DETAILS_API API ERROR: ", error);
        toast.error(error.message || "Something went wrong");
    } finally {
        toast.dismiss(toastId);
    }
    return result;
};

// get multiple posters
export const getMultiplePosterDetails = async (posterIds) => {
    const toastId = toast.loading("Loading");
    let result = [];
    try {
        const response = await apiConnector("POST", GET_MULTIPLE_POSTER_API, { posterIds });
        if (!response?.data?.success) {
            throw new Error("Could not fetch poster data");
        }
        result = response?.data?.data;
    } catch (error) {
        console.error("GET_MULTIPLE_POSTER_API API ERROR: ", error);
        toast.error(error.message || "Something went wrong");
    } finally {
        toast.dismiss(toastId);
    }
    return result;
};

// get order history
export const getOrderHistory = async (token) => {
    const toastId = toast.loading("Loading");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ORDER_HISTORY, null, { Authorization: `Bearer ${token}` });
        console.log("API response:", response);

        if (!response || !response.data) {
            throw new Error("No response from server");
        }

        if (!response.data.success) {
            throw new Error(response.data.message || "Could not fetch order history");
        }

        result = response.data;
    } catch (error) {
        console.error("GET_ORDER_HISTORY API ERROR:", error);
        toast.error(error.message || "Something went wrong");
    } finally {
        toast.dismiss(toastId);
    }
    return result;
};

