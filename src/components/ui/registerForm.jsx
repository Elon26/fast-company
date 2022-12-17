import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import validator from "../../utils/validator";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/professions";
import { getAuthErrors, singUp } from "../../store/users";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [freshForm, setFreshForm] = useState(true);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false,
        bookmark: false
    });
    const [errors, setErrors] = useState({});
    const isValid = !Object.keys(errors).length;
    const professions = useSelector(getProfessions());
    const qualities = useSelector(getQualities());
    const qualitiesList = qualities.map(quality => ({
        label: quality.name,
        value: quality._id
    }));

    const authError = useSelector(getAuthErrors());
    useEffect(() => {
        if (authError) {
            setErrors(authError);
        }
    }, [authError]);

    useEffect(() => {
        if (!freshForm) {
            validate();
        }
    }, [data]);

    const handleChange = (target) => {
        setFreshForm(false);
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
        },
        password: {
            isRequired: {
                message: "Необходимо ввести пароль"
            },
            isValidPassword: {
                message:
                    "Пароль должен содержать не меньше 8 символов, в том числе заглавную и строчную буквы, спецсимвол и число"
            }
        },
        profession: {
            isRequired: {
                message: "Необходимо выбрать профессию"
            }
        },
        licence: {
            isRequired: {
                message: "Необходимо согласиться с лицензионным соглашением"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return !Object.keys(errors).length;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            const newData = { ...data, qualities: data.qualities.map(quality => quality.value) };
            dispatch(singUp(newData));
            setFreshForm(true);
        }
    };

    return (
        <form className="" onSubmit={handleSubmit}>
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
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                label="Выберете профессию"
                options={professions}
                name="profession"
                value={data.profession}
                onChange={handleChange}
                defaultOption="Choose..."
                error={errors.profession}
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
                options={qualitiesList}
                onChange={handleChange}
                name="qualities"
                defaultValue={data.qualities}
            />
            <CheckBoxField
                onChange={handleChange}
                value={data.licence}
                name={"licence"}
                error={errors.licence}
            >
                Согласиться с <Link to={"#"}>лицензионным соглашением</Link>
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

export default RegisterForm;
