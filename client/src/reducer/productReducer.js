import {
    ADD_PRODUCT_FAIL,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_REQUEST,
    GET_PRODUCT_FAIL,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_REQUEST
} from '../actions/types';

const initialState = {
    product: [],
    isloading:false,
    saved: null,
    error: null,
    getProductLoading: false
    }

const productReducer =(state=initialState, action) => {
    switch (action.type) { 
        case GET_PRODUCT_REQUEST:
            return {
                ...state,
                getProductLoading: true
            }
           case ADD_PRODUCT_REQUEST:
               return {
                   ...state,
                    isloading: true
               }
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                    product: [action.payload, ...state.product],
                    isloading: false
            }  
            case ADD_PRODUCT_FAIL:
            case GET_PRODUCT_FAIL:
                return {
                    ...state,
                    error: action.payload,
                    isloading: false,
                    getProductLoading: false

                }
        case GET_PRODUCT_SUCCESS:
                return {
                    ...state,
                    product: action.payload,
                    getProductLoading: false
                }    
    default:
        return state
    }
    }
    export default productReducer;
