import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  bio: String,
  img: String
});

export default mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
