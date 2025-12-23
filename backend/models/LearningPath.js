const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  duration: Number, // in minutes
  videoUrl: String,
  resources: [{
    title: String,
    url: String,
    type: String // pdf, link, code, etc.
  }],
  order: Number,
  createdAt: { type: Date, default: Date.now }
});

const learningPathSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  category: {
    type: String,
    enum: ['Frontend', 'Backend', 'Full-Stack', 'ML/AI', 'DevOps', 'DSA', 'Other'],
    default: 'Other'
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  modules: [moduleSchema],
  totalDuration: Number, // in minutes
  targetAudience: String,
  prerequisites: [String],
  learningOutcomes: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LearningPath', learningPathSchema);
