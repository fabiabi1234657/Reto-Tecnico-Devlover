const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'El título es obligatorio'],
      minlength: [3, 'El título debe tener al menos 3 caracteres'],
      trim: true,
    },
    language: {
      type: String,
      trim: true,
      default: 'text',
    },
    code: {
      type: String,
      required: [true, 'El código es obligatorio'],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Snippet', snippetSchema);
