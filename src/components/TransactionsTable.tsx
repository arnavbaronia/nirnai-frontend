import { Transaction } from '@/types';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export default function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Document No.
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Seller
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Buyer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {tx.documentNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {tx.registrationDate?.toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {tx.executants?.join(', ')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {tx.claimants?.join(', ')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {tx.considerationValue}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}