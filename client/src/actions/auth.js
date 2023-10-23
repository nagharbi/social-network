import { AUTH, AUTH_ERROR, REGISTER_USER } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, payload: data });
        window.location = '/';
    } catch (error) {
        console.log(error.message);
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        await api.signUp(formData);
        dispatch({ type: REGISTER_USER, payload: true });
    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: error.response.data.errors });
    }
};
