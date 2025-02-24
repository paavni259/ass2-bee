const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3333;

// log request details
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} Request to ${req.url}`);
    next();
});


app.use(express.urlencoded({ extended: true })); 
app.use(express.json());


app.use(express.static("public"));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const postsFile = path.join(__dirname, "posts.json");


// const readPosts = () => {
//     if (!fs.existsSync(postsFile)) return [];
//     const data = fs.readFileSync(postsFile);
//     return JSON.parse(data);
// };

const readPosts = () => {
    if (!fs.existsSync(postsFile)) return []; // If file doesn't exist, return an empty array
    try {
        const data = fs.readFileSync(postsFile, "utf-8");
        return data.trim() ? JSON.parse(data) : [];
    } catch (err) {
        console.error("Error reading posts.json:", err);
        return []; // Return an empty array in case of an error
    }
};



const writePosts = (posts) => {
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
};

// GET /posts
app.get("/posts", (req, res) => {
    const posts = readPosts();
    res.render("home", { posts, title: "All Blog Posts" });
});

// GET /post?id=1
app.get("/post", (req, res) => {
    const postId = req.query.id;
    const posts = readPosts();
    const post = posts.find(p => p.id === parseInt(postId));
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("post", { post, title: post.title });
});

// GET /add-post
app.get("/add-post", (req, res) => {
    res.render("addpost", { title: "Add a New Post" });
});

// POST /add-post 
app.post("/add-post", (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).send("Title and content are required");
    }
    
    const posts = readPosts();
    const newPost = {
        id: posts.length ? posts[posts.length - 1].id + 1 : 1,
        title,
        content,
        date: new Date().toISOString()
    };
    posts.push(newPost);
    writePosts(posts);
    
    res.redirect("/posts");
});

app.listen(PORT, () => {
    console.log("Server is running");
});
