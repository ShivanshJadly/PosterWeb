const BASE_URL = process.env.REACT_APP_BASE_URL;

export const userEndpoints = {
  SINGUP_API: BASE_URL + "/users/signup",
  LOGIN_API: BASE_URL + "/users/login",
  LOGOUT_API: BASE_URL + "/users/logout",
  ADD_ADDRESS_API: BASE_URL + "/users/add-address",
  GET_ADDRESS_API: BASE_URL + "/users/get-address",
  ADD_WHISHLIST_API: BASE_URL + "/users/add-wishlist",
  GET_WHISHLIST_API: BASE_URL + "/users/get-wishlist",
  REMOVE_WHISHLIST_API: BASE_URL + "/users/remove-wishlist",
};

export const posterEndpoints = {
  GET_POSTERS_API: BASE_URL + "/posters/get-posters",
  GET_CATEGORY_WISE_POSTER_API: (categoryId) => BASE_URL + `/posters/get-category-wise-poster/${categoryId}`,
  DELETE_POSTER_APIL:(posterId) => BASE_URL + `/posters/delete-poster/${posterId}`,
  GET_POSTER_INFO_API:BASE_URL + "/posters/get-poster-info/:posterId",
  LIVE_SEARCH_SUGGESTION_API: BASE_URL + "/posters/live-search-suggestions",
  SEARCH_POSTER_API: BASE_URL + "/posters/search-posters",
};

export const  orderEndpoints = {
  CREATE_ORDER_API: BASE_URL + "/orders/create",
  GET_ORDER_API: BASE_URL + "/orders/my-order",
  GET_ALL_ORDER_API: BASE_URL + "/orders/admin/all",
  MARK_ORDER_AS_DELIVERED_API: (orderId) => BASE_URL + `/admin/${orderId}/deliver`,
  MARK_ORDER_AS_PAID_API: (orderId) => BASE_URL + `/${orderId}/pay`,
};

export const categoryEndpoints = {
  GET_CATEGORIES_API: BASE_URL + "/category/get-category",
  ADD_CATEGORY_API: BASE_URL + "/category/add-category",
};

export const paymentEndpoints = {
  CREATE_PAYMENT_SESSION_API: BASE_URL + "/payment/create-checkout-session",
  VERIFY_PAYMENT_API: BASE_URL + "/payment/verify-payment",
};

export const reviewEndpoints = {
  GET_REVIEW_API: BASE_URL + "/reviews/get-poster-review/:posterId",
  ADD_REVIEW_API: BASE_URL + "/reviews/add-review/:posterId",
};
