import express from 'express';
import Post from '../models/Post.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/posts/liked - Get user's liked posts
router.get('/liked', authenticateToken, async (req, res) => {
  try {
    console.log('Fetching liked posts for user:', req.user.userId);
    const posts = await Post.find({ likes: req.user.userId })
      .sort({ createdAt: -1 });
    console.log('Found liked posts:', posts.length);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching liked posts:', error);
    res.status(500).json({ message: 'Error fetching liked posts' });
  }
});

// GET /api/posts - Get all posts
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/posts - Fetching all posts...');
    const posts = await Post.find().sort({ createdAt: -1 });
    console.log('Found posts:', posts.length);
    res.json(posts);
  } catch (error) {
    console.error('Error in GET /api/posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// GET /api/posts/:id - Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post' });
  }
});

// POST /api/posts - Create new post
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log('POST /api/posts - Creating new post:', req.body); // Debug log
    const post = new Post(req.body);
    await post.save();
    console.log('Post created:', post); // Debug log
    res.json(post);
  } catch (error) {
    console.error('Error in POST /api/posts:', error);
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
});

// PUT /api/posts/:id - Update post (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
});

// DELETE /api/posts/:id - Delete post (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    console.log('Attempting to delete post:', req.params.id); // Debug log
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      console.log('Post not found'); // Debug log
      return res.status(404).json({ message: 'Post not found' });
    }
    console.log('Post deleted successfully'); // Debug log
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error); // Debug log
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
});

// POST /api/posts/:id/like - Like/Unlike a post
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userLikedIndex = post.likes.indexOf(req.user.userId);
    
    if (userLikedIndex === -1) {
      // Like the post
      post.likes.push(req.user.userId);
      await post.save();
      res.json({ liked: true, likesCount: post.likes.length });
    } else {
      // Unlike the post
      post.likes.splice(userLikedIndex, 1);
      await post.save();
      res.json({ liked: false, likesCount: post.likes.length });
    }
  } catch (error) {
    console.error('Error liking/unliking post:', error);
    res.status(500).json({ message: 'Error updating post likes' });
  }
});

export default router; 