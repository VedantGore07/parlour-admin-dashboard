import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    status: { type: String, default: 'Pending' },
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);
