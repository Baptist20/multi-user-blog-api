# 🧠 Multi-User Blog Platform API (MERN Stack)

This is the **backend RESTful API** for a full-featured multi-user blog platform, built with **Node.js**, **Express**, and **MongoDB**. It supports user authentication, role-based access (user/admin), blog post management, file uploads (Cloudinary), comments, and filtering features.

---

## 🚀 Features

### 🔓 Public Access

- View all blog posts (paginated, searchable, sortable)
- Filter posts by:
  - Category
  - Tags
  - Author
  - Keyword (title search)
- View a single post
- View author profile

### 🔐 Authentication

- Register & login with JWT
- Refresh token support (optional)
- Forgot & reset password via email (Nodemailer)
- Role-based access: `reader`, `user` or `admin`

### 📝 Authenticated Users

- Create, edit, and delete own posts
- Upload images (Cloudinary + Multer)
- Manage personal post history

### 🛠 Admin Panel (via API)

- View & manage all users
- View & manage all posts
- Ban users
- Create/edit/delete categories and tags

---

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Cloudinary** for image hosting
- **Multer** for handling file uploads
- **Nodemailer** for email support

---

## 📁 Folder Structure

project-root/
├── controllers/ # Logic for routes (users, posts, admin, auth)
├── models/ # Mongoose models (User, Post, Comment, Tag, Category)
├── routes/ # API route handlers ├── middleware/ # Auth protection, error handling, etc.
├── utils/ # Helper functions (email, Cloudinary, tokens)
├── uploads/ # Temporary file storage
├── config/ # MongoDB & Cloudinary config
├── .env # Environment variables
└── server.js # Entry point

---

## 🔐 Environment Variables

Create a `.env` file:
PORT=5000 MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_pass
BASE_URL=http://localhost:5000

---

## 📦 Install & Run

```bash
# Clone the repo
git clone https://github.com/Baptist20/multi-user-blog-api.git

# Install dependencies
cd multi-user-blog-api
npm install

# Start server
npm run dev
```

📮 Example API Usage
http
Copy
Edit
GET /api/posts?search=react&page=2&category=tech&sort=latest
POST /api/posts/ (Requires Auth)
PUT /api/posts/:id (Requires Auth)
DELETE /api/posts/:id (Requires Auth or Admin)

POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
PUT /api/auth/reset-password/:token
etc(There's more usage like Banning, Deleting(user or a blog), Getting all users and blog posts, and lots more)

📌 Notes
All sensitive routes require JWT in Authorization header.

All filtering/sorting is done via query parameters.

Tags and categories are pre-defined by admin and fetched from /api/tags, /api/categories.

👨‍💻 Author
Built with ❤️ by Ezimah Baptist Ikenna
