import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  category: String,
  content: String,
  file: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Post', postSchema);
