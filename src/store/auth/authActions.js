import { axiosInstance } from "../../api/axios";
import {
  resetAuthState,
  setError,
  setLoading,
  setUser,
  resetAuthErrors
} from "./authSlice";


export const loginUser = (payload, action) => async (dispatch) => {
  dispatch(setLoading(true));
  axiosInstance
    .post("/user/login", payload)
    .then((res) => {
      action && action(res?.data?.data);
      const userObj = res.data?.data?.user;
      const user = {
        name: userObj.name,
        id: userObj._id,
        email: userObj.email,
      }
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(res.data?.data?.token));
      dispatch(setLoading(false));
      dispatch(setUser(res?.data?.data));
      dispatch(resetAuthErrors());

    })
    .catch((err) => {
      dispatch(setError(err?.error?.message));
      //Here I am using this alert for time saving, else we can call our snackbar etc. here
      alert(err?.error?.message)
      dispatch(setLoading(false));
    });
};
