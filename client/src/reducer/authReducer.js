import {REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGIN_REQUEST,
LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT,
CLEAR_ERROR
} from '../actions/types';

let initState = {
    token: localStorage.getItem('token'),
    isLoading: false,
    user:null,
    isAuth:false,
    errors:null
}

const AuthReducer =(state=initState, action) => {
switch (action.type) {
    case REGISTER_REQUEST:
    case LOAD_USER_REQUEST:
    case LOGIN_REQUEST:
        return {
            ...state,
            isLoading: true
        }
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoading: false
            }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
        localStorage.setItem('token',action.payload.token)
        return {
            ...state,
            token:action.payload.token,
            isLoading: false,
            isAuth: true,
            errors:null
        }
        case REGISTER_FAIL:
        case LOAD_USER_FAIL:
        case LOGIN_FAIL:
        localStorage.removeItem('token')
        return {
            ...state,
            isLoading: false,
            isAuth: false,
            errors:action.payload
        }
        case CLEAR_ERROR:
            return {
                ...state,
                errors: null
            }
        case LOGOUT:
        localStorage.removeItem('token')
            return {
                token: null,
                isLoading: false,
                user:null,
                isAuth:false,
                errors:null
            }
default:
    return state
}
}
export default AuthReducer;

