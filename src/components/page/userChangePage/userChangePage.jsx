import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import validator from "../../../utils/validator";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus, getQualitiesById } from "../../../store/qualities";
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/professions";
import { getCurrentUserData, getUserById, updateUserData } from "../../../store/users";

const UserChangePage = ({ userId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [data, setData] = useState(useSelector(getUserById(userId)));
    const [errors, setErrors] = useState({});
    const isValid = !Object.keys(errors).length;
    const currentUser = useSelector(getCurrentUserData());

    const qualities = useSelector(getQualities());
    const isLoadingQualities = useSelector(getQualitiesLoadingStatus());

    const professions = useSelector(getProfessions());
    const isLoadingProfession = useSelector(getProfessionsLoadingStatus());

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        if (target.name === "qualities") {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value.map((item) => item.value)
            }));
            return;
        }
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Необходимо ввести имя"
            }
        },
        email: {
            isRequired: {
                message: "Необходимо ввести email"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return !Object.keys(errors).length;
    };

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        const isValid = validate();

        if (isValid) {
            dispatch(updateUserData(data));
        }
    };

    const handleGoBack = () => {
        history.push("/course-project/users/" + userId);
    };

    const checkAuth = () => {
        if (currentUser._id !== userId) {
            window.location.assign("/course-project/users/" + currentUser._id + "/edit/");
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <>
            {(!data || isLoadingQualities || isLoadingProfession) && (
                "Loading..."
            )}
            {data && !isLoadingQualities && !isLoadingProfession && (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <form
                                className=""
                                onSubmit={(e) =>
                                    handleSubmit(e, data)
                                }
                            >
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выберете профессию"
                                    options={professions}
                                    name="profession"
                                    value={data.profession}
                                    onChange={handleChange}
                                    defaultOption="Choose..."
                                />
                                <RadioField
                                    label="Выберете пол"
                                    options={[
                                        { name: "Мужской", value: "male" },
                                        { name: "Женский", value: "female" }
                                    ]}
                                    value={data.sex}
                                    onChange={handleChange}
                                    name={"sex"}
                                />
                                <MultiSelectField
                                    label="Выберете качества"
                                    options={qualities.map((quality) => {
                                        return {
                                            label: quality.name,
                                            value: quality._id
                                        };
                                    })}
                                    onChange={handleChange}
                                    name="qualities"
                                    defaultValue={
                                        useSelector(getQualitiesById(data.qualities)).map((quality) => {
                                            return {
                                                label: quality.name,
                                                value: quality._id
                                            };
                                        })}
                                />
                                <button
                                    className="btn btn-primary w-100 mx-auto mb-2"
                                    type="submit"
                                    disabled={!isValid}
                                >
                                    Обновить
                                </button>
                                <button
                                    className="btn btn-secondary w-100 mx-auto"
                                    onClick={handleGoBack}
                                >
                                    Назад
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

UserChangePage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserChangePage;
