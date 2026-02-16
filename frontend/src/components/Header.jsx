import { Link, useNavigate } from 'react-router-dom'
import { FiShoppingCart, FiUser, FiLogOut, FiSettings } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const Header = () => {
  const { user, logout } = useAuth()
  const { getCartCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Safe values
  const userInitial = user?.name?.[0]?.toUpperCase() || 'U'
  const userName = user?.name || 'User'
  const cartCount = getCartCount ? getCartCount() : 0

  return (
    <header className="bg-dark-bg/90 backdrop-blur-xl border-b-2 border-electric-blue sticky top-0 z-50 shadow-lg shadow-electric-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl md:text-4xl">⚡</span>
            <h1 className="text-2xl md:text-3xl font-bebas tracking-wider bg-gradient-to-r from-electric-blue to-hot-pink bg-clip-text text-transparent animate-glow">
              FLASHMART
            </h1>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-4 md:space-x-6">

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 hover:text-electric-blue transition-colors duration-300"
            >
              <FiShoppingCart className="w-6 h-6" />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-hot-pink text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-3 md:space-x-4">

                {/* Admin Button */}
                {user?.isAdmin && (
                  <Link
                    to="/admin"
                    className="p-2 hover:text-electric-blue transition-colors duration-300"
                    title="Admin Panel"
                  >
                    <FiSettings className="w-6 h-6" />
                  </Link>
                )}

                {/* User Avatar */}
                <div className="flex items-center space-x-2 bg-card-bg/60 rounded-full px-3 md:px-4 py-2 border border-electric-blue/30">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-electric-blue to-hot-pink flex items-center justify-center font-bold">
                    {userInitial}
                  </div>
                  <span className="hidden md:inline font-medium">
                    {userName}
                  </span>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="p-2 hover:text-hot-pink transition-colors duration-300"
                  title="Logout"
                >
                  <FiLogOut className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-gradient-to-r from-electric-blue to-hot-pink px-4 md:px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-electric-blue/50 transition-all duration-300 btn-glow"
              >
                <FiUser className="w-5 h-5" />
                <span className="hidden md:inline">Login</span>
              </Link>
            )}

          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
