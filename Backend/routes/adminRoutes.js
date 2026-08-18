// Backend/routes/adminRoutes.js

const express = require("express");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const {
    getAdminStats,
    getAllUsers,
    updateUserRole,
    deleteUser
} = require("../controllers/adminController");

const {
    getAdminPosts
} = require("../controllers/postController");

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.get(
    "/stats",
    getAdminStats
);

router.get(
    "/users",
    getAllUsers
);

router.put(
    "/users/:id/role",
    updateUserRole
);

router.delete(
    "/users/:id",
    deleteUser
);

router.get(
    "/posts",
    getAdminPosts
);

module.exports = router;