import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import validator from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../../store/users";

const LoginForm = () => {
    const history = useHistory();
    const [freshForm, setFreshForm] = useState(true);
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });

    const authError = useSelector(getAuthErrors());
    useEffect(() => {
        if (authError) {
            setErrors(authError);
        }
    }, [authError]);

    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const isValid = !Object.keys(errors).length;

    const handleChange = (target) => {
        setFreshForm(false);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Необходимо ввести email"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Необходимо ввести пароль"
            },
            isValidPassword: {
                message:
                    "Пароль должен содержать не меньше 8 символов, в том числе заглавную и строчную буквы, спецсимвол и число"
            }
        }
    };

    useEffect(() => {
        if (!freshForm) {
            validate();
        }
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return !Object.keys(errors).length;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            const redirect = history.location.state
                ? history.location.state.from.pathname
                : "/course-project/users/";
            dispatch(login({ payload: data, redirect }));
            setFreshForm(true);
        }
    };

    return (
        <form className="" onSubmit={handleSubmit}>
            <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                onChange={handleChange}
                value={data.stayOn}
                name={"stayOn"}
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
