import React, { createContext, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';

const AuthContext = createContext();
const ExpenseContext = createContext();

// 1. Auth Provider
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const login = (userData, authToken) => {
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Initial Sample Data
const initialExpenses = [
  { _id: '1', title: 'Lunch', category: 'Food', amount: 250, date: '2024-10-12', paymentMethod: 'UPI' },
  { _id: '2', title: 'Taxi', category: 'Transport', amount: 350, date: '2024-10-11', paymentMethod: 'Cash' },
  { _id: '3', title: 'Shopping', category: 'Lifestyle', amount: 1200, date: '2024-10-10', paymentMethod: 'Card' },
];

// 2. Expense Provider (Manages Add/Delete state globally across pages)
const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(initialExpenses);

  const addExpense = (expenseData) => {
    const newExpense = {
      _id: Date.now().toString(),
      ...expenseData,
      date: new Date().toISOString().split('T')[0],
    };
    setExpenses([newExpense, ...expenses]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(e => e._id !== id));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" replace />;
};

const DashboardLayout = ({ children }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between shadow-lg">
        <div className="p-5">
          <h2 className="text-xl font-bold mb-8 text-blue-400 tracking-wide">Expense Tracker</h2>
          <nav className="space-y-2">
            <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 font-medium transition">📊 Dashboard</Link>
            <Link to="/expenses" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 font-medium transition">💳 Expenses</Link>
            <Link to="/expenses/add" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 font-medium transition">➕ Add Expense</Link>
          </nav>
        </div>
        <div className="p-5 border-t border-slate-800">
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-red-400 hover:bg-slate-800 font-medium transition flex items-center gap-3"
          >
            🚪 Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
};

// 3. Login Page
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email }, 'dummy-jwt-token-123');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 w-full">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Login to your expense tracker</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter password" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition">Login</button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}

// 4. Register Page
function Register() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 w-full">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
        <form onSubmit={(e) => { e.preventDefault(); navigate('/login'); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" required className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Enter name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" required className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Enter email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" required className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Create password" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition">Register</button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

// 5. Dashboard Component
function Dashboard() {
  const { expenses } = useContext(ExpenseContext);
  const totalAmount = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div className="space-y-6 max-w-5xl">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <span className="text-sm font-medium text-gray-500">Total Expenses</span>
          <p className="text-3xl font-bold text-gray-800 mt-2">₹ {totalAmount.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <span className="text-sm font-medium text-gray-500">Total Records</span>
          <p className="text-3xl font-bold text-gray-800 mt-2">{expenses.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Recent Expenses</h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase border-b">
              <th className="p-4">#</th>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {expenses.map((exp, index) => (
              <tr key={exp._id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-500">{index + 1}</td>
                <td className="p-4 font-semibold text-gray-800">{exp.title}</td>
                <td className="p-4 text-gray-600">{exp.category}</td>
                <td className="p-4 font-medium text-gray-900">₹ {exp.amount}</td>
                <td className="p-4 text-gray-500">{exp.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 6. Expenses Listing Component
function Expenses() {
  const { expenses, deleteExpense } = useContext(ExpenseContext);

  return (
    <div className="space-y-4 max-w-5xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">All Expenses</h1>
        <Link to="/expenses/add" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          + Add Expense
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase border-b">
              <th className="p-4">#</th>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {expenses.map((exp, index) => (
              <tr key={exp._id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-500">{index + 1}</td>
                <td className="p-4 font-semibold text-gray-800">{exp.title}</td>
                <td className="p-4 text-gray-600">{exp.category}</td>
                <td className="p-4 font-medium text-gray-900">₹ {exp.amount}</td>
                <td className="p-4 text-gray-500">{exp.date}</td>
                <td className="p-4 text-center space-x-3">
                  <button onClick={() => deleteExpense(exp._id)} className="text-red-600 hover:text-red-800">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 7. Add Expense Form Component
function ExpenseForm() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const { addExpense } = useContext(ExpenseContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({ title, amount: Number(amount), category });
    navigate('/expenses');
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border mt-4">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Add New Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Title</label>
          <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Dinner" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Amount (₹)</label>
            <input type="number" required value={amount} onChange={e => setAmount(e.target.value)} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Education">Education</option>
            </select>
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition mt-4">Save Expense</button>
      </form>
    </div>
  );
}

// Main App Setup
export default function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
            <Route path="/expenses" element={<ProtectedRoute><DashboardLayout><Expenses /></DashboardLayout></ProtectedRoute>} />
            <Route path="/expenses/add" element={<ProtectedRoute><DashboardLayout><ExpenseForm /></DashboardLayout></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </ExpenseProvider>
    </AuthProvider>
  );
}