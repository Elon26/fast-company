import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useDispatch, useSelector } from "react-redux";
import { getQualitiesById, getQualitiesLoadingStatus, loadQualitiesList } from "../../../store/qualities";

const QualitiesList = ({ ids }) => {
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualities = useSelector(getQualitiesById(ids));

    // ! Данный код необходим, чтобы qualities повторно запрашивались с сервера при монтировании компонента, но не чаще чем раз в 10 минут. На случай изменения данных на сервере в процессе нахождения на странице, т.к. в противном случае они запрашиваются единожды, при монтировании App.
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    if (!isLoading) {
        return (
            <>
                {qualities.map((qual) => (
                    <Quality key={qual._id} {...qual} />
                ))}
            </>
        );
    } else {
        return "Loading...";
    }
};

QualitiesList.propTypes = {
    ids: PropTypes.array
};

export default QualitiesList;
