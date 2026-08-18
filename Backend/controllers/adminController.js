// Backend/controllers/adminController.js

const User = require("../models/User");
const Post = require("../models/Post");

const getAdminStats = async (req, res) => {
    try {
        const [
            totalUsers,
            totalPosts,
            adminUsers
        ] = await Promise.all([
            User.countDocuments(),
            Post.countDocuments(),
            User.countDocuments({
                role: "admin"
            })
        ]);

        return res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalPosts,
                adminUsers
            }
        });
    } catch (error) {
        console.error(
            "Admin stats error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch admin statistics"
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error(
            "Get users error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch users"
        });
    }
};

const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;

        if (!["user", "admin"].includes(role)) {
            return res.status(400).json({
                success: false,
                message:
                    "Role must be user or admin"
            });
        }

        const user = await User.findById(
            req.params.id
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.role = role;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "User role updated successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(
            "Update role error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to update user role"
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        if (
            req.user.id === req.params.id
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "You cannot delete your own admin account"
            });
        }

        const user = await User.findById(
            req.params.id
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await user.deleteOne();

        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error(
            "Delete user error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to delete user"
        });
    }
};

module.exports = {
    getAdminStats,
    getAllUsers,
    updateUserRole,
    deleteUser
};