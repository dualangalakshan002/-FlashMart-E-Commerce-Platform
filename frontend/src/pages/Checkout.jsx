import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createOrder, validateDiscountCode } from '../services/orderService'
import { toast } from 'react-toastify'

const Checkout = () => {
  const { cart, getCartTotal, clearCart, applyDiscount, discount: appliedDiscount } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [discountLoading, setDiscountLoading] = useState(false)

  const { subtotal, discount, total } = getCartTotal()

  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  })

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      toast.error('Please enter a discount code')
      return
    }

    setDiscountLoading(true)
    try {
      const discountData = await validateDiscountCode(discountCode)
      applyDiscount(discountData)
      toast.success(`Discount code ${discountCode} applied!`)
    } catch (error) {
      toast.error(error.message || 'Invalid discount code')
    } finally {
      setDiscountLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const orderData = {
        user: user._id,
        items: cart.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: shippingInfo,
        subtotal,
        discount,
        total,
        discountCode: appliedDiscount?.code || null
      }

      const order = await createOrder(orderData)
      clearCart()
      toast.success('Order placed successfully!')
      navigate(`/order-confirmation/${order._id}`)
    } catch (error) {
      toast.error(error.message || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bebas tracking-wider mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Shipping Information */}
            <div className="bg-card-bg/80 border border-electric-blue/30 rounded-xl p-6">
              <h2 className="text-2xl font-bebas tracking-wider mb-6">Shipping Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-electric-blue mb-2 uppercase tracking-wider">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-deep-purple/60 border border-electric-blue/30 rounded-lg text-gray-100 focus:outline-none focus:border-electric-blue transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-electric-blue mb-2 uppercase tracking-wider">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-deep-purple/60 border border-electric-blue/30 rounded-lg text-gray-100 focus:outline-none focus:border-electric-blue transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-electric-blue mb-2 uppercase tracking-wider">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-deep-purple/60 border border-electric-blue/30 rounded-lg text-gray-100 focus:outline-none focus:border-electric-blue transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-electric-blue mb-2 uppercase tracking-wider">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-deep-purple/60 border border-electric-blue/30 rounded-lg text-gray-100 focus:outline-none focus:border-electric-blue transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method (Mock) */}
            <div className="bg-card-bg/80 border border-electric-blue/30 rounded-xl p-6">
              <h2 className="text-2xl font-bebas tracking-wider mb-6">Payment Method</h2>
              <div className="bg-deep-purple/40 border border-electric-blue/20 rounded-lg p-4">
                <p className="text-gray-300">
                  💳 Payment processing is simulated for this demo. No actual payment will be processed.
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card-bg/80 border-2 border-electric-blue/30 rounded-xl p-6 sticky top-24">
            <h2 className="text-2xl font-bebas tracking-wider mb-6">Order Summary</h2>

            {/* Cart Items */}
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center space-x-3 text-sm">
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-gray-400">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            {/* Discount Code */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-electric-blue mb-2 uppercase tracking-wider">
                Discount Code
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                  placeholder="FLASH10, FLASH20, SAVE50"
                  disabled={appliedDiscount}
                  className="flex-1 px-4 py-2 bg-deep-purple/60 border border-electric-blue/30 rounded-lg text-gray-100 focus:outline-none focus:border-electric-blue transition-all duration-300 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={handleApplyDiscount}
                  disabled={discountLoading || appliedDiscount}
                  className="px-4 py-2 bg-electric-blue text-deep-purple rounded-lg font-semibold hover:bg-hot-pink hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Apply
                </button>
              </div>
              {appliedDiscount && (
                <div className="mt-2 text-green-400 text-sm font-semibold">
                  ✓ Code {appliedDiscount.code} applied!
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount:</span>
                  <span className="font-semibold">-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="border-t-2 border-electric-blue/30 pt-3 flex justify-between text-2xl font-bebas">
                <span>Total:</span>
                <span className="text-neon-yellow">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-hot-pink to-electric-blue rounded-full font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-hot-pink/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-glow"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout