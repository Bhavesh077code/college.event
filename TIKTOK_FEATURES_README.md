# 🎬 G-Connect: TikTok-like Social Media Platform

A complete role-based social media application built with **React + Node.js + MongoDB** featuring posts, likes, comments, follow system, and more!

---

## ✨ Features

### 🔐 **Authentication & Authorization**
- Role-based access control (Admin & User)
- JWT-based authentication
- Secure password hashing with bcrypt
- User registration and login

### 📹 **Post Management**
- Regular users can create posts with images or videos
- Add title, description, and location to posts
- Edit and delete own posts
- View all posts in explore feed
- Upload to Cloudinary for media storage

### 💖 **Engagement Features**
- **Like/Unlike** posts
- **Comment** on posts with real-time updates
- **Follow/Unfollow** other users
- **View followers** and **following** lists
- Like count tracking per post

### 👤 **User Profiles**
- Personal profile page with:
  - Profile picture and bio
  - Posts count, followers count, following count
  - All user posts
  - Liked posts
  - Followers list
  - Following list
- Follow/unfollow from profile
- Update profile information

### 📱 **Feed System**
- **Personal Feed**: Posts from users you follow + your own posts
- **Explore Feed**: Discover all posts on the platform
- Pagination for efficient loading
- Real-time like status for each post

### 🎯 **User Interface**
- Modern dark theme UI with Tailwind CSS
- Responsive design (mobile, tablet, desktop)
- Navigation bar for easy access
- Toast notifications for user feedback
- Smooth loading animations

---

## 🛠️ **Tech Stack**

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Media storage
- **Socket.io** - Real-time updates

### Frontend
- **React 19** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications
- **Vite** - Build tool

---

## 📁 **Project Structure**

```
G-connect/
├── backend/
│   ├── models/
│   │   ├── userModel.js          (User schema with followers/following)
│   │   ├── eventModel.js         (Post/Event schema)
│   │   ├── likeModel.js          (Like tracking)
│   │   └── commentModel.js       (Comments)
│   ├── controller/
│   │   ├── userProfileController.js    (Profile endpoints)
│   │   ├── followController.js         (Follow/unfollow logic)
│   │   ├── feedController.js           (Feed generation)
│   │   ├── eventController.js          (Post creation)
│   │   ├── LikeController.js           (Like toggle)
│   │   └── commentController.js        (Comment management)
│   ├── routes/
│   │   ├── userRoutes.js         (Auth + Profile + Follow)
│   │   └── eventRoutes.js        (Posts + Likes + Comments + Feed)
│   ├── middleware/
│   │   ├── authMiddleware.js     (JWT verification)
│   │   ├── upload.js             (File upload config)
│   │   └── adminOnly.js          (Admin check)
│   └── app.js                    (Express setup)
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Feed.jsx          (Personal feed)
│   │   │   ├── Explore.jsx       (Discover all posts)
│   │   │   ├── CreatePost.jsx    (Create new post)
│   │   │   ├── UserProfile.jsx   (User profile + tabs)
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── components/
│   │   │   ├── PostCard.jsx      (Post display card)
│   │   │   ├── Navbar.jsx        (Navigation)
│   │   │   └── ...
│   │   ├── utils/
│   │   │   └── apiClient.js      (API endpoints)
│   │   └── App.jsx               (Routes config)
│   └── package.json
│
└── README.md
```

---

## 🚀 **Getting Started**

### **Backend Setup**

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Create `.env` file:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. Start backend:
```bash
npm run div          # Development with nodemon
# or
npm start            # Production
```

### **Frontend Setup**

1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Update API URL in `src/api.js` (if needed):
```javascript
const BASE_URL = "http://localhost:3000";
```

3. Start frontend:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

---

## 📚 **API Endpoints**

### **Authentication**
- `POST /user/register` - Register new user
- `POST /user/login` - Login user
- `GET /user/logout/:id` - Logout user

### **User Profile**
- `GET /user/profile/:userId` - Get user profile
- `GET /user/posts/:userId` - Get user's posts
- `GET /user/liked/:userId` - Get user's liked posts
- `PUT /user/profile/:userId` - Update user profile

### **Follow System**
- `POST /user/follow/:userId` - Follow a user
- `POST /user/unfollow/:userId` - Unfollow a user
- `GET /user/followers/:userId` - Get followers list
- `GET /user/following/:userId` - Get following list

### **Posts/Events**
- `POST /event/create` - Create new post (image/video)
- `GET /event/feed` - Get personal feed
- `GET /event/explore` - Get explore feed
- `DELETE /event/delete/:id` - Delete post

### **Likes**
- `POST /event/like/:eventId` - Toggle like on post
- `GET /event/likes/:eventId` - Get like count

### **Comments**
- `POST /event/comment/:eventId` - Add comment
- `GET /event/comments/:eventId` - Get all comments
- `DELETE /event/comment/:commentId` - Delete comment

---

## 🎨 **User Flow**

### **For Regular Users**

1. **Register/Login** → Access user dashboard
2. **Create Post** → Upload image/video with title & description
3. **Explore Feed** → Discover posts from all users
4. **Follow Users** → Click follow button on profiles
5. **View Feed** → See posts from followed users
6. **Interact** → Like posts, add comments
7. **View Profile** → See own posts, liked posts, followers, following
8. **Visit Other Profiles** → View other users' posts and follow them

### **For Admins**

1. Access admin dashboard
2. Manage events (legacy system still available)
3. User management capabilities

---

## 💾 **Database Schema**

### **User Model**
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: String ("user" or "admin"),
  profilePicture: String (URL),
  bio: String,
  followers: [ObjectId],      // User IDs
  following: [ObjectId],      // User IDs
  createdAt: Date,
  updatedAt: Date
}
```

### **Event Model (Posts)**
```javascript
{
  title: String,
  description: String,
  location: String,
  image: String (URL),
  video: String (URL),
  user: ObjectId,             // Post creator
  likesCount: Number,
  commentsCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### **Like Model**
```javascript
{
  user: ObjectId,
  event: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

### **Comment Model**
```javascript
{
  user: ObjectId,
  event: ObjectId,
  comment: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 **Security Features**

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes with auth middleware
- Role-based access control
- Unique index on followers/following (prevents duplicates)
- Input validation and sanitization
- CORS configuration for secure requests

---

## 🎯 **Future Enhancements**

- [ ] Direct messaging between users
- [ ] Hashtag system for posts
- [ ] Trending posts algorithm
- [ ] Search functionality
- [ ] Share posts via social media
- [ ] Video streaming optimization
- [ ] Push notifications
- [ ] Analytics dashboard for users
- [ ] Blocking/reporting users
- [ ] Story feature (24-hour posts)
- [ ] Live streaming
- [ ] Recommendations engine

---

## 🐛 **Troubleshooting**

### **Backend won't start**
- Check MongoDB connection string in `.env`
- Ensure all required packages are installed
- Check port 3000 is not in use

### **Frontend can't connect to backend**
- Verify backend is running on port 3000
- Update API URL in `src/api.js`
- Check CORS settings in backend

### **File upload fails**
- Verify Cloudinary credentials in `.env`
- Check file size limits
- Ensure image/video file formats are correct

### **Authentication issues**
- Clear browser localStorage
- Check JWT_SECRET is set in `.env`
- Verify token format in requests

---

## 👨‍💻 **Contributing**

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 **License**

This project is open source and available under the ISC License.

---

## 📞 **Support**

For issues or questions, please create an issue in the repository or contact the development team.

---

## 🎉 **Happy Coding!**

Enjoy building your TikTok-like social media platform with G-Connect! 🚀

---

**Created with ❤️ by Bhavesh Yadav**
