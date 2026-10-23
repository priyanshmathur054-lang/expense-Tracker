import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const recentExpenses = [
    { id: 1, title: 'Lunch', category: 'Food', amount: 250, date: '12 Oct 2024' },
    { id: 2, title: 'Taxi', category: 'Transport', amount: 350, date: '11 Oct 2024' },
    { id: 3, title: 'Shopping', category: 'Lifestyle', amount: 1200, date: '10 Oct 2024' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white flex flex-col justify-between p-6 shadow-lg">
        <div>
          <h1 className="text-xl font-bold mb-8 tracking-wide">Expense Tracker</h1>
          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 bg-blue-700 rounded-xl font-medium text-sm transition"
            >
              📊 Dashboard
            </Link>
            <Link
              to="/expenses"
              className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700/50 rounded-xl font-medium text-sm transition"
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
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Dashboard</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm font-medium">Total Expenses</p>
            <h3 className="text-3xl font-bold text-emerald-600 mt-2">₹ 1,800</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm font-medium">Total Records</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-2">3</h3>
          </div>
        </div>

        {/* Recent Expenses Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Expenses</h3>
          <div className="divide-y divide-slate-100">
            {recentExpenses.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-500">{item.category}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-800 text-sm">₹ {item.amount}</span>
                  <p className="text-xs text-slate-400">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;