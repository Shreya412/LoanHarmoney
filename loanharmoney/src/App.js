import React, { useState } from 'react';
import { AlertCircle, Heart, Filter, TrendingUp, Award, CheckCircle, Clock, DollarSign, ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './index.css';

const LoanHarmony = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loanRequests, setLoanRequests] = useState([]);
  const [user, setUser] = useState({ type: 'lender', karma: 0 });
  const [filter, setFilter] = useState({ minAmount: '', maxAmount: '', minDuration: '', maxDuration: '' });
  const [expandedCard, setExpandedCard] = useState(null);
  const [newRequestForm, setNewRequestForm] = useState({
    amount: '',
    purpose: '',
    duration: '',
    creditScore: '',
    story: ''
  });
  const [notification, setNotification] = useState(null);

  // Simulated loan data
  const lenderMatchData = [
    { purpose: 'Education', amount: 5000, creditScore: 680, duration: 24, successRate: 92, karma: 15 },
    { purpose: 'Business', amount: 15000, creditScore: 720, duration: 36, successRate: 88, karma: 25 },
    { purpose: 'Home', amount: 20000, creditScore: 750, duration: 60, successRate: 95, karma: 30 },
    { purpose: 'Medical', amount: 8000, creditScore: 650, duration: 18, successRate: 85, karma: 20 },
  ];

  const requestTrends = [
    { month: 'Jan', requests: 150, matches: 120 },
    { month: 'Feb', requests: 180, matches: 145 },
    { month: 'Mar', requests: 210, matches: 170 },
    { month: 'Apr', requests: 195, matches: 160 },
    { month: 'May', requests: 220, matches: 185 },
  ];

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    const newRequest = {
      id: Date.now(),
      ...newRequestForm,
      karma: 5,
      trustScore: 0,
      status: 'pending',
      matches: 0,
      createdAt: new Date().toISOString()
    };
    setLoanRequests([...loanRequests, newRequest]);
    setNotification({ type: 'success', message: 'Loan request submitted successfully!' });
    setNewRequestForm({ amount: '', purpose: '', duration: '', creditScore: '', story: '' });
    
    setTimeout(() => setNotification(null), 3000);
  };

  const handleExpressInterest = (requestId) => {
    setLoanRequests(loanRequests.map(request => {
      if (request.id === requestId) {
        return { ...request, matches: (request.matches || 0) + 1 };
      }
      return request;
    }));
    setUser(prev => ({ ...prev, karma: prev.karma + 1 }));
    setNotification({ type: 'success', message: '+1 Karma! Interest recorded' });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredRequests = loanRequests.filter(request => {
    const amount = parseInt(request.amount);
    const duration = parseInt(request.duration);
    return (!filter.minAmount || amount >= parseInt(filter.minAmount)) &&
           (!filter.maxAmount || amount <= parseInt(filter.maxAmount)) &&
           (!filter.minDuration || duration >= parseInt(filter.minDuration)) &&
           (!filter.maxDuration || duration <= parseInt(filter.maxDuration));
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.message}
        </div>
      )}

      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              LoanHarmoney
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setUser(prev => ({ ...prev, type: prev.type === 'lender' ? 'borrower' : 'lender' }))}
              className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
            >
              Switch to {user.type === 'lender' ? 'Borrower' : 'Lender'}
            </button>
            <div className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg">
              <Award className="h-5 w-5" />
              <span className="font-semibold">{user.karma} Karma</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === 'requests' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {user.type === 'lender' ? 'Browse Requests' : 'My Requests'}
          </button>
          {user.type === 'borrower' && (
            <button
              onClick={() => setActiveTab('submit')}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === 'submit' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              New Request
            </button>
          )}
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Trust Score</h3>
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-indigo-600 mb-2">85%</div>
                <p className="text-sm text-gray-600">Based on your karma and activity</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Total Matches</h3>
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-indigo-600 mb-2">142</div>
                <p className="text-sm text-gray-600">This month: +23 matches</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Success Rate</h3>
                  <Award className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="text-3xl font-bold text-indigo-600 mb-2">92%</div>
                <p className="text-sm text-gray-600">Loans successfully funded</p>
              </div>
            </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Trends</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={requestTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="requests" stroke="#4f46e5" strokeWidth={2} />
                      <Line type="monotone" dataKey="matches" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Requests</h3>
                <div className="space-y-4">
                  {lenderMatchData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium text-gray-900">{data.purpose} Loan</p>
                        <p className="text-sm text-gray-600">${data.amount.toLocaleString()} • {data.duration} months</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-indigo-600">{data.successRate}% match rate</p>
                        <p className="text-sm text-gray-600">{data.karma} karma potential</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div>
            {user.type === 'lender' && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Requests</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
                    <input
                      type="number"
                      value={filter.minAmount}
                      onChange={(e) => setFilter(prev => ({ ...prev, minAmount: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="$"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
                    <input
                      type="number"
                      value={filter.maxAmount}
                      onChange={(e) => setFilter(prev => ({ ...prev, maxAmount: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="$"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Duration (months)</label>
                    <input
                      type="number"
                      value={filter.minDuration}
                      onChange={(e) => setFilter(prev => ({ ...prev, minDuration: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Months"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Duration (months)</label>
                    <input
                      type="number"
                      value={filter.maxDuration}
                      onChange={(e) => setFilter(prev => ({ ...prev, maxDuration: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Months"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-102">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{request.purpose} Loan</h3>
                      <p className="text-sm text-gray-600">Credit Score: {request.creditScore}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-indigo-600">${parseInt(request.amount).toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{request.duration} months</p>
                    </div>
                  </div>

                  {expandedCard === request.id && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Borrower's Story</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{request.story || 'No story provided'}</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600">Interest: {request.matches || 0} lenders</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-600">{request.karma} karma</span>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => setExpandedCard(expandedCard === request.id ? null : request.id)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                      >
                        {expandedCard === request.id ? 'Less Info' : 'More Info'}
                      </button>
                      {user.type === 'lender' && (
                        <button
                          onClick={() => handleExpressInterest(request.id)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                          Express Interest
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {filteredRequests.length === 0 && (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-600">No loan requests found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'submit' && user.type === 'borrower' && (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit a Loan Request</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <div className="relative">
                  <DollarSign className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="number"
                    required
                    value={newRequestForm.amount}
                    onChange={(e) => setNewRequestForm(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                <select
                  required
                  value={newRequestForm.purpose}
                  onChange={(e) => setNewRequestForm(prev => ({ ...prev, purpose: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select purpose</option>
                  <option value="Education">Education</option>
                  <option value="Business">Business</option>
                  <option value="Home">Home</option>
                  <option value="Medical">Medical</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (months)</label>
                <div className="relative">
                  <Clock className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="number"
                    required
                    value={newRequestForm.duration}
                    onChange={(e) => setNewRequestForm(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter duration"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Credit Score</label>
                <input
                  type="number"
                  required
                  value={newRequestForm.creditScore}
                  onChange={(e) => setNewRequestForm(prev => ({ ...prev, creditScore: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter credit score"
                  min="300"
                  max="850"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Story (Optional)</label>
                <textarea
                  value={newRequestForm.story}
                  onChange={(e) => setNewRequestForm(prev => ({ ...prev, story: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows="4"
                  placeholder="Tell lenders why you need this loan and how you plan to repay it..."
                />
              </div>

              <button
                onClick={handleSubmitRequest}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
              >
                Submit Loan Request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanHarmony;