import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

const createUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ Connected to MongoDB');

    await User.deleteMany(); // ⬅️ Wipe all users

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const user = new User({
      email: 'admin@parlour.com',
      password: hashedPassword,
      role: 'superadmin',
    });

    await user.save();
    console.log('✅ Superadmin created');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating user:', error);
    process.exit(1);
  }
};

createUser();
