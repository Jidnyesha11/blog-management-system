import { useEffect, useState } from "react";
import {
    Edit3,
    FileText,
    ShieldCheck,
    Trash2,
    Users
} from "lucide-react";
import {
    Link,
    useNavigate
} from "react-router-dom";

import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

import {
    deleteUser,
    getAdminPosts,
    getAdminStats,
    getAllUsers,
    updateUserRole
} from "../services/adminService";

import {
    deletePost
} from "../services/postService";

const AdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalPosts: 0,
        adminUsers: 0
    });

    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.role !== "admin") {
            navigate("/dashboard", {
                replace: true
            });

            return;
        }

        const loadAdminData = async () => {
            try {
                const [
                    statsResponse,
                    usersResponse,
                    postsResponse
                ] = await Promise.all([
                    getAdminStats(),
                    getAllUsers(),
                    getAdminPosts()
                ]);

                setStats(
                    statsResponse.data.data
                );

                setUsers(
                    usersResponse.data.data
                );

                setPosts(
                    postsResponse.data.data
                );
            } catch (error) {
                console.error(
                    "Admin data error:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadAdminData();
    }, [user, navigate]);

    const handleRoleChange = async (
        id,
        role
    ) => {
        try {
            const response =
                await updateUserRole(
                    id,
                    role
                );

            const updatedUser =
                response.data.data;

            setUsers((currentUsers) =>
                currentUsers.map(
                    (currentUser) =>
                        currentUser._id === id
                            ? {
                                  ...currentUser,
                                  role: updatedUser.role
                              }
                            : currentUser
                )
            );
        } catch (error) {
            alert(
                error.response?.data
                    ?.message ||
                    "Unable to update role."
            );
        }
    };

    const handleDeleteUser = async (
        id
    ) => {
        const confirmed =
            window.confirm(
                "Delete this user?"
            );

        if (!confirmed) {
            return;
        }

        try {
            await deleteUser(id);

            setUsers((currentUsers) =>
                currentUsers.filter(
                    (item) =>
                        item._id !== id
                )
            );

            setStats((currentStats) => ({
                ...currentStats,
                totalUsers:
                    currentStats.totalUsers - 1
            }));
        } catch (error) {
            alert(
                error.response?.data
                    ?.message ||
                    "Unable to delete user."
            );
        }
    };

    const handleDeletePost = async (
        id
    ) => {
        const confirmed =
            window.confirm(
                "Delete this blog post?"
            );

        if (!confirmed) {
            return;
        }

        try {
            await deletePost(id);

            setPosts((currentPosts) =>
                currentPosts.filter(
                    (post) =>
                        post._id !== id
                )
            );

            setStats((currentStats) => ({
                ...currentStats,
                totalPosts:
                    currentStats.totalPosts - 1
            }));
        } catch (error) {
            alert(
                error.response?.data
                    ?.message ||
                    "Unable to delete post."
            );
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />

                <div className="loading-state page-loading">
                    Loading admin dashboard...
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="admin-page">
                <section className="admin-header">
                    <div>
                        <div className="admin-title">
                            <ShieldCheck
                                size={22}
                            />

                            <span>
                                ADMIN PANEL
                            </span>
                        </div>

                        <h1>
                            Control center.
                        </h1>

                        <p>
                            Manage users, posts and
                            your BlogSpace platform.
                        </p>
                    </div>
                </section>

                <section className="admin-stats">
                    <div className="admin-stat">
                        <Users size={21} />

                        <span>
                            Total Users
                        </span>

                        <strong>
                            {stats.totalUsers}
                        </strong>
                    </div>

                    <div className="admin-stat">
                        <FileText size={21} />

                        <span>
                            Total Posts
                        </span>

                        <strong>
                            {stats.totalPosts}
                        </strong>
                    </div>

                    <div className="admin-stat">
                        <ShieldCheck size={21} />

                        <span>
                            Admins
                        </span>

                        <strong>
                            {stats.adminUsers}
                        </strong>
                    </div>
                </section>

                <section className="admin-users">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">
                                USER MANAGEMENT
                            </p>

                            <h2>
                                Registered users
                            </h2>
                        </div>
                    </div>

                    <div className="users-table">
                        <div className="user-row user-row-header">
                            <span>User</span>
                            <span>Email</span>
                            <span>Role</span>
                            <span>Actions</span>
                        </div>

                        {users.map(
                            (item) => (
                                <div
                                    className="user-row"
                                    key={
                                        item._id
                                    }
                                >
                                    <div className="user-info">
                                        <div className="user-avatar">
                                            {item.name
                                                .charAt(
                                                    0
                                                )
                                                .toUpperCase()}
                                        </div>

                                        <strong>
                                            {
                                                item.name
                                            }
                                        </strong>
                                    </div>

                                    <span className="user-email">
                                        {
                                            item.email
                                        }
                                    </span>

                                    <select
                                        value={
                                            item.role
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            handleRoleChange(
                                                item._id,
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                    >
                                        <option value="user">
                                            User
                                        </option>

                                        <option value="admin">
                                            Admin
                                        </option>
                                    </select>

                                    <button
                                        type="button"
                                        className="delete-user"
                                        disabled={
                                            item._id ===
                                            user?.id
                                        }
                                        onClick={() =>
                                            handleDeleteUser(
                                                item._id
                                            )
                                        }
                                    >
                                        <Trash2
                                            size={
                                                16
                                            }
                                        />
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                </section>

                <section className="admin-users admin-posts-section">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">
                                CONTENT MANAGEMENT
                            </p>

                            <h2>
                                All blog posts
                            </h2>
                        </div>
                    </div>

                    <div className="admin-post-list">
                        {posts.length === 0 ? (
                            <div className="empty-state">
                                <h3>
                                    No posts yet
                                </h3>
                            </div>
                        ) : (
                            posts.map(
                                (post) => (
                                    <div
                                        className="admin-post-row"
                                        key={
                                            post._id
                                        }
                                    >
                                        <div className="admin-post-info">
                                            <span>
                                                {
                                                    post.category
                                                }
                                            </span>

                                            <h3>
                                                {
                                                    post.title
                                                }
                                            </h3>

                                            <p>
                                                By{" "}
                                                {post
                                                    .author
                                                    ?.name ||
                                                    "Unknown"}
                                            </p>
                                        </div>

                                        <div className="admin-post-actions">
                                            <Link
                                                to={`/posts/${post._id}`}
                                            >
                                                View
                                            </Link>

                                            <Link
                                                to={`/posts/edit/${post._id}`}
                                            >
                                                <Edit3
                                                    size={
                                                        15
                                                    }
                                                />
                                                Edit
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDeletePost(
                                                        post._id
                                                    )
                                                }
                                            >
                                                <Trash2
                                                    size={
                                                        15
                                                    }
                                                />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )
                            )
                        )}
                    </div>
                </section>
            </main>
        </>
    );
};

export default AdminDashboard;