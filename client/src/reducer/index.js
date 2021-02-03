import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import wishlistReducer from "./wishlistReducer";
export default combineReducers({
  auth: authReducer,
  products: productReducer,
  wish: wishlistReducer,
});
