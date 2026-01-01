
import React, { useState, useCallback } from 'react';
import { CheckInStatus, VoterRecord, ViewType } from './types';
import Dashboard from './components/Dashboard';
import LiveFeed from './components/LiveFeed';
import AIChat from './components/AIChat';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [records, setRecords] = useState<VoterRecord[]>([
    {
      id: '1',
      visitorId: 'V-1002',
      checkInDate: '06/02/2026',
      checkInTime: '08:15 AM',
      checkInId: 'A8429',
      status: CheckInStatus.Active
    },
    {
      id: '2',
      visitorId: 'V-1003',
      checkInDate: '06/02/2026',
      checkInTime: '09:02 AM',
      checkInId: 'B1102',
      status: CheckInStatus.Pending
    }
  ]);

  const addRecord = useCallback((newRecord: Omit<VoterRecord, 'id'>) => {
    setRecords(prev => [{ ...newRecord, id: Date.now().toString() }, ...prev]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative pb-24">
      {/* Header */}
      <header className="bg-slate-900 text-white p-4 shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <i className="fas fa-check-to-slot text-xl"></i>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Registrar Hub</h1>
          </div>
          <div className="hidden md:flex space-x-4">
            <div className="bg-slate-800 px-3 py-1 rounded text-sm text-slate-300">
              <span className="font-semibold text-white">Election Date:</span> 06/02/2026
            </div>
            <div className="bg-slate-800 px-3 py-1 rounded text-sm text-slate-300">
              <span className="font-semibold text-white">Station:</span> District 04
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4 md:p-6">
        {currentView === 'dashboard' ? (
          <Dashboard records={records} onAddRecord={addRecord} />
        ) : (
          <LiveFeed onClose={() => setCurrentView('dashboard')} />
        )}
      </main>

      {/* Persistent Bottom Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-20">
        <div className="container mx-auto flex justify-center space-x-4 md:space-x-8">
          <button
            onClick={() => setIsAIChatOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg active:scale-95"
          >
            <i className="fas fa-robot"></i>
            <span>AI Chat</span>
          </button>
          
          <button
            onClick={() => setCurrentView(prev => prev === 'dashboard' ? 'live-feed' : 'dashboard')}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-full font-medium transition-all shadow-lg active:scale-95 ${
              currentView === 'live-feed' 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-slate-800 hover:bg-slate-900 text-white'
            }`}
          >
            <i className={`fas ${currentView === 'live-feed' ? 'fa-stop-circle' : 'fa-video'}`}></i>
            <span>{currentView === 'live-feed' ? 'Return to Dashboard' : 'Go to Live Feed'}</span>
          </button>
        </div>
      </footer>

      {/* AI Chat Drawer/Modal */}
      {isAIChatOpen && (
        <AIChat onClose={() => setIsAIChatOpen(false)} records={records} />
      )}
    </div>
  );
};

export default App;
