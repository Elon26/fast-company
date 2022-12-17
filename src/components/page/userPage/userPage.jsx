import React from "react";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualityCard from "../../ui/qualityCard";
import MeetingCard from "../../ui/meetingCard";
import Comments from "../../ui/comments";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";

const UserPage = ({ userId }) => {
    const user = useSelector(getUserById(userId));

    return (
        <>
            {!user._id && (
                <h2 className="d-flex justify-content-center">Loading</h2>
            )}
            {user._id && (
                <div className="container">
                    <div className="row gutters-sm mt-4">
                        <div className="col-md-4 mb-3">
                            <UserCard user={user} />
                            <QualityCard qualities={user.qualities} />
                            <MeetingCard
                                completedMeetings={user.completedMeetings}
                            />
                        </div>
                        <div className="col-md-8">
                            <Comments />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
