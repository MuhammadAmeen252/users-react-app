import React, { useEffect, useRef, useState } from "react";
import { Table } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsersData } from "../../store/users/usersActions";
import { setPage, setLimit } from "../../store/users/usersSlice";
import { AddUser } from "../user/AddUser";
import { UpdateUser } from "../user/UpdateUser";

export function Home() {
    const dispatch = useDispatch();
    const cols = ["id", "name", "email"];
    const { data, error, loading, page, limit } = useSelector(
        (state) => state.users
    );
    const [isOpenAddUser, setisOpenAddUser] = useState(false);
    const [isOpenUpdateUser, setisOpenUpdateUser] = useState(false);
    const [updateUserId, setUpdateUserId] = useState(null);

    const handleOpenAdduserModal = () => {
        setisOpenAddUser(true);
    }

    const handleCloseAdduserModal = () => {
        setisOpenAddUser(false);
    }

    const handleOpenUpdateuserModal = (id) => {
        setUpdateUserId(id);
        setisOpenUpdateUser(true);
    }

    const handleCloseUpdateuserModal = () => {
        setisOpenUpdateUser(false);
    }

    const loadingRef = useRef(null);

    useEffect(() => {
        dispatch(getUsersData());
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [dispatch]);

    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 100
        ) {
            loadMoreData();
        }
    };

    const loadMoreData = () => {
        if (!loading) {
            dispatch(setPage(page + 1));
            dispatch(getUsersData({ page: page + 1, limit }));
        }
    };

    const deleteUserById = (id) => {
        dispatch(deleteUser(id));
    }

    return (
        <div>
            <button onClick={handleOpenAdduserModal} className="bg-blue-500 text-white px-4 py-2">
                Add User
            </button>
            <AddUser isOpen={isOpenAddUser} onClose={handleCloseAdduserModal}/>
            <UpdateUser isOpen={isOpenUpdateUser} onClose={handleCloseUpdateuserModal} userId={updateUserId}/>
            <Table cols={cols} rows={data?.data || []} onEdit={handleOpenUpdateuserModal} onDelete={deleteUserById}/>
            {loading && <div ref={loadingRef}>Loading...</div>}
            {error && <div>Error: {error}</div>}
        </div>
    );
}