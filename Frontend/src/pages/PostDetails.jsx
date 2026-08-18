import { useEffect, useState } from "react";
import {
    ArrowLeft,
    CalendarDays,
    Heart,
    Send,
    Trash2
} from "lucide-react";
import {
    Link,
    useParams
} from "react-router-dom";

import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

import { getPostById } from "../services/postService";

import {
    createComment,
    deleteComment,
    getComments
} from "../services/commentService";

import {
    getLikeStatus,
    toggleLike
} from "../services/likeService";

const PostDetails = () => {
    const { id } = useParams();

    const {
        user,
        isAuthenticated
    } = useAuth();

    const [post, setPost] =
        useState(null);

    const [comments, setComments] =
        useState([]);

    const [commentText, setCommentText] =
        useState("");

    const [liked, setLiked] =
        useState(false);

    const [likesCount, setLikesCount] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [commentLoading, setCommentLoading] =
        useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const postResponse =
                    await getPostById(id);

                setPost(
                    postResponse.data.data
                );

                const commentsResponse =
                    await getComments(id);

                setComments(
                    commentsResponse.data.data
                );

                if (isAuthenticated) {
                    const likeResponse =
                        await getLikeStatus(
                            id
                        );

                    setLiked(
                        likeResponse.data.liked
                    );

                    setLikesCount(
                        likeResponse.data
                            .likesCount
                    );
                } else {
                    setLikesCount(
                        postResponse.data
                            .data.likes?.length ||
                            0
                    );
                }
            } catch (requestError) {
                setError(
                    requestError.response?.data
                        ?.message ||
                        "Unable to load this post."
                );
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id, isAuthenticated]);

    const handleLike = async () => {
        if (!isAuthenticated) {
            return;
        }

        try {
            const response =
                await toggleLike(id);

            setLiked(
                response.data.liked
            );

            setLikesCount(
                response.data.likesCount
            );
        } catch (requestError) {
            console.error(
                "Like error:",
                requestError
            );
        }
    };

    const handleComment = async (
        event
    ) => {
        event.preventDefault();

        if (!commentText.trim()) {
            return;
        }

        try {
            setCommentLoading(true);

            const response =
                await createComment(
                    id,
                    commentText
                );

            setComments((current) => [
                response.data.data,
                ...current
            ]);

            setCommentText("");
        } catch (requestError) {
            alert(
                requestError.response?.data
                    ?.message ||
                    "Unable to add comment."
            );
        } finally {
            setCommentLoading(false);
        }
    };

    const handleDeleteComment =
        async (commentId) => {
            try {
                await deleteComment(
                    commentId
                );

                setComments(
                    (current) =>
                        current.filter(
                            (comment) =>
                                comment._id !==
                                commentId
                        )
                );
            } catch (requestError) {
                alert(
                    requestError.response?.data
                        ?.message ||
                        "Unable to delete comment."
                );
            }
        };

    if (loading) {
        return (
            <>
                <Navbar />

                <div className="loading-state page-loading">
                    Loading article...
                </div>
            </>
        );
    }

    if (error || !post) {
        return (
            <>
                <Navbar />

                <div className="empty-state page-loading">
                    <h3>
                        {error ||
                            "Post not found"}
                    </h3>

                    <Link
                        to="/posts"
                        className="primary-button"
                    >
                        Back to Blogs
                    </Link>
                </div>
            </>
        );
    }

    const image =
        post.image ||
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80";

    return (
        <>
            <Navbar />

            <main className="article-page">
                <Link
                    to="/posts"
                    className="back-link"
                >
                    <ArrowLeft size={16} />
                    Back to Blogs
                </Link>

                <article className="article">
                    <div className="article-meta">
                        <span>
                            {post.category}
                        </span>

                        <span>
                            <CalendarDays
                                size={15}
                            />

                            {new Date(
                                post.createdAt
                            ).toLocaleDateString(
                                undefined,
                                {
                                    dateStyle:
                                        "long"
                                }
                            )}
                        </span>
                    </div>

                    <h1>
                        {post.title}
                    </h1>

                    <p className="article-author">
                        Written by{" "}
                        <strong>
                            {post.author?.name ||
                                "Author"}
                        </strong>
                    </p>

                    <img
                        src={image}
                        alt={post.title}
                        className="article-cover"
                    />

                    <div className="article-content">
                        {post.content
                            .split("\n")
                            .map(
                                (
                                    paragraph,
                                    index
                                ) => (
                                    <p
                                        key={
                                            index
                                        }
                                    >
                                        {
                                            paragraph
                                        }
                                    </p>
                                )
                            )}
                    </div>

                    <div className="article-actions">
                        <button
                            type="button"
                            className={
                                liked
                                    ? "like-button liked"
                                    : "like-button"
                            }
                            onClick={
                                handleLike
                            }
                            disabled={
                                !isAuthenticated
                            }
                            title={
                                isAuthenticated
                                    ? "Like post"
                                    : "Login to like"
                            }
                        >
                            <Heart
                                size={19}
                                fill={
                                    liked
                                        ? "currentColor"
                                        : "none"
                                }
                            />

                            {likesCount}
                        </button>

                        {!isAuthenticated && (
                            <Link
                                to="/login"
                                className="login-to-interact"
                            >
                                Login to like or
                                comment
                            </Link>
                        )}
                    </div>

                    <section className="comments-section">
                        <div className="comments-heading">
                            <div>
                                <p className="eyebrow">
                                    COMMUNITY
                                </p>

                                <h2>
                                    Comments
                                </h2>
                            </div>

                            <span>
                                {
                                    comments.length
                                }
                            </span>
                        </div>

                        {isAuthenticated && (
                            <form
                                className="comment-form"
                                onSubmit={
                                    handleComment
                                }
                            >
                                <textarea
                                    value={
                                        commentText
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        setCommentText(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="Share your thoughts..."
                                    maxLength={500}
                                    rows="4"
                                />

                                <button
                                    type="submit"
                                    className="primary-button"
                                    disabled={
                                        commentLoading ||
                                        !commentText.trim()
                                    }
                                >
                                    <Send
                                        size={16}
                                    />

                                    {commentLoading
                                        ? "Posting..."
                                        : "Comment"}
                                </button>
                            </form>
                        )}

                        <div className="comments-list">
                            {comments.length ===
                            0 ? (
                                <div className="empty-comments">
                                    No comments yet.
                                    Be the first to
                                    share your
                                    thoughts.
                                </div>
                            ) : (
                                comments.map(
                                    (comment) => {
                                        const canDelete =
                                            user &&
                                            (user.id ===
                                                comment
                                                    .author
                                                    ?._id ||
                                                user.role ===
                                                    "admin");

                                        return (
                                            <div
                                                className="comment"
                                                key={
                                                    comment._id
                                                }
                                            >
                                                <div className="comment-avatar">
                                                    {comment
                                                        .author
                                                        ?.name
                                                        ?.charAt(
                                                            0
                                                        )
                                                        .toUpperCase()}
                                                </div>

                                                <div className="comment-body">
                                                    <div className="comment-top">
                                                        <strong>
                                                            {
                                                                comment
                                                                    .author
                                                                    ?.name
                                                            }
                                                        </strong>

                                                        <span>
                                                            {new Date(
                                                                comment.createdAt
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    </div>

                                                    <p>
                                                        {
                                                            comment.content
                                                        }
                                                    </p>

                                                    {canDelete && (
                                                        <button
                                                            type="button"
                                                            className="comment-delete"
                                                            onClick={() =>
                                                                handleDeleteComment(
                                                                    comment._id
                                                                )
                                                            }
                                                        >
                                                            <Trash2
                                                                size={
                                                                    14
                                                                }
                                                            />
                                                            Delete
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    }
                                )
                            )}
                        </div>
                    </section>
                </article>
            </main>
        </>
    );
};

export default PostDetails;