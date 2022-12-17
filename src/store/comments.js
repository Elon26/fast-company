import { createAction, createSlice } from "@reduxjs/toolkit";
import commentServise from "../services/commentService";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(comment => comment._id !== action.payload);
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const { commentsRequested, commentsReceived, commentsRequestFailed, commentCreated, commentRemoved } = actions;

const createCommentRequested = createAction("comments/createCommentRequested");
const createCommentFailed = createAction("comments/createCommentFailed");
export const createComment = (payload) => async (dispatch) => {
    dispatch(createCommentRequested());
    try {
        const { content } = await commentServise.createComment(payload);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(createCommentFailed(error.message));
    }
};

const removeCommentRequested = createAction("comments/removeCommentRequested");
const removeCommentFailed = createAction("comments/removeCommentFailed");
export const removeComment = (payload) => async (dispatch) => {
    dispatch(removeCommentRequested());
    try {
        const { content } = await commentServise.removeComment(payload);
        if (content === null) {
            dispatch(commentRemoved(payload));
        }
    } catch (error) {
        dispatch(removeCommentFailed(error.message));
    }
};

export const loadCommentsList = (pageId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentServise.getComments(pageId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};
// ------------------

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
