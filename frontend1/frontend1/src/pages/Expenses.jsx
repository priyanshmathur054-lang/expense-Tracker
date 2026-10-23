import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Expenses = () => {
  const navigate = useNavigate();

  // Sample data (apni API ya state se replace kar sakte hain)
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Lunch', category: 'Food', amount: 250, date: '12 Oct 2024' },
    { id: 2, title: 'Taxi', category: 'Transport', amount: 350, date: '11 Oct 2024' },
    { id: 3, title: 'Shopping', category: 'Lifestyle', amount: 1200, date: '10 Oct 2024' },
    { id: 4, title: 'Movie', category: 'Entertainment', amount: 400, date: '09 Oct 2024' },
    { id: 5, title: 'Book', category: 'Education', amount: 600, date: '08 Oct 2024' },
  ]);

  const handleDelete = (id) => {
    setExpenses(expenses.filter(item => item.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white flex flex-col justify-between p-6 shadow-lg">
        <div>
          <h1 className="text-xl font-bold mb-8 tracking-wide">Expense Tracker</h1>
          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700/50 rounded-xl font-medium text-sm transition"
            >
              📊 Dashboard
            </Link>
            <Link
              to="/expenses"
              className="flex items-center gap-3 px-4 py-3 bg-blue-700 rounded-xl font-medium text-sm transition"
            >
              💳 Expenses
            </Link>
            <Link
              to="/expenses/add"
              className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700/50 rounded-xl font-medium text-sm transition"
            >
              ➕ Add Expense
            </Link>
          </nav>
        </div>
        <div>
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-3 px-4 py-3 w-full hover:bg-blue-700/50 rounded-xl font-medium text-sm transition text-left"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Expense Listing</h2>
          <Link
            to="/expenses/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm shadow-md transition flex items-center gap-2"
          >
            + Add Expense
          </Link>
        </div>

        {/* Expenses Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">All Expenses</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-500 text-xs uppercase font-semibold">
                  <th className="py-3 px-6">#</th>
                  <th className="py-3 px-6">Title</th>
                  <th className="py-3 px-6">Category</th>
                  <th className="py-3 px-6">Amount</th>
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {expenses.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="py-4 px-6 text-slate-500">{index + 1}</td>
                    <td className="py-4 px-6 font-semibold text-slate-800">{item.title}</td>
                    <td className="py-4 px-6 text-slate-600">{item.category}</td>
                    <td className="py-4 px-6 font-medium text-slate-800">₹ {item.amount}</td>
                    <td className="py-4 px-6 text-slate-500">{item.date}</td>
                    <td className="py-4 px-6 text-center space-x-3">
                      <button
                        onClick={() => navigate(`/expenses/edit/${item.id}`)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-rose-500 hover:text-rose-700 font-medium"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;