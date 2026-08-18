import { useEffect, useState } from "react";
import {
    Lock,
    Save,
    UserRound
} from "lucide-react";

import Navbar from "../components/Navbar";
import {
    changePassword,
    getProfile,
    updateProfile
} from "../services/profileService";

const Profile = () => {
    const [profile, setProfile] =
        useState({
            name: "",
            email: ""
        });

    const [
        passwordData,
        setPasswordData
    ] = useState({
        currentPassword: "",
        newPassword: ""
    });

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const loadProfile =
            async () => {
                try {
                    const response =
                        await getProfile();

                    setProfile({
                        name:
                            response.data.data
                                .name,
                        email:
                            response.data.data
                                .email
                    });
                } catch (requestError) {
                    setError(
                        requestError
                            .response?.data
                            ?.message ||
                            "Unable to load profile."
                    );
                } finally {
                    setLoading(false);
                }
            };

        loadProfile();
    }, []);

    const handleProfileChange = (
        event
    ) => {
        setProfile({
            ...profile,
            [event.target.name]:
                event.target.value
        });
    };

    const handlePasswordChange = (
        event
    ) => {
        setPasswordData({
            ...passwordData,
            [event.target.name]:
                event.target.value
        });
    };

    const handleProfileSubmit =
        async (event) => {
            event.preventDefault();

            try {
                setError("");
                setMessage("");

                const response =
                    await updateProfile(
                        profile
                    );

                setMessage(
                    response.data.message
                );

                localStorage.setItem(
                    "blog_user",
                    JSON.stringify(
                        response.data.data
                    )
                );
            } catch (requestError) {
                setError(
                    requestError
                        .response?.data
                        ?.message ||
                        "Unable to update profile."
                );
            }
        };

    const handlePasswordSubmit =
        async (event) => {
            event.preventDefault();

            try {
                setError("");
                setMessage("");

                const response =
                    await changePassword(
                        passwordData
                    );

                setMessage(
                    response.data.message
                );

                setPasswordData({
                    currentPassword: "",
                    newPassword: ""
                });
            } catch (requestError) {
                setError(
                    requestError
                        .response?.data
                        ?.message ||
                        "Unable to change password."
                );
            }
        };

    if (loading) {
        return (
            <>
                <Navbar />

                <div className="loading-state page-loading">
                    Loading profile...
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="profile-page">
                <section className="profile-header">
                    <div className="profile-avatar">
                        {profile.name
                            .charAt(0)
                            .toUpperCase()}
                    </div>

                    <div>
                        <p className="eyebrow">
                            YOUR PROFILE
                        </p>

                        <h1>
                            Account settings
                        </h1>

                        <p>
                            Manage your personal
                            information and
                            password.
                        </p>
                    </div>
                </section>

                {message && (
                    <div className="success-message">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="form-error">
                        {error}
                    </div>
                )}

                <div className="profile-grid">
                    <section className="profile-card">
                        <div className="profile-card-title">
                            <UserRound
                                size={19}
                            />

                            <h2>
                                Personal
                                information
                            </h2>
                        </div>

                        <form
                            className="auth-form"
                            onSubmit={
                                handleProfileSubmit
                            }
                        >
                            <label>
                                Name

                                <input
                                    name="name"
                                    value={
                                        profile.name
                                    }
                                    onChange={
                                        handleProfileChange
                                    }
                                    required
                                />
                            </label>

                            <label>
                                Email

                                <input
                                    type="email"
                                    name="email"
                                    value={
                                        profile.email
                                    }
                                    onChange={
                                        handleProfileChange
                                    }
                                    required
                                />
                            </label>

                            <button
                                className="primary-button"
                                type="submit"
                            >
                                <Save size={16} />
                                Save Profile
                            </button>
                        </form>
                    </section>

                    <section className="profile-card">
                        <div className="profile-card-title">
                            <Lock size={19} />

                            <h2>
                                Change password
                            </h2>
                        </div>

                        <form
                            className="auth-form"
                            onSubmit={
                                handlePasswordSubmit
                            }
                        >
                            <label>
                                Current password

                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={
                                        passwordData.currentPassword
                                    }
                                    onChange={
                                        handlePasswordChange
                                    }
                                    required
                                />
                            </label>

                            <label>
                                New password

                                <input
                                    type="password"
                                    name="newPassword"
                                    value={
                                        passwordData.newPassword
                                    }
                                    onChange={
                                        handlePasswordChange
                                    }
                                    minLength={6}
                                    required
                                />
                            </label>

                            <button
                                className="primary-button"
                                type="submit"
                            >
                                <Lock size={16} />
                                Change Password
                            </button>
                        </form>
                    </section>
                </div>
            </main>
        </>
    );
};

export default Profile;