import { useEffect, useState } from "react";
import professions from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";
import httpService from "../services/httpService";

const useMockData = () => {
    const statusConst = {
        idle: "Not Started",
        pending: "In Process",
        succesed: "Ready",
        error: "Error Occured"
    };

    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConst.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summCount = professions.length + qualities.length + users.length;

    const incrementCount = () => {
        setCount(prev => prev + 1);
    };

    const updateProgress = () => {
        if (count !== 0 && status === statusConst.idle) {
            setStatus(statusConst.pending);
        }

        const newProgress = Math.floor((count / summCount) * 100);
        if (newProgress > progress) {
            setProgress(() => newProgress);
        }

        if (newProgress === 100) {
            setStatus(statusConst.succesed);
        }
    };

    useEffect(() => {
        updateProgress();
    }, [count]);

    async function initialize() {
        try {
            for (const profession of professions) {
                await httpService.put("profession/" + profession._id, profession);
                incrementCount();
            }
            for (const quality of qualities) {
                await httpService.put("quality/" + quality._id, quality);
                incrementCount();
            }
            for (const user of users) {
                await httpService.put("user/" + user._id, user);
                incrementCount();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConst.error);
        }
    }

    return { error, initialize, progress, status };
};

export default useMockData;
