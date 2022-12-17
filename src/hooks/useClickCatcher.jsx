import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

const ClickCatcherContext = React.createContext();

export const useClickCatcher = (str) => {
    return useContext(ClickCatcherContext);
};

const ClickCatcherProvider = ({ children }) => {
    const [isInFocus, setIsInFocus] = useState(false);

    const clickCatcher = (e) => {
        if (e.target.closest(".navDropdown")) {
            setIsInFocus(true);
        } else {
            setIsInFocus(false);
        }
    };

    return (
        <ClickCatcherContext.Provider value={{ isInFocus }}>
            <div className="vh-100" onClick={clickCatcher}>
                {children}
            </div>
        </ClickCatcherContext.Provider>
    );
};

ClickCatcherProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ClickCatcherProvider;
