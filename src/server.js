const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./db/dbConnect");
const authRouter = require("./routers/authRouter");
const cookieParser = require("cookie-parser");
const postsRouter = require("./routers/postsRouter");

dotenv.config({ path: "./src/.env" });

dbConnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api", postsRouter);
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});