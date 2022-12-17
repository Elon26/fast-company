import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const handleChange = (value) => {
        onChange({ name, value });
    };

    return (
        <div className="mb-4">
            <div>
                <label className="form-label">{label}</label>
            </div>
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
                defaultValue={defaultValue}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};

export default MultiSelectField;
