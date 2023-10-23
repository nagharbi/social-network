import { GET_ALL_POSTS } from "../constants/actionTypes";

const postsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_POSTS:
            return action.payload;
        default:
            return state;
    }
};

export default postsReducer;