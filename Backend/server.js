// Backend/server.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const adminRoutes = require("./routes/adminRoutes");
const profileRoutes =
    require("./routes/profileRoutes");
const commentRoutes =
    require("./routes/commentRoutes");

const likeRoutes =
    require("./routes/likeRoutes");

const {
    notFound,
    errorHandler
} = require("./middleware/errorMiddleware");

const app = express();

connectDB();

app.disable("x-powered-by");

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true
    })
);

app.use(express.json({ limit: "1mb" }));
app.use(
    express.urlencoded({
        extended: true,
        limit: "1mb"
    })
);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message:
            "Blog Management API is running"
    });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is healthy",
        timestamp: new Date().toISOString()
    });
});

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/posts",
    postRoutes
);

app.use(
    "/api/admin",
    adminRoutes
);

app.use(
    "/api/profile",
    profileRoutes
);

app.use(
    "/api/comments",
    commentRoutes
);

app.use(
    "/api/likes",
    likeRoutes
);

app.use(notFound);

app.use(errorHandler);

const PORT =
    process.env.PORT || 5000;

app.listen(
    PORT,
    () => {
        console.log(
            `Server running on http://localhost:${PORT}`
        );
    }
);