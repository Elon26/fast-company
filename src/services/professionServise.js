import httpService from "./httpService";

const professionEndPoint = "profession/";

const professionServise = {
    get: async () => {
        const { data } = await httpService.get(professionEndPoint);
        return data;
    }
};

export default professionServise;
