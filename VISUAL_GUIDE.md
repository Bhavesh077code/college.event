# 🎬 G-Connect User Guide - Visual Overview

## 🏠 Home Page Flow

```
┌─────────────────────────────────┐
│     G-Connect Home Page         │
│  (Not logged in users)          │
├─────────────────────────────────┤
│                                 │
│  🎬 Welcome to G-Connect!       │
│                                 │
│  [Register Button] [Login Button]
│                                 │
└─────────────────────────────────┘
        ↓              ↓
    [Register]    [Login]
        ↓              ↓
    ┌───────────┬──────────┐
    │  New User │  Existing│
    │  Creates  │  Logs In │
    │  Account  │          │
    └───────────┴──────────┘
            ↓
    ┌──────────────────────┐
    │  ✅ Redirects to Feed │
    └──────────────────────┘
```

---

## 📱 User Interface Sections

### **Top Navigation Bar**
```
┌─────────────────────────────────────────┐
│  🎬 G-Connect │ 🏠 Feed │ 🌟 Explore │   │
│               │ 📹 Create │ 👤 Profile │ │
│               │           [Logout]      │
└─────────────────────────────────────────┘
```

### **Feed Page Layout**
```
┌─────────────────────────────────┐
│      PERSONAL FEED              │
├─────────────────────────────────┤
│  Posts from users you follow    │
│  + Your own posts               │
│                                 │
│  ┌──────────────────────┐       │
│  │  Post Card           │       │
│  │  [User] [Posts Ago]  │       │
│  │  [Image/Video]       │       │
│  │  ❤️ 234 💬 45        │       │
│  └──────────────────────┘       │
│                                 │
│  ┌──────────────────────┐       │
│  │  Post Card 2         │       │
│  │  [User] [Posts Ago]  │       │
│  │  [Image/Video]       │       │
│  │  ❤️ 567 💬 89        │       │
│  └──────────────────────┘       │
│                                 │
│  [Load More Posts]              │
└─────────────────────────────────┘
```

### **Explore Page Layout**
```
┌─────────────────────────────────┐
│      EXPLORE                    │
│   (Discover All Posts)          │
├─────────────────────────────────┤
│  Posts from ALL users           │
│  (Trending & Latest)            │
│                                 │
│  Same layout as Feed but        │
│  with more posts                │
│                                 │
│  [Load More Posts]              │
└─────────────────────────────────┘
```

### **Create Post Page Layout**
```
┌─────────────────────────────────┐
│  📹 CREATE NEW POST             │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐    │
│  │  [Upload Image/Video]   │    │
│  │  or drag & drop         │    │
│  └─────────────────────────┘    │
│                                 │
│  Title: ___________________     │
│                                 │
│  Description: ____________      │
│               ____________      │
│               ____________      │
│                                 │
│  Location: _________________    │
│                                 │
│  [Create Post]                  │
│                                 │
└─────────────────────────────────┘
```

### **User Profile Layout**
```
┌─────────────────────────────────┐
│  👤 User Profile                │
├─────────────────────────────────┤
│  [Avatar] Username              │
│           Bio: "Hello world!"    │
│  Posts: 42  Followers: 1,234    │
│  Following: 567                 │
│           [Follow/Following]    │
├─────────────────────────────────┤
│  Tabs:                          │
│  Posts | Liked | Followers Follow
├─────────────────────────────────┤
│  [Posts Grid/List]              │
│  ┌──────────┐ ┌──────────┐     │
│  │ Post 1   │ │ Post 2   │     │
│  │ [Thumb]  │ │ [Thumb]  │     │
│  └──────────┘ └──────────┘     │
│                                 │
│  ┌──────────┐ ┌──────────┐     │
│  │ Post 3   │ │ Post 4   │     │
│  │ [Thumb]  │ │ [Thumb]  │     │
│  └──────────┘ └──────────┘     │
└─────────────────────────────────┘
```

---

## 👥 User Journey Maps

