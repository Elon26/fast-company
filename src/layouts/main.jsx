import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
    const isShow = false;

    const { error, initialize, progress, status } = useMockData();

    const handleClick = () => {
        initialize();
    };

    return (
        <div className="d-flex h-100 justify-content-center align-items-center pb-5 bg-info bg-gradient">
            <h1 className="mb-5 pb-5">
                <p className="text-center">Добро пожаловать!!!</p>
                <p className="text-center">Для продолжения зарегистрируйтесь или перейдите на страницу пользователей</p>
            </h1>
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
