import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long!')
      return
    }

    setLoading(true)

    try {
      const result = await register(formData.name, formData.email, formData.password)
      if (result.success) {
        toast.success('Registration successful!')
        navigate('/')
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.')
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
              Join FlashMart
            </h2>
            <p className="text-gray-400">Create your account to get started</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-electric-blue mb-2 uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-deep-purple/60 border border-electric-blue/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-electric-blue focus:shadow-lg focus:shadow-electric-blue/30 transition-all duration-300"
                placeholder="Your name"
              />
            </div>

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

            <div>
              <label className="block text-sm font-semibold text-electric-blue mb-2 uppercase tracking-wider">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
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
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-electric-blue hover:text-hot-pink font-semibold transition-colors">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register