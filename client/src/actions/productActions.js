import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_REQUEST,
} from "./types";
import axios from "axios";
import setTokenHeader from "../utils/setTokenHeader";

export const addNewProduct = (data) => (dispatch) => {
  setTokenHeader();
  dispatch({
    type: ADD_PRODUCT_REQUEST,
  });

  let config = {
    "Content-Type": "form-data",
  };
  axios
    .post("/products/newproduct", data, config)
    .then((res) =>
      dispatch({
        type: ADD_PRODUCT_SUCCESS,
        payload: res.data,
      })
    )
    .catch((res) =>
      dispatch({
        type: ADD_PRODUCT_FAIL,
        payload: res.data,
      })
    );
};

export const getProducts = () => (dispatch) => {
  setTokenHeader();
  dispatch({
    type: GET_PRODUCT_REQUEST,
  });
  axios
    .get("/products")
    .then((res) =>
      dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: res.data,
      })
    )
    .catch((res) =>
      dispatch({
        type: GET_PRODUCT_FAIL,
        payload: res.data,
      })
    );
};

export const removeProducts = (id) => (dispatch) => {
  axios
    .delete(`http://localhost:8080/products/${id}`)
    .then((res) => dispatch(getProducts()))
    .catch((err) => {
      console.log("error delete");
    });
};
