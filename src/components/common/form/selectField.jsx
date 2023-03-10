import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    options,
    onChange,
    value,
    label,
    defaultOption,
    error,
    name
}) => {
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {options &&
                    options.map((option) => (
                        <option key={option._id} value={option._id}>
                            {option.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    options: PropTypes.array,
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string,
    defaultOption: PropTypes.string,
    error: PropTypes.string,
    name: PropTypes.string
};

export default SelectField;
