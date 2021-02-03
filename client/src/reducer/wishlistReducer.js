import {
  ADD_WISHLIST_REQUEST,
  ADD_WISHLIST_SUCCESS,
  ADD_WISHLIST_FAIL,
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
  GET_WISHLIST_FAIL,
} from "../actions/types";

const initialState = {
  wishlist: [],
  isloading: false,
  saved: null,
  getWishlistLoading: null,
  error: null,
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WISHLIST_REQUEST:
      return {
        ...state,
        getWishlistLoading: true,
      };
    case ADD_WISHLIST_REQUEST:
      return {
        ...state,
        isloading: true,
      };
    case ADD_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: [action.payload, ...state.wishlist],
        isloading: false,
      };
    case ADD_WISHLIST_FAIL:
    case GET_WISHLIST_FAIL:
      return {
        ...state,
        error: action.payload,
        isloading: false,
        getWishlistLoading: false,
      };
    case GET_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: action.payload,
        getWishlistLoading: false,
      };
    default:
      return state;
  }
};
export default wishlistReducer;
