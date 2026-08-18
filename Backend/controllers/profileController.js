// Backend/controllers/profileController.js

const bcrypt = require("bcryptjs");

const User = require("../models/User");

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(
            req.user.id
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error(
            "Get profile error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch profile"
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const {
            name,
            email
        } = req.body;

        const user = await User.findById(
            req.user.id
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (name) {
            user.name = name.trim();
        }

        if (email) {
            const existingUser =
                await User.findOne({
                    email:
                        email.toLowerCase(),
                    _id: {
                        $ne: user._id
                    }
                });

            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message:
                        "Email is already in use"
                });
            }

            user.email =
                email.toLowerCase().trim();
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message:
                "Profile updated successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(
            "Update profile error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to update profile"
        });
    }
};

const changePassword = async (
    req,
    res
) => {
    try {
        const {
            currentPassword,
            newPassword
        } = req.body;

        if (
            !currentPassword ||
            !newPassword
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Current and new passwords are required"
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message:
                    "New password must contain at least 6 characters"
            });
        }

        const user = await User.findById(
            req.user.id
        ).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const matches =
            await bcrypt.compare(
                currentPassword,
                user.password
            );

        if (!matches) {
            return res.status(401).json({
                success: false,
                message:
                    "Current password is incorrect"
            });
        }

        user.password =
            await bcrypt.hash(
                newPassword,
                12
            );

        await user.save();

        return res.status(200).json({
            success: true,
            message:
                "Password changed successfully"
        });
    } catch (error) {
        console.error(
            "Change password error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to change password"
        });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    changePassword
};