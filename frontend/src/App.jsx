import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import AdminPanel from './pages/AdminPanel'
import OrderConfirmation from './pages/OrderConfirmation'

function App() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="animated-bg"></div>
      
      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
          <Route path="/order-confirmation/:orderId" element={user ? <OrderConfirmation /> : <Navigate to="/login" />} />
          <Route 
            path="/admin" 
            element={user?.isAdmin ? <AdminPanel /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </div>
  )
}

export default App