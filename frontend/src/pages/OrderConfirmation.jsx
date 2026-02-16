import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiCheckCircle, FiPackage } from 'react-icons/fi'
import { getOrderById } from '../services/orderService'
import Loading from '../components/Loading'
import { toast } from 'react-toastify'

const OrderConfirmation = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
  }, [orderId])

  const fetchOrder = async () => {
    try {
      const data = await getOrderById(orderId)
      setOrder(data)
    } catch (error) {
      toast.error('Failed to load order details')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bebas mb-4">Order not found</h2>
        <Link to="/" className="text-electric-blue hover:text-hot-pink">
          Return to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-card-bg/80 border-2 border-electric-blue/30 rounded-2xl p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6 animate-bounce">
          <FiCheckCircle className="w-24 h-24 mx-auto text-green-400" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bebas tracking-wider bg-gradient-to-r from-electric-blue to-hot-pink bg-clip-text text-transparent mb-4">
          Order Confirmed!
        </h1>

        {/* Order Number */}
        <div className="mb-8">
          <p className="text-gray-400 mb-2">Order Number</p>
          <p className="text-3xl font-bebas text-neon-yellow tracking-wider">
            #{order.orderNumber}
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-deep-purple/60 border border-electric-blue/20 rounded-xl p-6 mb-8 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-electric-blue mb-3">Order Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Items:</span>
                  <span>{order.items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-400 font-semibold">{order.status}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-electric-blue mb-3">Shipping Address</h3>
              <div className="text-sm text-gray-300">
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-deep-purple/60 border border-electric-blue/20 rounded-xl p-6 mb-8 text-left">
          <h3 className="text-lg font-semibold text-electric-blue mb-4 flex items-center">
            <FiPackage className="mr-2" />
            Order Items
          </h3>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{item.product.emoji}</span>
                  <div>
                    <div className="font-semibold">{item.product.name}</div>
                    <div className="text-gray-400">Qty: {item.quantity}</div>
                  </div>
                </div>
                <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-deep-purple/60 border border-electric-blue/20 rounded-xl p-6 mb-8">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold">${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-400">
                <span>Discount:</span>
                <span className="font-semibold">-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t-2 border-electric-blue/30 pt-3 flex justify-between text-2xl font-bebas">
              <span>Total Paid:</span>
              <span className="text-neon-yellow">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Confirmation Message */}
        <p className="text-gray-400 mb-8">
          Thank you for shopping with FlashMart! A confirmation email has been sent to your inbox.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3 bg-gradient-to-r from-electric-blue to-hot-pink rounded-full font-semibold uppercase tracking-wider hover:shadow-lg hover:shadow-electric-blue/50 transition-all duration-300 btn-glow"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation