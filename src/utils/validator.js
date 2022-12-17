const validator = (data, config) => {
    const errors = {};

    function validate(validateMethod, data, config) {
        let statusValidate;

        if (validateMethod === "isRequired") {
            if (typeof data === "boolean") {
                statusValidate = !data;
            } else {
                statusValidate = data.trim() === "";
            }
        }
        if (validateMethod === "isEmail") {
            const emailRegExp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
            statusValidate = !emailRegExp.test(data);
        }
        if (validateMethod === "isValidPassword") {
            const passwordRegExp =
                /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[а-яa-z])(?=.*[А-ЯA-Z])[0-9а-яa-zА-ЯA-Z!@#$%^&*]{8,}/g;
            statusValidate = !passwordRegExp.test(data);
        }
        if (statusValidate) return config.message;
    }

    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );

            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }

    return errors;
};

export default validator;
