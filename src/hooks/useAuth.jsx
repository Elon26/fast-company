import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userServise from "../services/userServise";
import { toast } from "react-toastify";
import localStorageService, { setTokens } from "../services/localStorageService";
import { useHistory } from "react-router-dom";
import configFile from "../config.json";

export const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    async function createUser(data) {
        try {
            const { content } = await userServise.create(data);
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    };

    function logout() {
        localStorageService.removeAuthData();
        setCurrentUser(null);
        history.push("/fast-company/");
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async function singUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${configFile.REACT_APP_FIREBASE_KEY}`; // В данной версии мы задали тянуть webAPIKey из переменной окружения, которую мы установили в файле .env.development на одном уровне с package.json, а также добавили этот файл в исключения гитхаб, чтобы он не ушел в заливку
        // webAPIKey взят из настроек проекта Firebase: боковое меню проекта, затем шестеренка возле Project overview, затем Project settings, вкладка general
        // Остальной адрес взят из документации Firebase https://firebase.google.com/docs/reference/rest/auth#section-create-email-password)
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                completedMeetings: randomInt(0, 200),
                rate: randomInt(1, 5),
                image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
        } catch (error) {
            errorCatcher(error);
            // При помощи кода ниже мы передаём ошибку в использующий компонент (RegisterForm), где она используется, как ошибка валидации
            const { code, message } = error.response.data.error;
            if (code === 400 && message === "EMAIL_EXISTS") {
                const errorObject = {
                    email: "Пользователь с таким email уже существует"
                };
                throw errorObject;
            }
        }
    };

    async function singIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${configFile.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = {
                        email: "Указанный email не зарегистрирован"
                    };
                    throw errorObject;
                }
                if (message === "INVALID_PASSWORD") {
                    const errorObject = {
                        password: "Пароль указан неверно"
                    };
                    throw errorObject;
                }
            }
        }
    };

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    async function getUserData() {
        try {
            const { content } = await userServise.getCurrentUser();
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function updateUserData(data) {
        try {
            const { content } = await userServise.update(data);
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <AuthContext.Provider value={{ singUp, singIn, currentUser, logout, updateUserData }}>
            {!isLoading ? children : "Loading..."}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
