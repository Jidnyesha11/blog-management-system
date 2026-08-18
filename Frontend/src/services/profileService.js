// Frontend/src/services/profileService.js

import api from "./api";

export const getProfile = () => {
    return api.get("/profile");
};

export const updateProfile = (
    profileData
) => {
    return api.put(
        "/profile",
        profileData
    );
};

export const changePassword = (
    passwordData
) => {
    return api.put(
        "/profile/password",
        passwordData
    );
};