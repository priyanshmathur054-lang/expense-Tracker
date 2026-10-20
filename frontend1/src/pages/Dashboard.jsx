// 3. Dashboard Component with Table Layout
function Dashboard() {
  const [expenses] = useState(initialExpenses);
  const totalAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6 max-w-5xl">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      {/* Summary Cards */}
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

      {/* Recent Expenses Table */}
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