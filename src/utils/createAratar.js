import React from "react";

const createAratar = (width) => (
    <img
        src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`}
        className="rounded-circle img-responsive"
        alt="avatar"
        width={width}
    />
);

export default createAratar;
