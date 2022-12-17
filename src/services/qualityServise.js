import httpService from "./httpService";

const qualityEndPoint = "quality/";

const qualityServise = {
    get: async () => {
        const { data } = await httpService.get(qualityEndPoint);
        return data;
    }
};

export default qualityServise;
