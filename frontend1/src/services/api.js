import axios from 'axios';

// Aapke Express backend ka base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Har request ke sath JWT token attach karne ke liye interceptor
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// API Endpoints
export const loginUser = (formData) => API.post('/auth/login', formData);
export const registerUser = (formData) => API.post('/auth/register', formData);

export const getExpenses = () => API.get('/expenses');
export const addExpense = (expenseData) => API.post('/expenses', expenseData);
export const updateExpense = (id, expenseData) => API.put(`/expenses/${id}`, expenseData);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);