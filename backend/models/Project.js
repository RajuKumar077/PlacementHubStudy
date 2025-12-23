const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  category: String,
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  technologies: [String],
  requirements: [String],
  estimatedTime: Number, // in hours
  resources: [{
    title: String,
    url: String
  }],
  evaluationCriteria: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  submittedBy: [{
    userId: mongoose.Schema.Types.ObjectId,
    submissionDate: Date,
    status: { type: String, enum: ['submitted', 'reviewed', 'approved'], default: 'submitted' },
    gitLink: String,
    code: String,
    notes: String
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
