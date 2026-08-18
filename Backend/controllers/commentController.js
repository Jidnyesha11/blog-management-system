// Backend/controllers/commentController.js

const Comment = require("../models/Comment");

const createComment = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Comment cannot be empty"
            });
        }

        const comment = await Comment.create({
            content: content.trim(),
            post: req.params.postId,
            author: req.user.id
        });

        const populatedComment =
            await comment.populate(
                "author",
                "name email"
            );

        return res.status(201).json({
            success: true,
            message: "Comment added successfully",
            data: populatedComment
        });
    } catch (error) {
        console.error(
            "Create comment error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to create comment"
        });
    }
};

const getComments = async (req, res) => {
    try {
        const comments =
            await Comment.find({
                post: req.params.postId
            })
                .populate(
                    "author",
                    "name email"
                )
                .sort({
                    createdAt: -1
                });

        return res.status(200).json({
            success: true,
            count: comments.length,
            data: comments
        });
    } catch (error) {
        console.error(
            "Get comments error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch comments"
        });
    }
};

const deleteComment = async (req, res) => {
    try {
        const comment =
            await Comment.findById(
                req.params.id
            );

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        const isOwner =
            comment.author.toString() ===
            req.user.id;

        const isAdmin =
            req.user.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not allowed to delete this comment"
            });
        }

        await comment.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        });
    } catch (error) {
        console.error(
            "Delete comment error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to delete comment"
        });
    }
};

module.exports = {
    createComment,
    getComments,
    deleteComment
};