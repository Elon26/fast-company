import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoading, getIsLoggedIn, loadUsersList } from "../../../store/users";
import PropTypes from "prop-types";
import { loadQualitiesList } from "../../../store/qualities";
import { loadProfessionsList } from "../../../store/professions";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const isLoading = useSelector(getIsLoading());

    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
        if (isLoggedIn) dispatch(loadUsersList());
    }, [isLoggedIn]);

    if (isLoading) return "Loading...";

    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
