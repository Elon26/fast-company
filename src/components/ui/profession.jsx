import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getProfessionById, getProfessionsLoadingStatus, loadProfessionsList } from "../../store/professions";

const Profession = ({ id }) => {
    const profession = useSelector(getProfessionById(id));
    const isLoading = useSelector(getProfessionsLoadingStatus());

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadProfessionsList());
    }, []);

    if (!isLoading) {
        return <>{profession.name}</>;
    } else {
        return "Loading...";
    }
};

Profession.propTypes = {
    id: PropTypes.string.isRequired
};

export default Profession;
