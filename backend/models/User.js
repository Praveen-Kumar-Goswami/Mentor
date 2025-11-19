const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['mentor', 'mentee'],
    required: true
  },
  profile: {
    bio: String,
    skills: [String],
    industry: String,
    experience: Number,
    education: String,
    languages: [String],
    profilePicture: String,
    availability: {
      timezone: String,
      workingHours: {
        start: String,
        end: String
      },
      daysAvailable: [String]
    },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 }
    },
    pricePerHour: Number,
    calendlyUrl: String
  },
  preferences: {
    language: { type: String, default: 'en' },
    notifications: { type: Boolean, default: true }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);


