# 🚀 Quick Start Guide - G-Connect TikTok Features

## 5-Minute Setup

### **Step 1: Backend Configuration**

1. Navigate to backend:
```bash
cd backend
```

2. Verify `.env` file has:
```env
PORT=3000
MONGODB_URI=<your_mongodb_url>
SECRET_KEY=<your_secret>
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
```

3. Start backend:
```bash
npm run div    # Development mode with auto-reload
```

✅ Backend ready on http://localhost:3000

---

### **Step 2: Frontend Configuration**

1. Open new terminal, navigate to frontend:
```bash
cd frontend
```

2. Verify `src/api.js`:
```javascript
const BASE_URL = ["http://192.168.1.79:3000", "http://localhost:3000"][1];
// Use index [1] for localhost
```

3. Start frontend:
```bash
npm run dev
```

✅ Frontend ready on http://localhost:5173

---

## 🎯 Testing the Features

### **Test 1: User Registration**
1. Go to http://localhost:5173
2. Click "Register"
3. Fill in: username, email, password
4. Click "Register"
5. Should see success message

### **Test 2: User Login**
1. Click "Login"
2. Enter email and password
3. Should see feed page
4. Check localStorage for token: `localStorage.getItem('token')`

### **Test 3: Create Post**
1. Click "Create" in navbar
2. Choose image or video
3. Add title and description
4. Click "Create Post"
5. Should redirect to feed

### **Test 4: Like a Post**
1. See any post on feed/explore
2. Click heart icon
3. Count should increment
4. Heart should turn red

### **Test 5: Comment on Post**
1. Click comment icon on any post
2. Type comment
3. Click "Post"
4. Comment should appear

### **Test 6: Follow User**
1. Click any username or profile icon
2. Go to their profile
3. Click "Follow" button
4. Should see "Following" status

### **Test 7: View Feed**
1. Click "Feed" in navbar
2. Should see posts from followed users
3. Scroll down to load more

### **Test 8: Explore Posts**
1. Click "Explore" in navbar
2. Should see all posts from all users
3. Can like/comment on any

### **Test 9: View Profile**
1. Click "Profile" in navbar
2. See your posts, likes, followers, following
3. Click tabs to switch views

### **Test 10: Logout**
1. Click logout button
2. Should redirect to login
3. Token should be cleared

---

## 🔗 API Testing (With Postman/curl)

### **Register User**
```bash
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### **Login User**
```bash
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### **Get User Profile**
```bash
curl -X GET http://localhost:3000/user/profile/USER_ID \
  -H "Authorization: Bearer TOKEN"
```

### **Create Post** (with image)
```bash
curl -X POST http://localhost:3000/event/create \
  -H "Authorization: Bearer TOKEN" \
  -F "title=My Post" \
  -F "description=Cool post" \
  -F "image=@/path/to/image.jpg"
```

### **Like Post**
```bash
curl -X POST http://localhost:3000/event/like/POST_ID \
  -H "Authorization: Bearer TOKEN"
```

### **Add Comment**
```bash
curl -X POST http://localhost:3000/event/comment/POST_ID \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"comment": "Great post!"}'
```

### **Follow User**
```bash
curl -X POST http://localhost:3000/user/follow/USER_ID \
  -H "Authorization: Bearer TOKEN"
```

### **Get Feed**
```bash
curl -X GET http://localhost:3000/event/feed?page=1&limit=10 \
  -H "Authorization: Bearer TOKEN"
```

---

## 📱 Mobile Testing

1. On your phone, update API URL:
```javascript
// In src/api.js
const BASE_URL = "http://192.168.1.79:3000";  // Your computer IP
```

2. Build frontend:
```bash
npm run build
npm run preview
```

3. Access on phone: `http://192.168.1.79:4173`

---

## 🐛 Troubleshooting

### **"Cannot connect to backend"**
- ✅ Check backend is running: `http://localhost:3000`
- ✅ Verify API URL in `src/api.js`
- ✅ Check CORS settings in backend `app.js`
- ✅ Check firewall settings

### **"Authentication failed"**
- ✅ Verify `.env` JWT_SECRET is set
- ✅ Check token in localStorage: `localStorage.clear()`
- ✅ Re-login to get new token

### **"File upload fails"**
- ✅ Verify Cloudinary credentials in `.env`
- ✅ Check file size (max 100MB)
- ✅ Check file format (jpg, png, mp4, mov, etc.)

### **"Database connection error"**
- ✅ Check MongoDB connection string in `.env`
- ✅ Verify MongoDB is running
- ✅ Check IP whitelist in MongoDB Atlas

### **"Port already in use"**
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3001 npm run div
```

---

## 📊 Database Inspection

### **Connect to MongoDB**
```bash
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/g-connect"
```

### **Useful Queries**
```javascript
// See users
db.users.find()

// See posts
db.events.find()

// See likes
db.likes.find()

// See comments
db.comments.find()

// Count users
db.users.countDocuments()

// Find user's followers
db.users.findOne({_id: ObjectId("USER_ID")}).followers
```

---

## 🎨 Frontend Structure Quick Reference

```
src/
├── pages/
│   ├── Feed.jsx          → Personal feed
│   ├── Explore.jsx       → All posts
│   ├── CreatePost.jsx    → Create post
│   ├── UserProfile.jsx   → User profile
│   ├── Login.jsx         → Login page
│   └── Register.jsx      → Register page
├── components/
│   ├── PostCard.jsx      → Post display
│   ├── Navbar.jsx        → Navigation
│   └── ...
├── utils/
│   └── apiClient.js      → API calls
└── App.jsx               → Routes
```

---

## 🔐 Security Reminders

1. **Never commit `.env`** - Add to `.gitignore`
2. **Rotate JWT secrets** - Change SECRET_KEY regularly
3. **Update dependencies** - Run `npm audit fix`
4. **Use HTTPS in production** - Enable SSL
5. **Rate limiting** - Implement on production
6. **Input validation** - Sanitize all user inputs
7. **Database backups** - Automated daily backups

---

## 📈 Performance Tips

1. **Pagination** - Load 10 posts per page
2. **Lazy loading** - Load images on scroll
3. **Image optimization** - Compress before upload
4. **Caching** - Use browser cache for assets
5. **CDN** - Use Cloudinary CDN for media
6. **Database indexing** - Index frequently queried fields

---

## 🎯 Next Steps

1. ✅ Test all features locally
2. ✅ Fix any bugs
3. ✅ Deploy to production
4. ✅ Monitor performance
5. ✅ Gather user feedback
6. ✅ Add advanced features (stories, live, etc.)

---

## 💡 Pro Tips

- Use browser DevTools to inspect requests (F12)
- Check Network tab to see API calls
- Use Console tab to debug JavaScript
- Check Redux DevTools for state management
- Use MongoDB Atlas for cloud database
- Use Cloudinary dashboard to manage media

---

## 📞 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Posts not loading | Check token in localStorage, verify API URL |
| Upload fails | Check Cloudinary credentials, file size |
| Can't follow | Check user ID, refresh page |
| Comments not showing | Refresh page, check database |
| Profile not updating | Clear localStorage, re-login |
| Mobile layout broken | Use DevTools mobile view, check Tailwind CSS |

---

## 🎉 You're All Set!

Your TikTok-like application is ready to use. Start creating, liking, and connecting! 

**Happy coding! 🚀**

---

Need help? Check the detailed documentation in:
- `TIKTOK_FEATURES_README.md` - Feature details
- `IMPLEMENTATION_SUMMARY.md` - Technical overview
