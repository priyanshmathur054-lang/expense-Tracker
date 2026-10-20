import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';

export default function ExpenseForm() {
  const { id } = useParams(); // If ID exists -> Edit Mode
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    paymentMethod: 'Cash',
    date: new Date().toISOString().substring(0, 10),
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchSingleExpense();
    }
  }, [id]);

  const fetchSingleExpense = async () => {
    try {
      const res = await API.get(`/expenses/${id}`);
      const data = res.data;
      setFormData({
        title: data.title || '',
        amount: data.amount || '',
        category: data.category || '',
        paymentMethod: data.paymentMethod || 'Cash',
        date: data.date ? data.date.substring(0, 10) : '',
        description: data.description || '',
      });
    } catch (err) {
      setError('Could not fetch expense details.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEdit) {
        await API.put(`/expenses/${id}`, formData);
      } else {
        await API.post('/expenses', formData);
      }
      navigate('/expenses');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-bold mb-4">{isEdit ? 'Edit Expense' : 'Add Expense'}</h2>

      {error && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded p-2 text-sm"
              placeholder="Enter title"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              required
              value={formData.amount}
              onChange={handleChange}
              className="w-full border rounded p-2 text-sm"
              placeholder="Enter amount"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded p-2 text-sm"
            >
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Education">Education</option>
              <option value="Utilities">Utilities</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full border rounded p-2 text-sm"
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Date</label>
          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded p-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded p-2 text-sm"
            placeholder="Enter description (optional)"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Saving...' : 'Save Expense'}
        </button>
      </form>
    </div>
  );
}