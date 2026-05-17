import api from "../../api/client";
import { userActions } from "./user-slice";

//Handle user Signup
export const getSignUp = (user) => async(dispatch) => {
    try{
        dispatch(userActions.getSignupRequest());
        const { data } = await api.post("/api/v1/rent/user/signup", user);

        dispatch(userActions.getSignupDetails(data.user));
    } catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
};

//Handle user Login
export const getLogIn = (user) => async(dispatch) => {
    try{
        dispatch(userActions.getLoginRequest());
        const{ data } = await api.post("/api/v1/rent/user/login", user);
        dispatch(userActions.getLoginDetails(data.user));
    } catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
};

// Get current user information

export const currentUser =() => async(dispatch) => {
    try{
        dispatch(userActions.getCurrentUserRequest());
        const{ data } = await api.get("/api/v1/rent/user/me");
        dispatch(userActions.getCurrentUser(data.user));
    } catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
};

// To update the user information
export const updateUser = (updateUser) => async(dispatch) => {
    try{
        dispatch(userActions.getUpdateUserRequest());
        await api.patch("/api/v1/rent/user/updateMe", updateUser);
        const { data } = await api.get("/api/v1/rent/user/me");
        dispatch(userActions.getCurrentUser(data.user));
    } catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
};

//To handle forgot password
export const forgotPassword = (email) => async(dispatch) => {
    try{
        await api.post("/api/v1/rent/user/forgotPassword", { email });
    } catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
};

// Password reset
export const resetPassword = (repassword, token) => async(dispatch) => {
    try{
        await api.patch(`/api/v1/rent/user/resetPassword/${token}`, repassword);
    } catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
};

// Password update
export const updatePassword = (passwords) => async(dispatch) => {
    try{
        dispatch(userActions.getPasswordRequest());
        await api.patch("/api/v1/rent/user/updateMyPassword", passwords);
        dispatch(userActions.getPasswordSuccess(true));
    } catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
};

// User Logout
export const Logout =() => async(dispatch) => {
    try{
        await api.get("/api/v1/rent/user/logout");
        dispatch(userActions.getLogout(null));
    } catch(error){
        dispatch(userActions.getError(error));
    }
};

