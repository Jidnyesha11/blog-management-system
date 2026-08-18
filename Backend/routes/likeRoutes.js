// Backend/routes/likeRoutes.js

const express = require("express");

const {
    protect
} = require("../middleware/authMiddleware");

const {
    toggleLike,
    getLikeStatus
} = require("../controllers/likeController");

const router = express.Router();

router.post(
    "/:postId",
    protect,
    toggleLike
);

router.get(
    "/:postId",
    protect,
    getLikeStatus
);

module.exports = router;