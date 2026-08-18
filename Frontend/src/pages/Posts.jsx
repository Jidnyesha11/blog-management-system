import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { getPosts } from "../services/postService";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
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

    const categories = useMemo(() => {
        return [
            "All",
            ...new Set(
                posts
                    .map((post) => post.category)
                    .filter(Boolean)
            )
        ];
    }, [posts]);

    const filteredPosts = useMemo(() => {
        const query = search
            .trim()
            .toLowerCase();

        return posts.filter((post) => {
            const matchesSearch =
                !query ||
                post.title
                    ?.toLowerCase()
                    .includes(query) ||
                post.content
                    ?.toLowerCase()
                    .includes(query);

            const matchesCategory =
                category === "All" ||
                post.category === category;

            return (
                matchesSearch &&
                matchesCategory
            );
        });
    }, [posts, search, category]);

    return (
        <>
            <Navbar />

            <main className="page-shell">
                <section className="page-heading">
                    <p className="eyebrow">
                        THE BLOG
                    </p>

                    <h1>
                        Explore ideas.
                    </h1>

                    <p>
                        Find stories, tutorials and
                        perspectives from our writers.
                    </p>
                </section>

                <section className="filter-bar">
                    <div className="search-box">
                        <Search size={18} />

                        <input
                            type="search"
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            placeholder="Search articles..."
                        />
                    </div>

                    <div className="category-filter">
                        <SlidersHorizontal size={17} />

                        <select
                            value={category}
                            onChange={(event) =>
                                setCategory(
                                    event.target.value
                                )
                            }
                        >
                            {categories.map(
                                (item) => (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                </section>

                {loading ? (
                    <div className="loading-state">
                        Loading posts...
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="empty-state">
                        <h3>
                            No articles found
                        </h3>

                        <p>
                            Try another search or
                            category.
                        </p>
                    </div>
                ) : (
                    <section className="post-grid">
                        {filteredPosts.map(
                            (post) => (
                                <PostCard
                                    key={post._id}
                                    post={post}
                                />
                            )
                        )}
                    </section>
                )}
            </main>
        </>
    );
};

export default Posts;