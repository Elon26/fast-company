import httpService from "./httpService";
import localStorageService from "./localStorageService";

const userEndPoind = "user/";

const userServise = {
    get: async () => {
        const { data } = await httpService.get(userEndPoind);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(userEndPoind + payload._id, payload);
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(userEndPoind + localStorageService.getUserId());
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.put(userEndPoind + payload._id, payload);
        return data;
    }
};

export default userServise;
