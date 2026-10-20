import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await API.get('/expenses');
      setExpenses(res.data);
    } catch (err) {
      setError('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await API.delete(`/expenses/${id}`);
        setExpenses(expenses.filter((e) => e._id !== id));
      } catch (err) {
        alert('Could not delete expense.');
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">All Expenses</h1>
        <Link
          to="/expenses/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
        >
          + Add Expense
        </Link>
      </div>

      {loading && <p>Loading expenses...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && (
        <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase border-b">
                <th className="p-3">#</th>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No expenses found.
                  </td>
                </tr>
              ) : (
                expenses.map((exp, index) => (
                  <tr key={exp._id} className="hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-500">{index + 1}</td>
                    <td className="p-3 font-semibold text-gray-800">{exp.title}</td>
                    <td className="p-3 text-gray-600">{exp.category}</td>
                    <td className="p-3 font-medium text-gray-900">₹ {exp.amount}</td>
                    <td className="p-3 text-gray-500">{exp.date?.substring(0, 10)}</td>
                    <td className="p-3 text-center space-x-3">
                      <button
                        onClick={() => navigate(`/expenses/${exp._id}/edit`)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(exp._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}