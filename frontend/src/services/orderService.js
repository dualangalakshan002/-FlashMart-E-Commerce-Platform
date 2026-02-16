import axios from 'axios'

const API_URL = '/api/orders'

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(API_URL, orderData)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const getUserOrders = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const getAllOrders = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/${orderId}`)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const validateDiscountCode = async (code) => {
  try {
    const response = await axios.post(`${API_URL}/validate-discount`, { code })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}