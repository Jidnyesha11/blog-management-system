// Frontend/src/services/adminService.js

import api from "./api";

export const getAdminStats = () => {
    return api.get("/admin/stats");
};

export const getAllUsers = () => {
    return api.get("/admin/users");
};

export const updateUserRole = (
    id,
    role
) => {
    return api.put(
        `/admin/users/${id}/role`,
        { role }
    );
};

export const deleteUser = (id) => {
    return api.delete(
        `/admin/users/${id}`
    );
};

export const getAdminPosts = () => {
    return api.get("/admin/posts");
};