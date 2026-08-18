// Backend/controllers/postController.js

const Post = require("../models/Post");

const createPost = async (req, res) => {
    try {
        const {
            title,
            content,
            image,
            category
        } = req.body;

        if (!title || !content || !category) {
            return res.status(400).json({
                success: false,
                message:
                    "Title, content and category are required"
            });
        }

        const post = await Post.create({
            title: title.trim(),
            content: content.trim(),
            image: image?.trim() || "",
            category: category.trim(),
            author: req.user.id
        });

        const populatedPost =
            await post.populate(
                "author",
                "name email"
            );

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: populatedPost
        });
    } catch (error) {
        console.error(
            "Create post error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to create post"
        });
    }
};

const getPosts = async (req, res) => {
    try {
        const page = Math.max(
            Number(req.query.page) || 1,
            1
        );

        const limit = Math.min(
            Math.max(
                Number(req.query.limit) || 6,
                1
            ),
            50
        );

        const skip =
            (page - 1) * limit;

        const [
            posts,
            totalPosts
        ] = await Promise.all([
            Post.find()
                .populate(
                    "author",
                    "name email role"
                )
                .sort({
                    createdAt: -1
                })
                .skip(skip)
                .limit(limit),

            Post.countDocuments()
        ]);

        return res.status(200).json({
            success: true,
            data: posts,
            pagination: {
                page,
                limit,
                totalPosts,
                totalPages:
                    Math.ceil(
                        totalPosts / limit
                    )
            }
        });
    } catch (error) {
        console.error(
            "Get posts error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch posts"
        });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(
            req.params.id
        ).populate(
            "author",
            "name email role"
        );

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: post
        });
    } catch (error) {
        console.error(
            "Get post error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch post"
        });
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(
            req.params.id
        );

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        const isOwner =
            post.author.toString() ===
            req.user.id;

        const isAdmin =
            req.user.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not allowed to edit this post"
            });
        }

        const allowedFields = [
            "title",
            "content",
            "image",
            "category"
        ];

        allowedFields.forEach((field) => {
            if (
                req.body[field] !== undefined
            ) {
                post[field] =
                    typeof req.body[field] ===
                    "string"
                        ? req.body[field].trim()
                        : req.body[field];
            }
        });

        await post.save();

        const updatedPost =
            await post.populate(
                "author",
                "name email role"
            );

        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: updatedPost
        });
    } catch (error) {
        console.error(
            "Update post error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to update post"
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(
            req.params.id
        );

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        const isOwner =
            post.author.toString() ===
            req.user.id;

        const isAdmin =
            req.user.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not allowed to delete this post"
            });
        }

        await post.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });
    } catch (error) {
        console.error(
            "Delete post error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to delete post"
        });
    }
};

const getAdminPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate(
                "author",
                "name email role"
            )
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        });
    } catch (error) {
        console.error(
            "Admin posts error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch admin posts"
        });
    }
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    getAdminPosts
};