// Backend/routes/commentRoutes.js

const express = require("express");

const {
    protect
} = require("../middleware/authMiddleware");

const {
    createComment,
    getComments,
    deleteComment
} = require("../controllers/commentController");

const router = express.Router();

router.get(
    "/post/:postId",
    getComments
);

router.post(
    "/post/:postId",
    protect,
    createComment
);

router.delete(
    "/:id",
    protect,
    deleteComment
);

module.exports = router;