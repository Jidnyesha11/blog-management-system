// Frontend/src/App.jsx

import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/posts"
                    element={<Posts />}
                />

                <Route
                    path="/posts/:id"
                    element={<PostDetails />}
                />

                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/posts/create"
                        element={<CreatePost />}
                    />

                    <Route
                        path="/posts/edit/:id"
                        element={<EditPost />}
                    />

                    <Route
                        path="/admin"
                        element={<AdminDashboard />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;