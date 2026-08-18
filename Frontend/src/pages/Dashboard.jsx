import { useEffect, useState } from "react";
import {
    ArrowRight,
    FileText,
    Plus,
    Trash2
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import {
    deletePost,
    getPosts
} from "../services/postService";

const Dashboard = () => {
    const { user } = useAuth();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            return undefined;
        }

        let cancelled = false;

        getPosts()
            .then((response) => {
                if (cancelled) {
                    return;
                }

                const allPosts =
                    response.data.data || [];

                const ownPosts =
                    user.role === "admin"
                        ? allPosts
                        : allPosts.filter(
                              (post) =>
                                  post.author?._id ===
                                  user.id
                          );

                setPosts(ownPosts);
            })
            .catch((error) => {
                if (!cancelled) {
                    console.error(
                        "Failed to load dashboard:",
                        error
                    );
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [user]);

    const handleDelete = async (id) => {
        const confirmed =
            window.confirm(
                "Delete this post?"
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
        } catch (error) {
            alert(
                error.response?.data
                    ?.message ||
                    "Unable to delete post."
            );
        }
    };

    return (
        <>
            <Navbar />

            <main className="dashboard-page">
                <section className="dashboard-header">
                    <div>
                        <p className="eyebrow">
                            DASHBOARD
                        </p>

                        <h1>
                            Welcome,{" "}
                            {user?.name}.
                        </h1>

                        <p>
                            Manage your stories and
                            keep sharing your ideas.
                        </p>
                    </div>

                    <Link
                        to="/posts/create"
                        className="primary-button"
                    >
                        <Plus size={17} />
                        New Story
                    </Link>
                </section>

                <section className="stats-grid">
                    <div className="stat-card">
                        <FileText size={22} />

                        <span>
                            Total Posts
                        </span>

                        <strong>
                            {posts.length}
                        </strong>
                    </div>

                    <div className="stat-card">
                        <span>
                            Role
                        </span>

                        <strong className="role-text">
                            {user?.role}
                        </strong>
                    </div>
                </section>

                <section className="dashboard-posts">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">
                                YOUR STORIES
                            </p>

                            <h2>
                                Published posts
                            </h2>
                        </div>
                    </div>

                    {loading ? (
                        <div className="loading-state">
                            Loading posts...
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="empty-state">
                            <h3>
                                No posts yet
                            </h3>

                            <p>
                                Publish your first
                                story to see it here.
                            </p>

                            <Link
                                to="/posts/create"
                                className="primary-button"
                            >
                                Create Story
                            </Link>
                        </div>
                    ) : (
                        <div className="dashboard-list">
                            {posts.map(
                                (post) => (
                                    <div
                                        className="dashboard-post"
                                        key={
                                            post._id
                                        }
                                    >
                                        <div>
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
                                                {new Date(
                                                    post.createdAt
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>

                                        <div className="dashboard-actions">
                                            <Link
                                                to={`/posts/${post._id}`}
                                            >
                                                View
                                                <ArrowRight
                                                    size={
                                                        15
                                                    }
                                                />
                                            </Link>

                                            <Link
                                                to={`/posts/edit/${post._id}`}
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(
                                                        post._id
                                                    )
                                                }
                                                aria-label="Delete post"
                                            >
                                                <Trash2
                                                    size={
                                                        16
                                                    }
                                                />
                                            </button>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </section>
            </main>
        </>
    );
};

export default Dashboard;