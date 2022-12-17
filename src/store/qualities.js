import { createSlice } from "@reduxjs/toolkit";
import qualityServise from "../services/qualityServise";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        qualitiesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFailed } = actions;

// ! Данный код необходим, чтобы qualities повторно запрашивались с сервера при монтировании компонента, но не чаще чем раз в 10 минут. На случай изменения данных на сервере в процессе нахождения на странице, т.к. в противном случае они запрашиваются единожды, при монтировании App.
function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities;
    if (isOutdated(lastFetch)) {
        dispatch(qualitiesRequested());
        try {
            const { content } = await qualityServise.get();
            dispatch(qualitiesReceived(content));
        } catch (error) {
            dispatch(qualitiesRequestFailed(error.message));
        }
    }
};
// ------------------

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesById = (ids) => (state) => state.qualities.entities.filter((quality) => ids.includes(quality._id));
export const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading;

export default qualitiesReducer;
