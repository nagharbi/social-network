import { AUTH_ERROR, CLEAN_AUTH_ERROR } from "../constants/actionTypes";

const initialState = { username: '', password: '', email: '' };

const errorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_ERROR:
            return { ...state, ...action.payload };
        case CLEAN_AUTH_ERROR:
            return { ...state, ...initialState };
        default:
            return state;
    }
};

export default errorsReducer;