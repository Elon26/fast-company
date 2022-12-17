import React from "react";
import { useParams } from "react-router-dom";
import UserChangePage from "../components/page/userChangePage/userChangePage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage/usersListPage";
import UsersLoader from "../components/ui/hoc/usersLoader";

const Users = () => {
    const params = useParams();
    const userId = params.userId;
    const isEdit = params.edit;

    return (
        <UsersLoader>
            {userId ? (
                isEdit ? (
                    <UserChangePage userId={userId} />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </UsersLoader>
    );
};

export default Users;
