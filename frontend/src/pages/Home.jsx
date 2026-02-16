import { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'
import { getAllProducts } from '../services/productService'
import { toast } from 'react-toastify'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['All', 'Electronics', 'Sports', 'Fashion', 'Home']

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory, searchQuery])

  const fetchProducts = async () => {
    try {
      setLoading(true)

      const data = await getAllProducts(selectedCategory, searchQuery)

      // ✅ SAFELY HANDLE DIFFERENT RESPONSE STRUCTURES
      if (Array.isArray(data)) {
        setProducts(data)
      } else if (Array.isArray(data?.products)) {
        setProducts(data.products)
      } else {
        setProducts([])
      }

    } catch (error) {
      toast.error('Failed to load products')
      console.error(error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-electric-blue w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-card-bg/80 border-2 border-electric-blue/50 rounded-full text-gray-100 placeholder-gray-400 focus:outline-none focus:border-electric-blue focus:shadow-lg focus:shadow-electric-blue/30 transition-all duration-300"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold uppercase tracking-wider text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-electric-blue text-deep-purple shadow-lg shadow-electric-blue/50'
                  : 'bg-card-bg/60 border border-electric-blue/30 hover:border-electric-blue hover:text-electric-blue'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <Loading />
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4 opacity-50">🔍</div>
          <h3 className="text-2xl font-semibold mb-2">No products found</h3>
          <p className="text-gray-400">Try adjusting your search or category filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product?._id || index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
