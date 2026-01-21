import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String, required: true },
  body: { type: String, required: true },
  // ADD THIS LINE:
  views: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);