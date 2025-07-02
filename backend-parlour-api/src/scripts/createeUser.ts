import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User'; // ensure path is correct

dotenv.config();

const createUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ Connected to MongoDB');

    const existingUser = await User.findOne({ email: 'admin@parlour.com' });
    if (existingUser) {
      console.log('⚠️ User already exists in database');
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const user = new User({
      email: 'admin@parlour.com',
      password: hashedPassword,
      role: 'superadmin',
    });

    await user.save();
    console.log('✅ User created successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating user:', error);
    process.exit(1);
  }
};

createUser();
