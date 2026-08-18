import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { createPost } from "../services/postService";

const CreatePost = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        image: "",
        content: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            setError("");

            const response =
                await createPost(formData);

            navigate(
                `/posts/${response.data.data._id}`
            );
        } catch (requestError) {
            setError(
                requestError.response?.data
                    ?.message ||
                    "Unable to create post."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <main className="editor-page">
                <div className="editor-header">
                    <Link
                        to="/dashboard"
                        className="back-link"
                    >
                        <ArrowLeft size={16} />
                        Dashboard
                    </Link>

                    <p className="eyebrow">
                        NEW STORY
                    </p>

                    <h1>
                        Share something
                        meaningful.
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
                            placeholder="Give your story a title..."
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
                                placeholder="Technology"
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
                                placeholder="https://..."
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
                            placeholder="Start writing your story..."
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
                        disabled={loading}
                    >
                        <Send size={17} />

                        {loading
                            ? "Publishing..."
                            : "Publish Story"}
                    </button>
                </form>
            </main>
        </>
    );
};

export default CreatePost;