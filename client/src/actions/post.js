import { ADD_COMMENT, ADD_POST, DELETE_COMMENT, DELETE_POST, EDIT_COMMENT, GET_ALL_POSTS, GET_POSTS, GET_POST_ERRORS, LIKE_POST, UPDATE_POST } from '../constants/actionTypes';
import * as api from '../api';

export const getPosts = (limit) => async (dispatch) => {
    try {
        const { data } = await api.getPosts(limit);
        dispatch({ type: GET_POSTS, payload: data });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: GET_POST_ERRORS, payload: error.response.data.errors });
    }
};

export const getAllPosts = () => async (dispatch) => {
    try {
        const { data } = await api.getAllPosts();
        dispatch({ type: GET_ALL_POSTS, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const addPost = (message) => async (dispatch) => {
    try {
        const { data } = await api.addPost(message);
        dispatch({ type: ADD_POST, payload: data });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: GET_POST_ERRORS, payload: error.response.data.errors });
    }
};

export const likePost = (postId, {userId, like}) => async (dispatch) => {
    try {
        await api.likePost(postId, {userId, like});
        dispatch({ type: LIKE_POST, payload: {postId, data: {userId, like}} });
    } catch (error) {
        console.log(error.message);
    }
};

export const updatePost = (postId, message) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(postId, message);
        dispatch({ type: UPDATE_POST, payload: {postId, data} });
    } catch (error) {
        console.log(error.message);
    }
};

export const deletePost = (postId) => async (dispatch) => {
    try {
        await api.deletePost(postId);
        dispatch({ type: DELETE_POST, payload: postId });
    } catch (error) {
        console.log(error.message);
    }
};

export const addComment = (postId, comment) => async (dispatch) => {
    try {
        const { data } = await api.addComment(postId, comment);
        dispatch({ type: ADD_COMMENT, payload: {postId, data} });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteComment = (postId, comment) => async (dispatch) => {
    try {
        await api.deleteComment(postId, comment);
        dispatch({ type: DELETE_COMMENT, payload: {postId, comment} });
    } catch (error) {
        console.log(error.message);
    }
};

export const editComment = (postId, comment) => async (dispatch) => {
    try {
        await api.editComment(postId, comment);
        dispatch({ type: EDIT_COMMENT, payload: {postId, data: {commentId: comment.commentId, text: comment.text} } });
    } catch (error) {
        console.log(error.message);
    }
};