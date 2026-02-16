const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User = require('../models/User')
const Product = require('../models/Product')

dotenv.config()

const users = [
  {
    name: 'Admin User',
    email: 'admin@flashmart.com',
    password: 'admin123',
    isAdmin: true
  },
  {
    name: 'Test User',
    email: 'user@flashmart.com',
    password: 'user123',
    isAdmin: false
  }
]

const products = [
  {
    name: 'Wireless Earbuds Pro',
    description: 'Premium wireless earbuds with active noise cancellation and 30-hour battery life',
    category: 'Electronics',
    price: 129.99,
    stock: 45,
    emoji: '🎧'
  },
  {
    name: 'Smart Watch Ultra',
    description: 'Advanced fitness tracking, heart rate monitor, and GPS navigation',
    category: 'Electronics',
    price: 399.99,
    stock: 23,
    emoji: '⌚'
  },
  {
    name: 'Gaming Keyboard RGB',
    description: 'Mechanical gaming keyboard with customizable RGB lighting',
    category: 'Electronics',
    price: 89.99,
    stock: 67,
    emoji: '⌨️'
  },
  {
    name: '4K Webcam',
    description: 'Ultra HD webcam with auto-focus and built-in microphone',
    category: 'Electronics',
    price: 149.99,
    stock: 34,
    emoji: '📷'
  },
  {
    name: 'Wireless Mouse Pro',
    description: 'Ergonomic wireless mouse with precision tracking',
    category: 'Electronics',
    price: 59.99,
    stock: 78,
    emoji: '🖱️'
  },
  {
    name: 'Running Shoes Elite',
    description: 'Professional running shoes with advanced cushioning technology',
    category: 'Sports',
    price: 159.99,
    stock: 12,
    emoji: '👟'
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Extra thick yoga mat with non-slip surface',
    category: 'Sports',
    price: 49.99,
    stock: 89,
    emoji: '🧘'
  },
  {
    name: 'Protein Powder 2kg',
    description: 'Whey protein isolate with 25g protein per serving',
    category: 'Sports',
    price: 59.99,
    stock: 56,
    emoji: '💪'
  },
  {
    name: 'Basketball Official Size',
    description: 'Official size basketball with premium grip',
    category: 'Sports',
    price: 39.99,
    stock: 41,
    emoji: '🏀'
  },
  {
    name: 'Leather Jacket',
    description: 'Genuine leather jacket with classic design',
    category: 'Fashion',
    price: 299.99,
    stock: 8,
    emoji: '🧥'
  },
  {
    name: 'Designer Sunglasses',
    description: 'Polarized designer sunglasses with UV protection',
    category: 'Fashion',
    price: 179.99,
    stock: 28,
    emoji: '🕶️'
  },
  {
    name: 'Cotton T-Shirt Pack',
    description: 'Pack of 3 premium cotton t-shirts',
    category: 'Fashion',
    price: 49.99,
    stock: 95,
    emoji: '👕'
  },
  {
    name: 'Designer Handbag',
    description: 'Luxury handbag with premium materials',
    category: 'Fashion',
    price: 249.99,
    stock: 15,
    emoji: '👜'
  },
  {
    name: 'Ceramic Cookware Set',
    description: 'Non-stick ceramic cookware set - 10 pieces',
    category: 'Home',
    price: 199.99,
    stock: 41,
    emoji: '🍳'
  },
  {
    name: 'Coffee Maker Deluxe',
    description: 'Programmable coffee maker with thermal carafe',
    category: 'Home',
    price: 129.99,
    stock: 52,
    emoji: '☕'
  },
  {
    name: 'Smart LED Bulbs (4pk)',
    description: 'WiFi enabled smart bulbs with color changing',
    category: 'Home',
    price: 44.99,
    stock: 98,
    emoji: '💡'
  },
  {
    name: 'Modern Sofa',
    description: 'Comfortable 3-seater sofa with premium fabric',
    category: 'Home',
    price: 799.99,
    stock: 7,
    emoji: '🛋️'
  }
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)

    console.log('🔄 Clearing existing data...')
    await User.deleteMany()
    await Product.deleteMany()

    console.log('👥 Creating users...')
    await User.insertMany(users)

    console.log('📦 Creating products...')
    await Product.insertMany(products)

    console.log('✅ Database seeded successfully!')
    console.log('\n📝 Demo Credentials:')
    console.log('Admin: admin@flashmart.com / admin123')
    console.log('User: user@flashmart.com / user123')
    console.log('\n💰 Discount Codes:')
    console.log('FLASH10 - 10% off')
    console.log('FLASH20 - 20% off')
    console.log('SAVE50 - $50 off')

    process.exit()
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()