import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import UploadForm from '@/components/UploadForm';
import TransactionsTable from '@/components/TransactionsTable';
import { useState } from 'react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);

  if (!user) {
    router.push('/');
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleUploadSuccess = (newTransactions) => {
    setTransactions(newTransactions);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <UploadForm onUploadSuccess={handleUploadSuccess} />
          </div>
          {transactions.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Uploaded Transactions</h2>
              <TransactionsTable transactions={transactions} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}