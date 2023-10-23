import { combineReducers } from "redux";
import authReducer from './auth.reducer';
import errorsReducer from './errors.reducer';
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import postReducer from './post.reducer';
import postsReducer from './posts.reducer';
import trendingReducer from './trending.reducer';

const reducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    authReducer,
    errorsReducer,
    userReducer,
    usersReducer,
    postReducer,
    postsReducer,
    trendingReducer
});

export default reducer;
