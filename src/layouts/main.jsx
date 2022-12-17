import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
    const isShow = false;

    const { error, initialize, progress, status } = useMockData();

    const handleClick = () => {
        initialize();
    };

    return (
        <div className="container mt-5">
            <h1 className="d-flex justify-content-center">Воспользуйтесь ссылками на панели быстрого доступа (вверху)</h1>
            {isShow && <>
                <h3>Инициализация данных в Firebase</h3>
                <ul>
                    <li>Status: {status}</li>
                    <li>Progress: {progress}%</li>
                    {error && <li>Error: {error}</li>}
                </ul>
                <button className="btn btn-primary" onClick={handleClick}>Инициализировать</button>
            </>
            }
        </div>
    );
};

export default Main;
