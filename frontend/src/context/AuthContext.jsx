import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

// ✅ Set Base URL from environment variable
axios.defaults.baseURL = import.meta.env.VITE_API_URL

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // 🔄 Check login on app load
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (token && userData) {
      setUser(JSON.parse(userData))
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    setLoading(false)
  }, [])

  // 🔐 Login
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      })

      const { token, user: userData } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setUser(userData)

      return { success: true }
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || 'Login failed',
      }
    }
  }

  // 📝 Register
  const register = async (name, email, password) => {
    try {
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password,
      })

      const { token, user: userData } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setUser(userData)

      return { success: true }
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || 'Registration failed',
      }
    }
  }

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
