import { Link } from 'react-router-dom'
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const { subtotal, discount, total } = getCartTotal()

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center py-20">
          <div className="text-8xl mb-6 opacity-50">🛒</div>
          <h2 className="text-3xl font-bebas tracking-wider mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">Add some products to get started!</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-electric-blue to-hot-pink px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-electric-blue/50 transition-all duration-300 btn-glow"
          >
            <FiShoppingBag className="w-5 h-5" />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bebas tracking-wider mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-card-bg/80 border border-electric-blue/30 rounded-xl p-6 flex items-center space-x-6 hover:border-electric-blue transition-all duration-300"
            >
              {/* Product Image */}
              <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-card-bg to-deep-purple rounded-lg flex items-center justify-center text-4xl">
                {item.emoji}
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <div className="text-xs text-electric-blue font-semibold uppercase mb-1">
                  {item.category}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <div className="text-2xl font-bebas text-neon-yellow">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-deep-purple/60 rounded-full px-4 py-2">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-electric-blue text-deep-purple hover:bg-hot-pink hover:text-white transition-colors"
                  >
                    <FiMinus />
                  </button>
                  <span className="font-semibold w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-electric-blue text-deep-purple hover:bg-hot-pink hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiPlus />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="p-2 text-hot-pink hover:bg-hot-pink/10 rounded-full transition-colors"
                  title="Remove from cart"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card-bg/80 border-2 border-electric-blue/30 rounded-xl p-6 sticky top-24">
            <h2 className="text-2xl font-bebas tracking-wider mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-lg text-green-400">
                  <span>Discount:</span>
                  <span className="font-semibold">-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="border-t-2 border-electric-blue/30 pt-4 flex justify-between text-2xl font-bebas">
                <span>Total:</span>
                <span className="text-neon-yellow">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full py-3 bg-gradient-to-r from-hot-pink to-electric-blue rounded-full font-bold text-center uppercase tracking-wider hover:shadow-lg hover:shadow-hot-pink/50 transition-all duration-300 btn-glow"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/"
              className="block w-full mt-4 py-3 border-2 border-electric-blue rounded-full font-semibold text-center uppercase tracking-wider hover:bg-electric-blue hover:text-deep-purple transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart