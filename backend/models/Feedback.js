import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  name: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);
