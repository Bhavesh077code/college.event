# 🎬 G-Connect TikTok - FINAL WORKING GUIDE

## 🚀 START KRNE KE LIYE - EXACT STEPS

### **Terminal 1 - Backend Start Karo**

```bash
cd D:\G-connect\backend
npm run div
```

**Expected Output:**
```
🚀 Server is Running on http://0.0.0.0:3000
```

✅ Server chalega, aur yeh message aayega!

---

### **Terminal 2 - Frontend Start Karo**

```bash
cd D:\G-connect\frontend
npm run dev
```

**Expected Output:**
```
VITE v7.2.4  ready in 245 ms
➜  Local:   http://localhost:5173/
```

✅ Browser mein http://localhost:5173 kholo!

---

## 📱 LOGIN KARO FIRST

1. **Homepage pe "Register" button dekho**
2. **Kuch bhi username/email/password daal** (test karne ke liye)
3. **Register karo** → Auto login ho jayega
4. **Feed page dikhe ga!**

---

## ✨ FEATURES JO KAAM KARENGI

### **1️⃣ POST BANAO**
- Navbar pe "Create" click karo
- Image ya Video upload karo
- Title aur Description likho
- "Create Post" button daba
- ✅ Post bann gaya feed mein dikhe ga!

### **2️⃣ LIKE KARO**
- Kisi post pe heart ❤️ icon pa click karo
- ✅ Red ho jayega, count badhega

### **3️⃣ COMMENT KARO**
- Post pe comment icon click karo
- Comment likho
- Enter daba
- ✅ Comment dikh jayega!

### **4️⃣ PROFILE DEKHO**
- Navbar pe "Profile" click karo
- Apna posts dekho
- Apne liked posts dekho
- Followers/Following dekho

### **5️⃣ USERS FOLLOW KARO**
- "Explore" pe jaao
- Kissi user ka profile dekho
- "Follow" button daba
- ✅ Ab uske posts tumhare feed mein aayengi!

### **6️⃣ FEED DEKHO**
- "Feed" pe jaao
- Jo users follow kiye, unke posts dikhengi
- Infinite scroll - scroll karo, aur posts load hongi

---

## 🔌 BACKEND API JO KAAM KARENGI

**Test Karne Ke Liye Postman mein:**

### **1. Register User**
```
POST http://localhost:3000/user/register
Body: {
  "username": "testuser",
  "email": "test@example.com",
  "password": "pass123"
}
```

### **2. Login User**
```
POST http://localhost:3000/user/login
Body: {
  "email": "test@example.com",
  "password": "pass123"
}
Response: { token: "JWT_TOKEN", userId: "..." }
```

### **3. Create Post**
```
POST http://localhost:3000/event/create
Headers: Authorization: Bearer TOKEN
Body: form-data
  - title: "My First Post"
  - description: "This is awesome"
  - image: [file] OR video: [file]
```

### **4. Get Personal Feed**
```
GET http://localhost:3000/event/feed?page=1&limit=10
Headers: Authorization: Bearer TOKEN
```

### **5. Get All Posts (Explore)**
```
GET http://localhost:3000/event/explore?page=1&limit=10
Headers: Authorization: Bearer TOKEN
```

### **6. Like Post**
```
POST http://localhost:3000/event/like/POST_ID
Headers: Authorization: Bearer TOKEN
```

### **7. Get User Profile**
```
GET http://localhost:3000/user/profile/USER_ID
Headers: Authorization: Bearer TOKEN
```

### **8. Follow User**
```
POST http://localhost:3000/user/follow/USER_ID
Headers: Authorization: Bearer TOKEN
```

---

## 📁 NAYE FILES JO BANAYE GAYE

### **Backend (3 Controllers)**
```
✨ backend/controller/userProfileController.js
   - User profiles, posts, liked posts

✨ backend/controller/followController.js
   - Follow system

✨ backend/controller/feedController.js
   - Personal feed, Explore feed
```

