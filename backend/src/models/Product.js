const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Electronics', 'Sports', 'Fashion', 'Home']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: 0,
    default: 0
  },
  emoji: {
    type: String,
    default: '📦'
  }
}, {
  timestamps: true
})

// Index for search
productSchema.index({ name: 'text', description: 'text' })

module.exports = mongoose.model('Product', productSchema)