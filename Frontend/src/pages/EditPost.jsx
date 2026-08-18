import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import Navbar from "../components/Navbar";
import {
    getPostById,
    updatePost
} from "../services/postService";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        image: "",
        content: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPost = async () => {
            try {
                const response =
                    await getPostById(id);

                const post =
                    response.data.data;

                setFormData({
                    title: post.title || "",
                    category:
                        post.category || "",
                    image: post.image || "",
                    content:
                        post.content || ""
                });
            } catch (requestError) {
                setError(
                    requestError.response?.data
                        ?.message ||
                        "Unable to load post."
                );
            } finally {
                setLoading(false);
            }
        };

        loadPost();
    }, [id]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]:
                event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");

            await updatePost(
                id,
                formData
            );

            navigate(`/posts/${id}`);
        } catch (requestError) {
            setError(
                requestError.response?.data
                    ?.message ||
                    "Unable to update post."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />

                <div className="loading-state page-loading">
                    Loading editor...
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="editor-page">
                <div className="editor-header">
                    <Link
                        to={`/posts/${id}`}
                        className="back-link"
                    >
                        <ArrowLeft size={16} />
                        Back to Post
                    </Link>

                    <p className="eyebrow">
                        EDIT STORY
                    </p>

                    <h1>
                        Refine your story.
                    </h1>
                </div>

                <form
                    className="editor-form"
                    onSubmit={handleSubmit}
                >
                    <label>
                        Title

                        <input
                            type="text"
                            name="title"
                            value={
                                formData.title
                            }
                            onChange={
                                handleChange
                            }
                            required
                        />
                    </label>

                    <div className="editor-grid">
                        <label>
                            Category

                            <input
                                type="text"
                                name="category"
                                value={
                                    formData.category
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />
                        </label>

                        <label>
                            Cover image URL

                            <input
                                type="url"
                                name="image"
                                value={
                                    formData.image
                                }
                                onChange={
                                    handleChange
                                }
                            />
                        </label>
                    </div>

                    <label>
                        Content

                        <textarea
                            name="content"
                            value={
                                formData.content
                            }
                            onChange={
                                handleChange
                            }
                            rows="18"
                            required
                        />
                    </label>

                    {error && (
                        <div className="form-error">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="primary-button editor-submit"
                        disabled={saving}
                    >
                        <Save size={17} />

                        {saving
                            ? "Saving..."
                            : "Save Changes"}
                    </button>
                </form>
            </main>
        </>
    );
};

export default EditPost;