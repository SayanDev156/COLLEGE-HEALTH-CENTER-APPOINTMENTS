import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: String,
  description: String
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
