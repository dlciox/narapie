# ROADMAP.md

## **Overview**

This document outlines the development roadmap for a music-focused website centered around rap culture. The website will serve as an informative platform with dedicated sections for Polish and international rap, mainstream and underground scenes, upcoming concerts, and a forum for user interaction.

---

## **Project Objectives**

1. **Provide a centralized hub for rap enthusiasts** to stay updated on news and events.
2. **Foster a community** where users can engage with posts through comments and reactions.
3. **Highlight different rap scenes** via dedicated sections for:
   - Polish Mainstream
   - Polish Underground
   - International Underground
   - International Mainstream
4. **Promote events** like upcoming concerts.

---

## **Key Features**

### **Frontend**

- **Responsive Design:** Mobile-first, adaptable for desktop and tablet screens.
- **Navigation:**
  - Easy-to-use menu for switching between sections.
  - Highlighted "Upcoming Concerts" section for quick access.
- **Post Interaction:**
  - Users can comment and react to posts (likes, emojis).
  - Display of post views and reaction counts.
- **Search Functionality:**
  - Advanced search by artist name, genre, or post date.

### **Backend**

- **Post Management:**
  - CRUD operations for posts (create, read, update, delete).
  - Tags for categorization (e.g., underground, mainstream, concert updates).
- **User Management:**
  - Authentication (sign-up/login via email or social platforms).
  - Admin panel for post moderation.
- **Database Structure:**
  - Posts, users, and comments stored relationally.
  - Concert details stored in a dedicated table with timestamps.

### **Forum Features**

- **Threaded Comments:** Users can reply to specific comments.
- **Notifications:**
  - For new posts or replies to comments.
- **Sorting Options:**
  - Newest, most popular, or most commented posts.

---

## **Development Milestones**

### **Phase 1: Foundation**

- Set up hosting and domain.
- Initialize project repository.
- Design wireframes for the website layout.
- Define database schema:
  - Tables for posts, users, comments, and concert details.

### **Phase 2: Core Features**

- Develop the main sections:
  - Polish Mainstream
  - Polish Underground
  - International Mainstream
  - International Underground
- Implement the forum functionality.
- Build the backend APIs for managing posts, comments, and reactions.

### **Phase 3: Interactivity & User Management**

- Add user authentication and profiles.
- Enable commenting and reactions for posts.
- Introduce sorting and filtering for posts.

### **Phase 4: Concert Section**

- Add a dynamic calendar for upcoming concerts.
- Include options to sort by date, location, or artist.

### **Phase 5: Final Touches**

- Enhance website performance and optimize for SEO.
- Add analytics to monitor user engagement.
- Conduct beta testing and gather user feedback.

---

## **Tech Stack**

### **Frontend**

- Framework: React.js or Next.js
- Styling: Tailwind CSS or SCSS
- State Management: Redux or Context API

### **Backend**

- Framework: Node.js (Express.js)
- Database: PostgreSQL or MongoDB
- Authentication: JWT-based authentication

### **Other Tools**

- Hosting: Vercel (frontend) and AWS/Heroku (backend).
- Version Control: Git and GitHub.
- CI/CD: GitHub Actions.

---

## **Future Improvements**

- Integrate AI for content suggestions based on user activity.
- Add multimedia support (uploading images, embedding YouTube videos in posts).
- Develop a mobile app version.

---
