import React from 'react';

export default function TradingParameters() {
  return (
    <div className="flex flex-col items-start justify-start min-h-screen p-6 text-sm">
      <h1 className="text-2xl font-bold mb-6">Trading Parameters</h1>
      <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
        <div className="p-4 border border-gray-200 rounded">
          <h2 className="mb-2 font-semibold underline">Total Buying Power</h2>
          <p className="text-green-500 font-bold">50,000</p>
        </div>
        <div className="p-4 border border-gray-200 rounded">
          <h2 className="mb-2 font-semibold underline">Max Position Allowed Buying Power</h2>
          <p className="text-green-500 font-bold">25,000</p>
        </div>
        <div className="p-4 border border-gray-200 rounded">
          <h2 className="mb-2 font-semibold underline">Max Daily Draw Down</h2>
          <p className="text-red-500 font-bold">450</p>
        </div>
      </div>
      <div className="mt-6 text-left">
        <p className="text-sm italic text-gray-500">
          Trading involves significant risk and may not be suitable for everyone. Past performance is not indicative of future results.
        </p>
      </div>
    </div>
  );
}
