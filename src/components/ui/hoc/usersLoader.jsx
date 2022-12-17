import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsDataLoaded, loadUsersList } from "../../../store/users";
import PropTypes from "prop-types";

const UsersLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isDataLoaded = useSelector(getIsDataLoaded());

    useEffect(() => {
        if (!isDataLoaded) dispatch(loadUsersList());
    }, []);

    if (!isDataLoaded) return "Loading...";

    return children;
};

UsersLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UsersLoader;