### **New User Journey**
```
1. Visit Website
   ↓
2. Click Register
   ↓
3. Fill Registration Form
   ├─ Username
   ├─ Email
   ├─ Password
   └─ Create Account
   ↓
4. Auto Login & Redirect to Feed
   ↓
5. Empty Feed (No Followers)
   ├─ See "No posts" message
   ├─ See "Explore" suggestion
   └─ Click Explore
   ↓
6. Browse All Posts
   ├─ See Creator Posts
   ├─ Like Posts
   ├─ Add Comments
   └─ Click to Follow Creators
   ↓
7. Return to Feed
   ├─ Now see posts from followed users
   └─ Continue engaging
```

### **Content Creator Journey**
```
1. Login to G-Connect
   ↓
2. Click "Create Post"
   ↓
3. Upload Media
   ├─ Choose Image
   └─ Or Choose Video
   ↓
4. Add Post Details
   ├─ Title
   ├─ Description
   └─ Location
   ↓
5. Click "Create Post"
   ↓
6. Post Published
   ├─ Appears in your profile
   ├─ Appears in followers' feeds
   ├─ Real-time notification sent
   └─ Others can interact
   ↓
7. View Post Metrics
   ├─ See Likes Count
   ├─ See Comments
   └─ Engagement Stats
```

---

## 🔐 Authentication Flow

```
┌──────────────────────────────────────┐
│      No Token / Not Logged In        │
└──────────────────────────────────────┘
            ↓
    ┌───────────────────┐
    │ Try to access    │
    │ /feed or /create │
    └───────────────────┘
            ↓
    ┌──────────────────────┐
    │ Redirect to Login    │
    │ (Protected Route)    │
    └──────────────────────┘
            ↓
    ┌──────────────────────┐
    │ User Logs In         │
    │ email + password     │
    └──────────────────────┘
            ↓
    ┌──────────────────────┐
    │ Backend Verifies     │
    │ Credentials & Issues │
    │ JWT Token            │
    └──────────────────────┘
            ↓
    ┌──────────────────────┐
    │ Token Stored in      │
    │ localStorage         │
    └──────────────────────┘
            ↓
    ┌──────────────────────┐
    │ User Redirected      │
    │ to Feed              │
    │ ✓ Full Access       │
    └──────────────────────┘
```

---

## 📊 Engagement Flow

### **Liking a Post**
```
User sees post on feed
        ↓
Clicks ❤️ Heart Icon
        ↓
Like added to database
        ↓
Like count updates (+1)
        ↓
Heart turns red ❤️
        ↓
Click again to unlike
        ↓
Like removed from database
        ↓
Like count updates (-1)
        ↓
Heart turns gray 🤍
```

### **Commenting on Post**
```
User clicks comment icon 💬
        ↓
Comment section opens
        ↓
User types comment
        ↓
User presses Enter or clicks Post
        ↓
Comment sent to database
        ↓
Comment appears below post
        ↓
Other users see the comment
        ↓
Original poster gets notification
```

### **Following a User**
```
User visits another user's profile
        ↓
Clicks [Follow] button
        ↓
Following request sent
        ↓
User added to followers list
        ↓
Followed user added to following list
        ↓
Button changes to [Following]
        ↓
Their posts now appear in your feed
```

---

## 📱 Mobile vs Desktop

### **Desktop View**
```
┌──────────────────────────────────┐
│  Navbar at top (fixed)           │
├──────────────────────────────────┤
│ Sidebar │  Main Content  │Sidebar│
│  (Nav)  │   (Posts/Feed) │(Stats)│
│         │                │       │
└──────────────────────────────────┘
```

### **Mobile View**
```
┌──────────────────────────────┐
│  Navbar with menu button     │
├──────────────────────────────┤
│     Main Content             │
│     (Full Width Posts)       │
│                              │
│     (Optimized Touch)        │
├──────────────────────────────┤
│  Bottom Navigation           │
│  (Scroll to top button)      │
└──────────────────────────────┘
```

---

## 🔄 Data Flow Diagram

