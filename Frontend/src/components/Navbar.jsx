import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut, PenLine, UserRound, ShieldCheck} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="brand">
                    BlogSpace
                </Link>

                <nav className="nav-links">
                    <NavLink to="/" end>
                        Home
                    </NavLink>

                    <NavLink to="/posts">
                        Blogs
                    </NavLink>

                    {isAuthenticated && (
                        <NavLink to="/dashboard">
                            Dashboard
                        </NavLink>
                    )}

                    {user?.role === "admin" && (
                        <NavLink to="/admin">
                            <ShieldCheck size={16} />
                            Admin
                        </NavLink>
                    )}

                    <NavLink to="/profile">
                        <UserRound size={16} />
                        Profile
                    </NavLink>
                </nav>

                <div className="nav-actions">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/posts/create"
                                className="nav-create"
                            >
                                <PenLine size={16} />
                                Write
                            </Link>

                            <button
                                type="button"
                                className="user-menu"
                                onClick={handleLogout}
                                title="Logout"
                            >
                                <UserRound size={17} />
                                <span>{user?.name}</span>
                                <LogOut size={15} />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="nav-login"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="nav-register"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;