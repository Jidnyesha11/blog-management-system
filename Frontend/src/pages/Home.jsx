import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { getPosts } from "../services/postService";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const response = await getPosts();
                setPosts(response.data.data || []);
            } catch (error) {
                console.error(
                    "Failed to load posts:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    return (
        <>
            <Navbar />

            <main>
                <section className="hero">
                    <div className="hero-content">
                        <div className="hero-label">
                            <Sparkles size={15} />
                            Ideas worth sharing
                        </div>

                        <h1>
                            Stories that make
                            <span> you think.</span>
                        </h1>

                        <p>
                            Discover thoughtful articles,
                            practical knowledge and fresh
                            perspectives from our community
                            of writers.
                        </p>

                        <div className="hero-actions">
                            <Link
                                to="/posts"
                                className="primary-button"
                            >
                                Explore Blogs
                                <ArrowRight size={18} />
                            </Link>

                            <Link
                                to="/register"
                                className="secondary-button"
                            >
                                Start Writing
                            </Link>
                        </div>
                    </div>

                    <div className="hero-decoration">
                        <div className="hero-orb hero-orb-one" />
                        <div className="hero-orb hero-orb-two" />

                        <div className="hero-card">
                            <span>01</span>
                            <strong>
                                Read. Learn.
                                <br />
                                Create.
                            </strong>
                        </div>
                    </div>
                </section>

                <section className="featured-section">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">
                                LATEST STORIES
                            </p>

                            <h2>
                                Fresh from the
                                community
                            </h2>
                        </div>

                        <Link
                            to="/posts"
                            className="section-link"
                        >
                            View all
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="loading-state">
                            Loading stories...
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="empty-state">
                            <h3>
                                No posts yet
                            </h3>

                            <p>
                                Be the first person to
                                publish a story.
                            </p>

                            <Link
                                to="/posts/create"
                                className="primary-button"
                            >
                                Create a Post
                            </Link>
                        </div>
                    ) : (
                        <div className="post-grid">
                            {posts
                                .slice(0, 6)
                                .map((post) => (
                                    <PostCard
                                        key={post._id}
                                        post={post}
                                    />
                                ))}
                        </div>
                    )}
                </section>
            </main>
        </>
    );
};

export default Home;