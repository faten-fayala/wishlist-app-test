import axios from "axios";
import {
  GET_WISHLIST_SUCCESS,
  GET_WISHLIST_REQUEST,
  ADD_WISHLIST_SUCCESS,
  ADD_WISHLIST_REQUEST,
  ADD_WISHLIST_FAIL,
} from "./types";
import setTokenHeader from "../utils/setTokenHeader";

//add wishlist
export const addNewWishlist = (data) => (dispatch) => {
  setTokenHeader();
  dispatch({
    type: ADD_WISHLIST_REQUEST,
  });

  let config = {
    "Content-Type": "form-data",
  };
  axios
    .post("/wishlists/newwishlist", data,config)
    .then((res) =>
      dispatch({
        type: ADD_WISHLIST_SUCCESS,
        payload: res.data,
      })
    )
    .catch((res) =>
      dispatch({
        type: ADD_WISHLIST_FAIL,
        payload: res.data,
      })
    );
};
// get wishlists
export const getWishlist = () => (dispatch) => {
  setTokenHeader();
  dispatch({
    type: GET_WISHLIST_REQUEST,
  });
  axios
    .get("/wishlists")
    .then((res) =>
      dispatch({
        type: GET_WISHLIST_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err.response));
};
