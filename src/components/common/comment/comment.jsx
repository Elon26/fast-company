import React from "react";
import PropTypes from "prop-types";
import publishedTimeHandler from "../../../utils/publishedTimeHandler";
import { getCurrentUserId, getUserById } from "../../../store/users";
import { useSelector } from "react-redux";

const Comment = ({ userId, comment, createdAt, commentId, onDelete }) => {
    const user = useSelector(getUserById(userId));
    const currentUserId = useSelector(getCurrentUserId());

    return (
        <>
            {(
                <div className="bg-light card-body  mb-3">
                    <div className="row">
                        <div className="col">
                            <div className="d-flex flex-start ">
                                <div className="mx-2">
                                    <img
                                        src={user.image}
                                        className="rounded-circle img-responsive"
                                        alt="avatar"
                                        width={75}
                                    />
                                </div>
                                <div className="flex-grow-1 flex-shrink-1">
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="mb-1 ">
                                                {user && user.name}
                                                <span> - </span>
                                                <span className="small">
                                                    {publishedTimeHandler(
                                                        createdAt
                                                    )}
                                                </span>
                                            </p>
                                            {currentUserId === userId && <button
                                                className="btn btn-sm text-primary d-flex align-items-center"
                                                onClick={() => onDelete(commentId)}
                                            >
                                                <i className="bi bi-x-lg"></i>
                                            </button>}
                                        </div>
                                        <p className="small mb-0">{comment}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

Comment.propTypes = {
    userId: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    commentId: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Comment;
