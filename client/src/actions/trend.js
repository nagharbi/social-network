import { GET_TRENDS } from "../constants/actionTypes";

export const getTrends = (posts) => (dispatch) => {
    dispatch({ type: GET_TRENDS, payload: posts });
};