### **Frontend (4 Pages)**
```
✨ frontend/src/pages/Feed.jsx
   - Personal feed with pagination

✨ frontend/src/pages/Explore.jsx
   - All posts to discover

✨ frontend/src/pages/CreatePost.jsx
   - Create new posts

✨ frontend/src/pages/UserProfile.jsx
   - User profiles with tabs
```

### **Frontend (2 Components)**
```
✨ frontend/src/components/PostCard.jsx
   - Post display card (like, comment, delete)

✨ frontend/src/components/Navbar.jsx
   - Navigation bar (Feed, Explore, Create, Profile)
```

### **Frontend (1 Utility)**
```
✨ frontend/src/utils/apiClient.js
   - All API calls (20+ functions)
```

---

## 🎯 COMPLETE USER FLOW

```
1. Visit http://localhost:5173
   ↓
2. Click "Register" → Create account
   ↓
3. Auto login + Redirect to Feed
   ↓
4. Feed khali hoga (no followers yet)
   ↓
5. "Explore" pe jaao
   ↓
6. Posts dekho, creators ko follow karo
   ↓
7. "Feed" mein unke posts dekho
   ↓
8. "Create" pe click, post banao
   ↓
9. Like, Comment, Follow karo
   ↓
10. "Profile" pe apna stats dekho
```

---

## ❌ COMMON ISSUES & FIXES

### **"Cannot connect to backend"**
✅ Backend terminal mein `npm run div` running hai?
✅ Output mein "Server is Running" likha hai?

### **"Post upload fail"**
✅ Image/Video select kiya?
✅ Title likha hai?
✅ .env mein Cloudinary credentials hain?

### **"Cannot login"**
✅ Token localStorage mein save hai?
✅ Email/password correct hai?

### **"Feed khali hai"**
✅ Posts banaye the?
✅ Users follow kiye?

---

## 📊 DATABASE CHANGES

### **User Collection**
```javascript
{
  username: "user1",
  email: "user@example.com",
  password: "hashed_password",
  role: "user",
  profilePicture: "url",
  bio: "My bio",
  followers: ["user2_id", "user3_id"],  // ✨ NEW
  following: ["user4_id"],              // ✨ NEW
  createdAt: "...",
  updatedAt: "..."
}
```

### **Event Collection (Posts)**
```javascript
{
  title: "Post title",
  description: "Post desc",
  location: "City",
  image: "cloudinary_url",
  video: "cloudinary_url",
  user: "creator_id",
  likesCount: 5,        // ✨ NEW
  commentsCount: 2,     // ✨ NEW
  createdAt: "...",
  updatedAt: "..."
}
```

---

## ✅ VERIFICATION CHECKLIST

- [ ] Backend mein `npm run div` chalra hai?
- [ ] Frontend mein `npm run dev` chalra hai?
- [ ] Browser mein http://localhost:5173 khul raha hai?
- [ ] Register kar payaa?
- [ ] Login kar payaa?
- [ ] Feed dikh raha hai?
- [ ] Explore posts dikh rahe hain?
- [ ] Post banaa sakte ho?
- [ ] Like kar sakte ho?
- [ ] Comment kar sakte ho?
- [ ] Users ko follow kar sakte ho?
- [ ] Profile dekh sakte ho?

---

## 🎉 READY!

**BASS ITNA KARO:**

1. **Terminal 1:**
```bash
cd D:\G-connect\backend && npm run div
```

2. **Terminal 2:**
```bash
cd D:\G-connect\frontend && npm run dev
```

3. **Browser:**
Open http://localhost:5173

4. **Test:**
Register → Create Post → Like → Comment → Follow → Explore

**DONE! 🚀**

---

## 📞 Help Needed?

Check these files for details:
- `TIKTOK_FEATURES_README.md` - Feature details
- `QUICK_START.md` - Setup guide
- `IMPLEMENTATION_SUMMARY.md` - Technical details
- `VISUAL_GUIDE.md` - UI walkthrough

---

**Enjoy your TikTok-like app! 🎬✨**
