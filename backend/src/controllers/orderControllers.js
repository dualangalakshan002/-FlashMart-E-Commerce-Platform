const Order = require('../models/Order')
const Product = require('../models/Product')

// Discount codes
const discountCodes = {
  'FLASH10': { type: 'percentage', value: 10, code: 'FLASH10' },
  'FLASH20': { type: 'percentage', value: 20, code: 'FLASH20' },
  'SAVE50': { type: 'fixed', value: 50, code: 'SAVE50' }
}

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, subtotal, discount, total, discountCode } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' })
    }

    // Verify stock availability and update stock
    for (let item of items) {
      const product = await Product.findById(item.product)
      
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` })
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}` 
        })
      }

      // Reduce stock
      product.stock -= item.quantity
      await product.save()
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      subtotal,
      discount,
      total,
      discountCode
    })

    const populatedOrder = await Order.findById(order._id).populate('items.product')

    res.status(201).json(populatedOrder)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product')

    if (order) {
      // Check if order belongs to user or user is admin
      if (order.user._id.toString() === req.user._id.toString() || req.user.isAdmin) {
        res.json(order)
      } else {
        res.status(403).json({ message: 'Not authorized to view this order' })
      }
    } else {
      res.status(404).json({ message: 'Order not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get user orders
// @route   GET /api/orders/user/:userId
// @access  Private
const getUserOrders = async (req, res) => {
  try {
    // Check if requesting own orders or admin
    if (req.params.userId !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    const orders = await Order.find({ user: req.params.userId })
      .populate('items.product')
      .sort({ createdAt: -1 })

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .populate('items.product')
      .sort({ createdAt: -1 })

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Validate discount code
// @route   POST /api/orders/validate-discount
// @access  Public
const validateDiscountCode = async (req, res) => {
  try {
    const { code } = req.body

    if (!code) {
      return res.status(400).json({ message: 'Please provide a discount code' })
    }

    const discount = discountCodes[code.toUpperCase()]

    if (discount) {
      res.json(discount)
    } else {
      res.status(404).json({ message: 'Invalid discount code' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body

    const order = await Order.findById(req.params.id)

    if (order) {
      order.status = status
      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      res.status(404).json({ message: 'Order not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createOrder,
  getOrderById,
  getUserOrders,
  getAllOrders,
  validateDiscountCode,
  updateOrderStatus
}