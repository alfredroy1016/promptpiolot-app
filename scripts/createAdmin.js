// scripts/createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = 'jerinrobert916@gmail.com';
    const plainPassword = 'jebra@916';

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log('⚠️ Admin already exists.');
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 12);

    const newAdmin = new Admin({
      email,
      password: hashedPassword
    });

    await newAdmin.save();
    console.log(`✅ Admin created: ${email}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating admin:', err);
    process.exit(1);
  }
}

createAdmin();
