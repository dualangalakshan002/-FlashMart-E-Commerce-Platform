import { FiShoppingCart } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { toast } from 'react-toastify'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error('Product is out of stock!')
      return
    }
    addToCart(product)
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <div className="bg-card-bg/80 border border-electric-blue/30 rounded-2xl overflow-hidden card-hover group">
      {/* Product Image */}
      <div className="relative h-64 bg-gradient-to-br from-card-bg to-deep-purple flex items-center justify-center overflow-hidden">
        <span className="text-7xl group-hover:scale-110 transition-transform duration-500">
          {product.emoji}
        </span>
        
        {/* Low Stock Badge */}
        {product.stock > 0 && product.stock < 20 && (
          <div className="absolute top-3 right-3 bg-hot-pink px-3 py-1 rounded-full text-xs font-bold">
            Only {product.stock} left!
          </div>
        )}
        
        {/* Out of Stock Badge */}
        {product.stock === 0 && (
          <div className="absolute top-3 right-3 bg-gray-600 px-3 py-1 rounded-full text-xs font-bold">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Category */}
        <div className="text-electric-blue text-xs font-semibold uppercase tracking-wider mb-2">
          {product.category}
        </div>

        {/* Name */}
        <h3 className="text-xl font-semibold mb-2 group-hover:text-electric-blue transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl font-bebas text-neon-yellow tracking-wide">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-400">
            Stock: {product.stock}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-3 rounded-full font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 btn-glow ${
            product.stock === 0
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-electric-blue to-hot-pink hover:shadow-lg hover:shadow-electric-blue/50 hover:scale-105'
          }`}
        >
          <FiShoppingCart className="w-5 h-5" />
          <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard