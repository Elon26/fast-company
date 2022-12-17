import React, { useState } from "react";
import validator from "../../../utils/validator";
import TextAreaField from "../form/textAreaField";
import PropTypes from "prop-types";

const AddComment = ({ onSubmit }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const isValid = !Object.keys(errors).length;

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        content: {
            isRequired: {
                message: "Введите сообщение"
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
        if (data.content && isValid) {
            onSubmit(data);
            setData({});
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextAreaField
                    label="Сообщение"
                    name="content"
                    rows="3"
                    value={data.content || ""}
                    onChange={handleChange}
                    error={errors.content}
                />
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={!isValid}
                    >
                        Опубликовать
                    </button>
                </div>
            </form>
        </>
    );
};

AddComment.propTypes = {
    onSubmit: PropTypes.func
};

export default AddComment;
