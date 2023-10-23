import { ADD_COMMENT, ADD_POST, DELETE_COMMENT, DELETE_POST, EDIT_COMMENT, GET_POSTS, LIKE_POST, UPDATE_POST } from "../constants/actionTypes";

const postReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_POST:
            return [...state, action.payload].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        case GET_POSTS:
            return action.payload;
        case LIKE_POST:
            return state.slice().map((post) => {
                return (post._id === action.payload.postId)
                ? (action.payload.data.like)
                    ? {
                        ...post,
                        usersLiked: [...post.usersLiked, action.payload.data.userId]
                    }
                    : {
                        ...post,
                        usersLiked: post.usersLiked.filter((id) => id !== action.payload.data.userId)
                    }
                : post;
            });
        case UPDATE_POST:
            return state.slice().map((post) => {
                return (post._id === action.payload.postId) ? {...post, message: action.payload.data.message} : post;
            });
        case DELETE_POST:
            return [...state].filter(post => post._id !== action.payload);
        case ADD_COMMENT:
            return state.slice().map((post) => {
                return {...post, comments: [...action.payload.data.comments]};
            });
        case DELETE_COMMENT:
            return state.slice().map((post) => {
                return (post._id === action.payload.postId) ? {
                    ...post,
                    comments: post.comments.filter((comment) => comment._id !== action.payload.comment.commentId)
                } : post;
            });
        case EDIT_COMMENT:
            return state.slice().map((post) => {
                return (post._id === action.payload.postId) ? {
                    ...post,
                    comments: post.comments.slice().map((comment) => {
                        return (comment._id === action.payload.data.commentId) ? {
                            ...comment,
                            text: action.payload.data.text
                        } : comment
                    })
                } : post
            });
        default:
            return state;
    }
};

export default postReducer;
