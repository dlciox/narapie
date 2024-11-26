import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['mainstream', 'underground', 'international', 'concerts']
  },
  imageUrl: {
    type: String
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add a pre-save middleware to log the category
postSchema.pre('save', function(next) {
  console.log('Saving post with category:', this.category);
  next();
});

const Post = mongoose.model('Post', postSchema);

export default Post; 