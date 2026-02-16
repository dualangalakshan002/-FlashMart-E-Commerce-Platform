import { useState, useEffect } from 'react'
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi'
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../services/productService'
import Loading from '../components/Loading'
import { toast } from 'react-toastify'

const AdminPanel = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    stock: '',
    emoji: '📦',
    description: ''
  })

  const categories = ['Electronics', 'Sports', 'Fashion', 'Home']
  const emojis = ['📱', '💻', '⌚', '🎧', '📷', '⌨️', '🖱️', '👟', '⚽', '🏀', '🧘', '💪', '👕', '👔', '🧥', '👗', '🕶️', '👜', '🏠', '🛋️', '🍳', '☕', '💡', '🖼️']

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts()
      setProducts(data)
    } catch (error) {
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData)
        toast.success('Product updated successfully!')
      } else {
        await createProduct(formData)
        toast.success('Product created successfully!')
      }
      
      fetchProducts()
      closeModal()
    } catch (error) {
      toast.error(error.message || 'Failed to save product')
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      emoji: product.emoji,
      description: product.description || ''
    })
    setShowModal(true)
  }

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    try {
      await deleteProduct(productId)
      toast.success('Product deleted successfully!')
      fetchProducts()
    } catch (error) {
      toast.error('Failed to delete product')
    }
  }

  const openModal = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      category: 'Electronics',
      price: '',
      stock: '',
      emoji: '📦',
      description: ''
    })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingProduct(null)
  }

  if (loading) return <Loading />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bebas tracking-wider bg-gradient-to-r from-electric-blue to-hot-pink bg-clip-text text-transparent">
          Admin Panel
        </h1>
        <button
          onClick={openModal}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-electric-blue to-hot-pink rounded-full font-semibold hover:shadow-lg hover:shadow-electric-blue/50 transition-all duration-300 btn-glow"
        >
          <FiPlus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-card-bg/80 border border-electric-blue/30 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-electric-blue/10 border-b-2 border-electric-blue">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Icon</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-electric-blue/20">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-electric-blue/5 transition-colors">
                  <td className="px-6 py-4 text-3xl">{product.emoji}</td>
                  <td className="px-6 py-4 font-semibold">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-electric-blue">{product.category}</td>
                  <td className="px-6 py-4 font-semibold text-neon-yellow">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.stock === 0 ? 'bg-red-500/20 text-red-400' :
                      product.stock < 20 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 bg-electric-blue text-deep-purple rounded-lg hover:bg-hot-pink hover:text-white transition-colors"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 bg-hot-pink text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card-bg border-2 border-electric-blue rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bebas tracking-wider mb-6 bg-gradient-to-r from-electric-blue to-hot-pink bg-clip-text text-transparent">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-electric-blue mb-2 uppercase tracking-wider">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-deep-purple/60 border border-electric-blue/30 rounded-lg text-gray-100 focus:outline-none focus:border-electric-blue transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-electric-blue mb-2 uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-deep-purple/60 border border-electric-blue/30 rounded-lg text-gray-100 focus:outline-none focus:border-electric-blue transition-all duration-300"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-electric-blue mb-2 uppercase tracking-wider">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-deep-purple/60 border border-electric-blue/30 rounded-lg text-gray-100 focus:outline-none focus:border-electric-blue transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-electric-blue mb-2 uppercase tracking-wider">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-deep-purple/60 border border-electric-blue/30 rounded-lg text-gray-100 focus:outline-none focus:border-electric-blue transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-electric-blue mb-2 uppercase tracking-wider">
                  Emoji Icon
                </label>
                <div className="grid grid-cols-8 md:grid-cols-12 gap-2 mb-2">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setFormData({ ...formData, emoji })}
                      className={`text-2xl p-2 rounded-lg transition-all ${
                        formData.emoji === emoji
                          ? 'bg-electric-blue scale-110'
                          : 'bg-deep-purple/40 hover:bg-deep-purple/80'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <div className="text-center text-4xl p-4 bg-deep-purple/40 rounded-lg">
                  {formData.emoji}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-electric-blue mb-2 uppercase tracking-wider">
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-deep-purple/60 border border-electric-blue/30 rounded-lg text-gray-100 focus:outline-none focus:border-electric-blue transition-all duration-300"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-electric-blue to-hot-pink rounded-full font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-electric-blue/50 transition-all duration-300 btn-glow"
                >
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-8 py-3 border-2 border-electric-blue rounded-full font-semibold uppercase tracking-wider hover:bg-electric-blue hover:text-deep-purple transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel