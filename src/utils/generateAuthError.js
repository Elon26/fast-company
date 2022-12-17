function generateAuthError(message) {
    if (message === "EMAIL_NOT_FOUND") {
        const errorObject = {
            email: "Указанный email не зарегистрирован"
        };
        return errorObject;
    };
    if (message === "INVALID_PASSWORD") {
        const errorObject = {
            password: "Пароль указан неверно"
        };
        return errorObject;
    };
    if (message === "EMAIL_EXISTS") {
        const errorObject = {
            email: "Пользователь с таким email уже существует"
        };
        return errorObject;
    };
}

export default generateAuthError;
