import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useClickCatcher } from "../../hooks/useClickCatcher";
import { getCurrentUserData } from "../../store/users";

const NavProfile = () => {
    const currentUser = useSelector(getCurrentUserData());

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    const { isInFocus } = useClickCatcher();

    useEffect(() => {
        if (!isInFocus) {
            setIsOpen(false);
        }
    }, [isInFocus]);

    if (!currentUser) return "Loading...";

    return (
        <div className="dropdown me-5 navDropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">
                    {currentUser.name}
                </div>
                <img
                    src={currentUser.image}
                    className="rounded-circle img-responsive"
                    alt="avatar"
                    width={40}
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link to={`/fast-company/users/${currentUser._id}`} className="dropdown-item">Профиль</Link>
                <Link to="/fast-company/logout/" className="dropdown-item">Выйти</Link>
            </div>
        </div>
    );
};

export default NavProfile;
