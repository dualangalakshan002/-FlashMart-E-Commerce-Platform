import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await login(formData.email, formData.password)
      if (result.success) {
        toast.success('Login successful!')
        navigate('/')
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-card-bg/80 backdrop-blur-xl border-2 border-electric-blue/30 rounded-2xl p-8 shadow-2xl shadow-electric-blue/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bebas tracking-wider bg-gradient-to-r from-electric-blue to-hot-pink bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-400">Login to your FlashMart account</p>
          </div>

          {/* Demo Credentials */}
          <div className="bg-deep-purple/50 border border-electric-blue/20 rounded-lg p-4 mb-6 text-sm">
            <p className="text-electric-blue font-semibold mb-2">Demo Credentials:</p>
            <p className="text-gray-300">Admin: admin@flashmart.com / admin123</p>
            <p className="text-gray-300">User: user@flashmart.com / user123</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-electric-blue mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-deep-purple/60 border border-electric-blue/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-electric-blue focus:shadow-lg focus:shadow-electric-blue/30 transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-electric-blue mb-2 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-deep-purple/60 border border-electric-blue/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-electric-blue focus:shadow-lg focus:shadow-electric-blue/30 transition-all duration-300"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-electric-blue to-hot-pink rounded-full font-bold text-lg uppercase tracking-wider hover:shadow-lg hover:shadow-electric-blue/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-glow"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-electric-blue hover:text-hot-pink font-semibold transition-colors">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login