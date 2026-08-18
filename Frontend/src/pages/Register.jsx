import { useState } from "react";
import { ArrowRight, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
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

            await register(formData);

            navigate("/dashboard");
        } catch (requestError) {
            setError(
                requestError.response?.data
                    ?.message ||
                    "Unable to create account."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <main className="auth-page">
                <section className="auth-card">
                    <div className="auth-icon">
                        <UserPlus size={22} />
                    </div>

                    <p className="eyebrow">
                        JOIN BLOGSPACE
                    </p>

                    <h1>
                        Create your account
                    </h1>

                    <p className="auth-subtitle">
                        Start reading, writing and
                        sharing your ideas.
                    </p>

                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                    >
                        <label>
                            Full name

                            <input
                                type="text"
                                name="name"
                                value={
                                    formData.name
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Your name"
                                required
                            />
                        </label>

                        <label>
                            Email address

                            <input
                                type="email"
                                name="email"
                                value={
                                    formData.email
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="you@example.com"
                                required
                            />
                        </label>

                        <label>
                            Password

                            <input
                                type="password"
                                name="password"
                                value={
                                    formData.password
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Minimum 6 characters"
                                minLength={6}
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
                            className="primary-button auth-submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating..."
                                : "Create Account"}

                            <ArrowRight
                                size={17}
                            />
                        </button>
                    </form>

                    <p className="auth-switch">
                        Already have an account?{" "}
                        <Link to="/login">
                            Sign in
                        </Link>
                    </p>
                </section>
            </main>
        </>
    );
};

export default Register;