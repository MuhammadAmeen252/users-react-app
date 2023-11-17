import { axiosInstance } from "../../api/axios";
import {
  resetState,
  setError,
  setLoading,
  setData,
  resetErrors,
  setPage
} from "./usersSlice";


export const getUsersData = (payload, action) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {page=0, limit=20} = payload;
  const { data: existingData } = getState().users;
  axiosInstance
    .get(`/admin/users?page=${page}&limit=${limit}`)
    .then((res) => {
      action && action(res?.data?.data);
      const newData = {
        ...res.data.data,
        data: page === 0 ? res.data.data.data : [...existingData.data , ...res.data.data.data],
      };
      dispatch(setData(newData));
      dispatch(setLoading(false));
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
      //Here better approach is to update the redux state instead of loading the complete data from API
      //But for now I am using this but in most projects I prefer rather updating redux state
      dispatch(getUsersData({}));
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
      //Here better approach is to update the redux state instead of loading the complete data from API
      //But for now I am using this but in most projects I prefer rather updating redux state
      dispatch(getUsersData({}));
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
      //Here better approach is to update the redux state instead of loading the complete data from API
      //But for now I am using this but in most projects I prefer rather updating redux state
      dispatch(getUsersData({}));
    })
    .catch((err) => {
      dispatch(setError(err?.error?.message));
      dispatch(setLoading(false));
    });
};

