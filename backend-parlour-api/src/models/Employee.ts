import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String }, // e.g., Hair Stylist
  },
  { timestamps: true }
);

export default mongoose.model('Employee', employeeSchema);
