// Frontend/src/services/commentService.js

import api from "./api";

export const getComments = (
    postId
) => {
    return api.get(
        `/comments/post/${postId}`
    );
};

export const createComment = (
    postId,
    content
) => {
    return api.post(
        `/comments/post/${postId}`,
        { content }
    );
};

export const deleteComment = (
    id
) => {
    return api.delete(
        `/comments/${id}`
    );
};