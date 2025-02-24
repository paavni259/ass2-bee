Assignment 2 of Backend Engg.
**Blog Management System (Basic Version) for even roll number**

**Description:**\
Create a simple blog system where users can view posts and add new ones.

**Requirements:**

- Use **Express.js** for routing.

- Serve **EJS templates** for rendering pages.

- Implement **GET** and **POST** routes: 

  - GET /posts → Display all blog posts from a file (posts.json).

  - GET /post?id=1 → Display a single post based on query parameter.

  - POST /add-post → Add a new post (save data to posts.json).

- Use **middleware** to log request details.

- Use the **fs module** to read and write data to posts.json.

**Project Overview:**

The application will allow users to:

1. View all blog posts.

2. View a single blog post by its ID.

3. Add new blog posts.

4. Use middleware to log incoming requests.

5. Store blog posts in a JSON file (posts.json).
