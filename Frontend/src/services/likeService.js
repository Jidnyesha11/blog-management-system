// Frontend/src/services/likeService.js

import api from "./api";

export const toggleLike = (
    postId
) => {
    return api.post(
        `/likes/${postId}`
    );
};

export const getLikeStatus = (
    postId
) => {
    return api.get(
        `/likes/${postId}`
    );
};