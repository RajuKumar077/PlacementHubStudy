const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pathId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LearningPath',
    required: true
  },
  completedModules: [{
    moduleId: String,
    completedAt: { type: Date, default: Date.now }
  }],
  currentModule: { type: Number, default: 0 },
  lastAccessed: { type: Date, default: Date.now },
  progressPercentage: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['in_progress', 'completed', 'paused'],
    default: 'in_progress'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index for faster queries
progressSchema.index({ userId: 1, pathId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);