```
┌────────────────────────────┐
│     User Action            │
│  (Click, Type, Upload)     │
└────────────┬───────────────┘
             ↓
┌────────────────────────────┐
│  Frontend Component         │
│  (React Component)         │
└────────────┬───────────────┘
             ↓
┌────────────────────────────┐
│  API Client (apiClient.js) │
│  (Axios Request)           │
└────────────┬───────────────┘
             ↓
┌────────────────────────────┐
│  Backend Server            │
│  (Express Routes)          │
└────────────┬───────────────┘
             ↓
┌────────────────────────────┐
│  Controller                │
│  (Business Logic)          │
└────────────┬───────────────┘
             ↓
┌────────────────────────────┐
│  Database                  │
│  (MongoDB)                 │
└────────────┬───────────────┘
             ↓
┌────────────────────────────┐
│  Response with Data        │
│  (JSON Response)           │
└────────────┬───────────────┘
             ↓
┌────────────────────────────┐
│  Frontend Updates State    │
│  (Renders UI)              │
└────────────┬───────────────┘
             ↓
┌────────────────────────────┐
│  User Sees Changes         │
│  (Updated Content)         │
└────────────────────────────┘
```

---

## 🎯 Feature Accessibility

### **What Each User Can Do**

#### **Regular User**
```
✓ Create posts (image/video)
✓ Edit own posts
✓ Delete own posts
✓ Like/unlike any post
✓ Comment on any post
✓ Follow/unfollow users
✓ View profiles
✓ See personal feed
✓ Browse explore
✓ Manage own profile
✗ Cannot delete others' posts
✗ Cannot edit others' posts
✗ Cannot delete others' comments
```

#### **Admin User**
```
✓ All regular user features
✓ Delete any post
✓ Edit any post
✓ Delete any comment
✓ View all users
✓ System management
✓ Manage platform
```

---

## 💾 Data Storage Locations

### **Frontend**
```
localStorage:
├─ token (JWT)
├─ userId
├─ username
├─ role
└─ sessionData

sessionStorage:
└─ Temporary data

IndexedDB (Optional):
└─ Offline data
```

### **Backend Database**
```
MongoDB Collections:
├─ users
│  ├─ username
│  ├─ email
│  ├─ password (hashed)
│  ├─ followers []
│  ├─ following []
│  └─ profile info
│
├─ events (posts)
│  ├─ title
│  ├─ description
│  ├─ image URL
│  ├─ video URL
│  ├─ user (creator)
│  └─ timestamps
│
├─ likes
│  ├─ user
│  ├─ event
│  └─ timestamp
│
└─ comments
   ├─ user
   ├─ event
   ├─ comment text
   └─ timestamp
```

---

## 🔔 Real-time Updates

```
User A creates post
        ↓
Socket.io emits 'newEvent'
        ↓
All connected clients receive event
        ↓
User B's feed updates automatically
        ↓
User B sees new post appear
        ↓
No refresh needed!
```

---

## 📊 Statistics Available

### **Per User Profile**
```
Posts Count
├─ Total posts created
├─ Updated when post is created/deleted
└─ Displayed on profile

Followers Count
├─ Number of followers
├─ Updated when followed/unfollowed
└─ Click to see list

Following Count
├─ Number of users following
├─ Updated when follow/unfollow
└─ Click to see list

Likes Received
├─ Total likes on user's posts
└─ Displayed separately
```

### **Per Post**
```
Likes Count
├─ Updated in real-time
└─ Shows number of users who liked

Comments Count
├─ Number of comments
├─ Shows all comments in thread
└─ Can read/write/delete

Engagement Metrics
├─ Time since posted
├─ Creator info
└─ Location (if provided)
```

---

## 🎨 Color Scheme

```
Dark Theme (TikTok-like):
├─ Background: #0f172a (Dark Navy)
├─ Cards: #1e293b (Dark Gray)
├─ Text: #ffffff (White)
├─ Accent: #3b82f6 (Blue)
├─ Success: #22c55e (Green)
├─ Error: #ef4444 (Red)
├─ Hover: #64748b (Light Gray)
└─ Border: #334155 (Border Gray)
```

---

## 📞 Support & Help

**In-App Help**:
- Hover over icons for tooltips
- Toast messages for feedback
- Error messages explain issues

**External Support**:
- Check documentation files
- Troubleshooting guide
- FAQ section

---

*This visual guide helps understand the complete user experience of the G-Connect TikTok-like platform!*
