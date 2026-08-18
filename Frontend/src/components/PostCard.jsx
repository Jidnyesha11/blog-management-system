import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const PostCard = ({ post }) => {
    const image =
        post.image ||
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80";

    const excerpt =
        post.content?.length > 130
            ? `${post.content.slice(0, 130)}...`
            : post.content;

    return (
        <article className="post-card">
            <Link
                to={`/posts/${post._id}`}
                className="post-image-link"
            >
                <img
                    src={image}
                    alt={post.title}
                    className="post-image"
                />
            </Link>

            <div className="post-card-content">
                <div className="post-meta">
                    <span>{post.category}</span>

                    <span>
                        {new Date(
                            post.createdAt
                        ).toLocaleDateString()}
                    </span>
                </div>

                <Link
                    to={`/posts/${post._id}`}
                    className="post-title"
                >
                    {post.title}
                </Link>

                <p className="post-excerpt">
                    {excerpt}
                </p>

                <div className="post-footer">
                    <span>
                        By{" "}
                        <strong>
                            {post.author?.name ||
                                "Author"}
                        </strong>
                    </span>

                    <Link
                        to={`/posts/${post._id}`}
                        className="read-link"
                    >
                        Read
                        <ArrowUpRight size={16} />
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default PostCard;