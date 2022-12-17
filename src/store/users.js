import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";
import localStorageService, { setTokens } from "../services/localStorageService";
import userServise from "../services/userServise";
import generateAuthError from "../utils/generateAuthError";
import getRandomInt from "../utils/getRandomInt";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken() ? {
    entities: null,
    isLoading: true,
    error: null,
    auth: { userId: localStorageService.getUserId() },
    isLoggedIn: true,
    isDataLoaded: false
} : {
    entities: null,
    isLoading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    isDataLoaded: false
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.isDataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccessed: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userUpdated: (state, action) => {
            const userIndexToChange = state.entities.findIndex(user => user._id === action.payload._id);
            state.entities[userIndexToChange] = action.payload;
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.isDataLoaded = false;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const { usersRequested, usersReceived, usersRequestFailed, authRequestSuccessed, authRequestFailed, userCreated, userUpdated, userLoggedOut } = actions;

const authRequested = createAction("users/authRequested");
const createUserRequested = createAction("users/createUserRequested");
const updateUserRequested = createAction("users/updateUserRequested");
const createUserFailed = createAction("users/createUserFailed");
const updateUserFailed = createAction("users/updateserFailed");

export const login = ({ payload, redirect }) => async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.login({ email, password });
        dispatch(authRequestSuccessed({ userId: data.localId }));
        setTokens(data);
        history.push(redirect);
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const error = generateAuthError(message);
            dispatch(authRequestFailed(error));
        } else {
            dispatch(authRequestFailed(error.message));
        }
    }
};

export const singUp = ({ email, password, ...rest }) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register({ email, password });
        setTokens(data);
        dispatch(authRequestSuccessed({ userId: data.localId }));
        dispatch(createUser({
            _id: data.localId,
            email,
            completedMeetings: getRandomInt(0, 200),
            rate: getRandomInt(1, 5),
            image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
                .toString(36)
                .substring(7)}.svg`,
            ...rest
        }));
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const error = generateAuthError(message);
            dispatch(authRequestFailed(error));
        } else {
            dispatch(authRequestFailed(error.message));
        }
    }
};
export const logout = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/fast-company/");
};

function createUser(payload) {
    return async function (dispatch) {
        dispatch(createUserRequested());
        try {
            const { content } = await userServise.create(payload);
            dispatch(userCreated(content));
            history.push("/fast-company/users");
        } catch (error) {
            dispatch(createUserFailed(error.message));
        }
    };
};

export function updateUserData(payload) {
    return async function (dispatch) {
        dispatch(updateUserRequested());
        try {
            const { content } = await userServise.update(payload);
            dispatch(userUpdated(content));
            history.push("/fast-company/users/" + payload._id);
        } catch (error) {
            dispatch(updateUserFailed(error.message));
        }
    };
};

export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested());
    try {
        const { content } = await userServise.get();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const getUsers = () => (state) => state.users.entities;
export const getUserById = (id) => (state) => state.users.entities.find((user) => id === user._id);
export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find((user) => state.users.auth.userId === user._id)
        : null;
};
export const getIsLoading = () => (state) => state.users.isLoading;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getIsDataLoaded = () => (state) => state.users.isDataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getAuthErrors = () => (state) => state.users.error;

export default usersReducer;
