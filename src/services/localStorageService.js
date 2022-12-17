const TOKEN_KEY = "jwt-id";
const REFRESH_KEY = "jwt-refresh";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";

export function setTokens({ expiresIn = 3600, idToken, localId, refreshToken }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000; // Время завершения срока жизни токена
    localStorage.setItem(USERID_KEY, localId);
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
};

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
};

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
};

export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
};

export function removeAuthData() {
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
};

export function getUserId() {
    return localStorage.getItem(USERID_KEY);
};

const localStorageService = {
    getUserId,
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    removeAuthData
};

export default localStorageService;
