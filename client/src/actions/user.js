import { GET_USER } from "../constants/actionTypes";
import * as api from '../api';

export const getUser = (userId) => async (dispatch) => {
    try {
        const { data } = await api.getUser(userId);
        dispatch({ type: GET_USER, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};
