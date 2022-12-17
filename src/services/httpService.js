import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import authService from "./authService";
import localStorageService from "./localStorageService";

// Реализовано выделение отдельного инстанса axios, названного http, для того чтобы иметь возможность обращаться к axios напрямую, в обход всех реализованных здесь проверок

const http = axios.create({
    baseURL: configFile.apiEndPoint
});

http.interceptors.request.use(
    async function (config) {
        if (configFile.isFirebase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json";

            // Далее идёт функционал обновления токена
            const expiresDate = localStorageService.getTokenExpiresDate();
            const refreshToken = localStorageService.getRefreshToken();
            if (refreshToken && Date.now() > expiresDate) {
                const data = await authService.refresh();
                localStorageService.setTokens({
                    idToken: data.id_token,
                    refreshToken: data.refresh_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                });
            }
            // Далее идёт функционал предоставления прав пользователю (согласно сравнению установленных правил и текущего токена), путем прибавления к адресной строке запроса accessToken'а
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken };
            }
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data && !data._id ? Object.keys(data).map(key => ({
        ...data[key]
    })) : data;
};

http.interceptors.response.use(
    (res) => {
        if (configFile.isFirebase) {
            res.data = { content: transformData(res.data) };
        }
        return res;
    },
    function (error) {
        const expectedError =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedError) {
            toast.error("Ошибка сервера");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};

export default httpService;

/*
Версия до выделения axios в создание отдельного инстанса axios через http
axios.defaults.baseURL = configFile.apiEndPoint;

axios.interceptors.request.use(
    function (config) {
        if (configFile.isFirebase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data ? Object.keys(data).map(key => ({
        ...data[key]
    })) : [];
};

axios.interceptors.response.use(
    (res) => {
        if (configFile.isFirebase) {
            res.data = { content: transformData(res.data) };
        }
        return res;
    },
    function (error) {
        const expectedError =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedError) {
            toast.error("Ошибка сервера");
        }
        return Promise.reject(error);
    }
);

// Версия до подключения Firebase
// axios.interceptors.response.use(
//     (res) => res,
//     function (error) {
//         const expectedError =
//             error.response &&
//             error.response.status >= 400 &&
//             error.response.status < 500;
//         if (!expectedError) {
//             toast.error("Ошибка сервера");
//         }
//         return Promise.reject(error);
//     }
// );

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpService;
*/
