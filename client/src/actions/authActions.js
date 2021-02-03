import {
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERROR,
} from "./types";
import setTokenHeader from "../utils/setTokenHeader";
import axios from "axios";

export const registerUser = (info) => (dispatch) => {
  dispatch({
    type: REGISTER_REQUEST,
  });
  axios
    .post("/auth/register", info)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      })
    );
};

export const loadUser = () => (dispatch) => {
  setTokenHeader();
  dispatch({
    type: LOAD_USER_REQUEST,
  });
  axios
    .get("/auth")
    .then((res) =>
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOAD_USER_FAIL,
        payload: err.response.data.msg,
      })
    );
};

export const loginUser = (data) => (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  axios
    .post("/auth/login", data)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      })
    );
};

export const logOut = () => (dispatch) => {
  return dispatch({
    type: LOGOUT,
  });
};

export const clearErrors = () => (dispatch) => {
  return dispatch({
    type: CLEAR_ERROR,
  });
};


