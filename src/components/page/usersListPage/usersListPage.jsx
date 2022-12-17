import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import TextField from "../../common/form/textField";
import { useSelector } from "react-redux";
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/professions";
import { getCurrentUserId, getUsers } from "../../../store/users";

const UsersListPage = () => {
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchParams, setSearchParams] = useState("");

    const professions = useSelector(getProfessions());
    const isLoading = useSelector(getProfessionsLoadingStatus());

    const users = useSelector(getUsers());
    const [usersToShow, setUsersToShow] = useState(users);

    const currentUserId = useSelector(getCurrentUserId());

    useEffect(() => {
        setCurrentPage(1);
        if (selectedProf) setSearchParams("");
    }, [selectedProf]);

    useEffect(() => {
        setCurrentPage(1);
        if (searchParams) setSelectedProf();
    }, [searchParams]);

    const handleToggleBookMark = (id) => {
        const newArray = usersToShow.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        setUsersToShow(newArray);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
        setCurrentPage(1);
    };

    if (usersToShow) {
        const searchResult = searchParams
            ? usersToShow.filter((user) =>
                user.name.toLowerCase().includes(searchParams.toLowerCase())
            )
            : usersToShow;

        const filteredUsers = selectedProf
            ? searchResult.filter(
                (user) => {
                    return JSON.stringify(user.profession) ===
                        JSON.stringify(selectedProf._id);
                }
            )
            : searchResult;

        const filteredUsersWithoutAuthorised = filteredUsers.filter(user => user._id !== currentUserId);

        const count = filteredUsersWithoutAuthorised.length;

        const sortedUsers = _.orderBy(filteredUsersWithoutAuthorised, sortBy.path, sortBy.order);

        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf();
        };

        const handlePageChangeAfterDelete = () => {
            const currentCount = count - 1;
            const currentCountLimit = (currentPage - 1) * pageSize;
            if (currentCountLimit && currentCount <= currentCountLimit) {
                setCurrentPage(currentPage - 1);
            }
            if (currentCountLimit === 0 && currentCount <= currentCountLimit) {
                clearFilter();
            }
        };

        const handleChangeSearchField = ({ value }) => {
            setSearchParams(value);
        };

        return (
            <div className="d-flex m-2">
                {professions && !isLoading && (
                    <div className="d-flex flex-column flex-shrink-0 m-2">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemsSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary m-2"
                            onClick={clearFilter}
                        >
                            Очистить фильтр
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column flex-fill">
                    <SearchStatus length={count} />
                    <TextField
                        name="search"
                        placeholder="Search..."
                        value={searchParams}
                        onChange={handleChangeSearchField}
                    />
                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onPageChangeAfterDelete={
                                handlePageChangeAfterDelete
                            }
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return <h2 className="d-flex justify-content-center">Loading</h2>;
};

UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
