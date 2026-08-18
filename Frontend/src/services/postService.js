import api from "./api";

export const getPosts = () => {
    return api.get("/posts");
};

export const getPostById = (id) => {
    return api.get(`/posts/${id}`);
};

export const createPost = (postData) => {
    return api.post(
        "/posts",
        postData
    );
};

export const updatePost = (
    id,
    postData
) => {
    return api.put(
        `/posts/${id}`,
        postData
    );
};

export const deletePost = (id) => {
    return api.delete(
        `/posts/${id}`
    );
};