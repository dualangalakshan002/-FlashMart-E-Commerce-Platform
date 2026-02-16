import axios from 'axios'

const API_URL = '/api/products'

export const getAllProducts = async (category = '', search = '') => {
  try {
    const params = {}
    if (category && category !== 'All') params.category = category
    if (search) params.search = search
    
    const response = await axios.get(API_URL, { params })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}