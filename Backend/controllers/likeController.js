// Backend/controllers/likeController.js

const Post = require("../models/Post");

const toggleLike = async (req, res) => {
    try {
        const post =
            await Post.findById(
                req.params.postId
            );

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        const userId =
            req.user.id;

        const alreadyLiked =
            post.likes.some(
                (id) =>
                    id.toString() ===
                    userId
            );

        if (alreadyLiked) {
            post.likes =
                post.likes.filter(
                    (id) =>
                        id.toString() !==
                        userId
                );
        } else {
            post.likes.push(userId);
        }

        await post.save();

        return res.status(200).json({
            success: true,
            liked: !alreadyLiked,
            likesCount:
                post.likes.length
        });
    } catch (error) {
        console.error(
            "Toggle like error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to update like"
        });
    }
};

const getLikeStatus = async (
    req,
    res
) => {
    try {
        const post =
            await Post.findById(
                req.params.postId
            ).select("likes");

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        const liked =
            post.likes.some(
                (id) =>
                    id.toString() ===
                    req.user.id
            );

        return res.status(200).json({
            success: true,
            liked,
            likesCount:
                post.likes.length
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch like status"
        });
    }
};

module.exports = {
    toggleLike,
    getLikeStatus
};