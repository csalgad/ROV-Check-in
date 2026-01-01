
import React, { useState } from 'react';
import { VoterRecord, CheckInStatus } from '../types';

interface DashboardProps {
  records: VoterRecord[];
  onAddRecord: (record: Omit<VoterRecord, 'id'>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ records, onAddRecord }) => {
  const [formData, setFormData] = useState({
    visitorId: '',
    checkInTime: '',
    checkInId: '',
    status: CheckInStatus.Active
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateCheckInId = () => {
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const firstChar = alpha[Math.floor(Math.random() * alpha.length)];
    const numPart = Math.floor(1000 + Math.random() * 9000).toString();
    setFormData(prev => ({ ...prev, checkInId: firstChar + numPart }));
  };

  const validate = () => {
    const newErrors: string[] = [];
    if (!formData.visitorId) newErrors.push('Visitor ID is required');
    if (!formData.checkInTime) newErrors.push('Check In Time is required');
    
    // Check In ID: 5 digits, 1 alpha, 4 numerical
    const checkInIdRegex = /^[A-Z][0-9]{4}$/;
    if (!checkInIdRegex.test(formData.checkInId)) {
      newErrors.push('Check In ID must start with a letter followed by 4 digits');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onAddRecord({
        ...formData,
        checkInDate: '06/02/2026'
      });
      // Reset form
      setFormData({
        visitorId: '',
        checkInTime: '',
        checkInId: '',
        status: CheckInStatus.Active
      });
      setErrors([]);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Form Section */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center">
          <i className="fas fa-plus-circle mr-2 text-blue-500"></i>
          New Voter Check-In
        </h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Visitor ID</label>
            <input
              type="text"
              name="visitorId"
              value={formData.visitorId}
              onChange={handleInputChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="e.g. V-2026"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Check In Date</label>
            <input
              type="text"
              readOnly
              value="06/02/2026"
              className="w-full border border-slate-200 bg-slate-50 text-slate-400 rounded-lg px-3 py-2 cursor-not-allowed"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Check In Time</label>
            <input
              type="time"
              name="checkInTime"
              value={formData.checkInTime}
              onChange={handleInputChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          
          <div className="space-y-1 relative">
            <label className="text-xs font-semibold text-slate-500 uppercase">Check In ID</label>
            <div className="flex space-x-2">
              <input
                type="text"
                name="checkInId"
                maxLength={5}
                value={formData.checkInId}
                onChange={handleInputChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="A1234"
              />
              <button
                type="button"
                onClick={generateCheckInId}
                className="bg-slate-100 hover:bg-slate-200 p-2 rounded-lg text-slate-600 transition-colors"
                title="Generate Random ID"
              >
                <i className="fas fa-sync-alt"></i>
              </button>
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value={CheckInStatus.Active}>Active</option>
              <option value={CheckInStatus.Pending}>Pending</option>
              <option value={CheckInStatus.Cancelled}>Cancelled</option>
            </select>
          </div>
          
          <div className="lg:col-span-5 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg transition-colors shadow-sm"
            >
              Submit Check-In
            </button>
          </div>
        </form>

        {errors.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <ul className="list-disc list-inside text-sm text-red-600">
              {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
        )}
      </section>

      {/* Table Section */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Recent Activity Log</h2>
          <span className="text-sm font-medium text-slate-500">
            Total Records: {records.length}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Visitor ID</th>
                <th className="px-6 py-4">Check In Date</th>
                <th className="px-6 py-4">Check In Time</th>
                <th className="px-6 py-4">Check In ID</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-700">{record.visitorId}</td>
                  <td className="px-6 py-4 text-slate-600">{record.checkInDate}</td>
                  <td className="px-6 py-4 text-slate-600">{record.checkInTime}</td>
                  <td className="px-6 py-4 font-mono text-blue-600">{record.checkInId}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      record.status === CheckInStatus.Active ? 'bg-green-100 text-green-700' :
                      record.status === CheckInStatus.Pending ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    No records found for today.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
