import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Area,
  Line,
} from 'recharts';

interface DataEntry {
  month: string;
  profit: number;
  startingBalance: number;
  endingBalance: number;
  trades: { ticker: string; profit: number }[];
  platformFee: number;
  commissions: number;
  cumulativeProfit: number;
}

export default function DashboardDemo() {
  const [includeFees, setIncludeFees] = useState(true);
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);

  const initialBalance = 7930.02;
  const platformFee = 250;

  const data: Omit<DataEntry, 'startingBalance' | 'endingBalance' | 'cumulativeProfit'>[] = [
    {
      month: 'January',
      profit: 1228.31,
      trades: [
        { ticker: 'NVDA', profit: 507.16 },
        { ticker: 'SPY', profit: 400.00 },
        { ticker: 'QQQ', profit: -120.90 },
        { ticker: 'SMCI', profit: 328.31 }
      ],
      platformFee,
      commissions: 49.80
    },
    {
      month: 'February',
      profit: -50.39,
      trades: [
        { ticker: 'GME', profit: -100.00 },
        { ticker: 'TSLA', profit: 20.61 },
        { ticker: 'AAPL', profit: 29.00 }
      ],
      platformFee,
      commissions: 80.11
    },
    {
      month: 'March',
      profit: 852.97,
      trades: [
        { ticker: 'LRCX', profit: 500.00 },
        { ticker: 'AVGO', profit: 300.00 },
        { ticker: 'SMCI', profit: 52.97 }
      ],
      platformFee,
      commissions: 76.83
    },
    {
      month: 'April',
      profit: 915.48,
      trades: [
        { ticker: 'TSLA', profit: 500.00 },
        { ticker: 'QQQ', profit: 415.48 },
        { ticker: 'AAPL', profit: -100.00 }
      ],
      platformFee,
      commissions: 61.08
    },
    {
      month: 'May',
      profit: -210.85,
      trades: [
        { ticker: 'AVGO', profit: -150.00 },
        { ticker: 'GME', profit: -60.85 }
      ],
      platformFee,
      commissions: 48.92
    },
    {
      month: 'June',
      profit: 692.08,
      trades: [
        { ticker: 'SPY', profit: 300.00 },
        { ticker: 'VIX', profit: 192.08 },
        { ticker: 'AAPL', profit: 200.00 }
      ],
      platformFee,
      commissions: 24.15
    },
    {
      month: 'July',
      profit: 926.43,
      trades: [
        { ticker: 'SPY', profit: 341.00 },
        { ticker: 'TSLA', profit: 402.08 },
        { ticker: 'QQQ', profit: -117.01 }
      ],
      platformFee,
      commissions: 18.01
    }
  ];

  let balance = initialBalance;
  let cumulativeProfit = 0;
  const processedData: DataEntry[] = data.map((entry) => {
    const profit = includeFees ? entry.profit - entry.platformFee - entry.commissions : entry.profit;
    cumulativeProfit += profit;
    const startingBalance = balance;
    const endingBalance = startingBalance + profit;
    balance = endingBalance;
    return { ...entry, profit, startingBalance, endingBalance, cumulativeProfit: parseFloat(cumulativeProfit.toFixed(2)) };
  });

  const toggleMonth = (month: string) => {
    setExpandedMonth(expandedMonth === month ? null : month);
  };

  return (
    <div className="flex flex-col min-h-screen p-6 space-y-6 text-sm">
      <h1 className="text-xl font-bold mb-4">Monthly Trading Totals</h1>

      <div className="flex justify-end mb-4">
        <select defaultValue="2024">
          <option value="2024">2024</option>
        </select>
      </div>

      <div className="w-full">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={processedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="cumulativeProfit" stroke="#8884d8" fill="#8884d8" fillOpacity={0.8} />
            <Line type="monotone" dataKey="platformFee" stroke="#FF0000" strokeWidth={2} />
            <Line type="monotone" dataKey="commissions" stroke="#00FF00" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded self-start"
        onClick={() => setIncludeFees(!includeFees)}
      >
        {includeFees ? 'Exclude All Fees' : 'Include All Fees'}
      </button>

      <div className="w-full mt-6">
        <table className="min-w-full divide-y divide-gray-200 text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Profit/Loss</th>
              <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Platform Fee</th>
              <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Commissions</th>
              <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Starting Balance</th>
              <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Ending Balance</th>
              <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {processedData.map((entry, index) => (
              <React.Fragment key={index}>
                <tr onClick={() => toggleMonth(entry.month)} className="cursor-pointer">
                  <td className="px-4 py-2 whitespace-nowrap">{entry.month}</td>
                  <td
                    className={`px-4 py-2 whitespace-nowrap ${
                      entry.profit < 0 ? 'text-red-500' : 'text-green-500'
                    }`}
                  >
                    {entry.profit.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-red-500">{entry.platformFee.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-red-500">{entry.commissions.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{entry.startingBalance.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{entry.endingBalance.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {expandedMonth === entry.month ? '▲' : '▼'}
                  </td>
                </tr>
                {expandedMonth === entry.month && (
                  <tr>
                    <td colSpan={7} className="px-4 py-2 whitespace-nowrap bg-gray-50">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Ticker</th>
                            <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Profit/Loss</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {entry.trades.map((trade, tradeIndex) => (
                            <tr key={tradeIndex}>
                              <td className="px-4 py-2 whitespace-nowrap">{trade.ticker}</td>
                              <td
                                className={`px-4 py-2 whitespace-nowrap ${
                                  trade.profit < 0 ? 'text-red-500' : 'text-green-500'
                                }`}
                              >
                                {trade.profit.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
