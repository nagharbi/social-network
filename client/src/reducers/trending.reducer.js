import { GET_TRENDS } from "../constants/actionTypes";

const trendingReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_TRENDS:
            return action.payload;
        default:
            return state;
    }
};

export default trendingReducer;