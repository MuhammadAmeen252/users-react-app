import React, { useEffect, useMemo, useRef, useState } from "react";
import { Table } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsersData } from "../../store/users/usersActions";
import { setPage, setLimit } from "../../store/users/usersSlice";
import { AddUser, UpdateUser, ViewUser } from "../index";

export function Home() {
    const dispatch = useDispatch();
    const cols = ["id", "name", "email"];
    const { data, error, loading, page, limit } = useSelector(
        (state) => state.users
    );
    const [isOpenAddUser, setisOpenAddUser] = useState(false);
    const [isOpenUpdateUser, setisOpenUpdateUser] = useState(false);
    const [isOpenViewUser, setisOpenViewUser] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleOpenAdduserModal = () => {
        setisOpenAddUser(true);
    }

    const handleCloseAdduserModal = () => {
        setisOpenAddUser(false);
    }

    const handleOpenUpdateuserModal = (id) => {
        setSelectedUserId(id);
        setisOpenUpdateUser(true);
    }

    const handleCloseUpdateuserModal = () => {
        setisOpenUpdateUser(false);
    }

    const handleOpenViewuserModal = (id) => {
        setSelectedUserId(id);
        setisOpenViewUser(true);
    }

    const handleCloseViewuserModal = () => {
        setisOpenViewUser(false);
    }

    useEffect(() => {
        dispatch(getUsersData({ page: page, limit }));
    }, [page]);

    const loadMoreData = () => {
            dispatch(setPage(page + 1));
    };

    const deleteUserById = (id) => {
        dispatch(deleteUser(id));
    }

    //SO it doesn't re render on local state change
    const memoizedTable = useMemo(() => (
        <Table
            cols={cols}
            rows={data?.data || []}
            onEdit={handleOpenUpdateuserModal}
            onDelete={deleteUserById}
            loadMore={loadMoreData}
            hasMore={data?.isNextPage}
            onView={handleOpenViewuserModal}
        />
    ), [data]);

    return (
        <div>
            <button onClick={handleOpenAdduserModal} className="bg-blue-500 text-white px-4 py-2">
                + Add User
            </button>
            {isOpenAddUser && <AddUser isOpen={isOpenAddUser} onClose={handleCloseAdduserModal} />}
            {isOpenUpdateUser && <UpdateUser isOpen={isOpenUpdateUser} onClose={handleCloseUpdateuserModal} userId={selectedUserId} />}
            {isOpenViewUser && <ViewUser isOpen={isOpenViewUser} onClose={handleCloseViewuserModal} userId={selectedUserId} />}
            {memoizedTable}
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
        </div>
    );
}