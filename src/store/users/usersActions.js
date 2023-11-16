import { axiosInstance } from "../../api/axios";
import {
  resetState,
  setError,
  setLoading,
  setData,
  resetErrors
} from "./usersSlice";


export const getUsersData = (payload, action) => async (dispatch) => {
  dispatch(setLoading(true));
  axiosInstance
    .get("/admin/users", payload)
    .then((res) => {
      action && action(res?.data?.data);
      dispatch(setLoading(false));
      dispatch(setData(res?.data?.data));
    })
    .catch((err) => {
      dispatch(setError(err?.error?.message));
      // alert(err?.error?.message)
      dispatch(setLoading(false));
    });
};

// Action to add a new user
export const addUser = (payload, action) => async (dispatch) => {
  dispatch(setLoading(true));
  axiosInstance
    .post("/user/register", payload)
    .then((res) => {
      action && action(res?.data?.data);
      dispatch(setLoading(false));
      dispatch(getUsersData());
    })
    .catch((err) => {
      dispatch(setError(err?.error?.message));
      dispatch(setLoading(false));
    });
};

// Action to update a user
export const updateUser = (userId, payload, action) => async (dispatch) => {
  dispatch(setLoading(true));
  axiosInstance
    .patch(`/admin/user/${userId}`, payload)
    .then((res) => {
      action && action(res?.data?.data);
      dispatch(setLoading(false));
      dispatch(getUsersData());
    })
    .catch((err) => {
      dispatch(setError(err?.error?.message));
      dispatch(setLoading(false));
    });
};

// Action to get a user
export const getUser = (userId,payload, action) => async (dispatch) => {
  dispatch(setLoading(true));
  axiosInstance
    .get(`/admin/user/${userId}`)
    .then((res) => {
      action && action(res?.data?.data);
      dispatch(setLoading(false));
      dispatch(getUsersData());
    })
    .catch((err) => {
      dispatch(setError(err?.error?.message));
      dispatch(setLoading(false));
    });
};

// Action to delete a user
export const deleteUser = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  axiosInstance
    .delete(`/admin/user/${userId}`)
    .then(() => {
      dispatch(setLoading(false));
      dispatch(getUsersData()); // Refresh user data after deleting
    })
    .catch((err) => {
      dispatch(setError(err?.error?.message));
      dispatch(setLoading(false));
    });
};

