'use client';

import { useState } from 'react';

export default function SQLPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[] | null>(null);

  const handleExecute = async () => {
    try {
      const response = await fetch('/api/sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data.results);
      } else {
        alert('Ошибка выполнения запроса: ' + data.error);
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при выполнении запроса.');
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">SQL Запрос</h1>
        <p className="text-gray-600">Выполните SQL запрос к базе данных</p>
      </div>

      <div className="grid gap-6">
        {/* SQL Editor */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Введите SQL запрос
            </label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-40 p-4 text-sm font-mono bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="SELECT * FROM users;"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleExecute}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Выполнить запрос
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Результаты запроса</h2>
          {results === null ? (
            <div className="text-center py-12 text-gray-500">
              Здесь появятся результаты выполнения запроса
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Запрос выполнен успешно, но не вернул данных
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    {Object.keys(results[0]).map((key) => (
                      <th key={key} className="px-4 py-2">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-t">
                      {Object.values(row).map((value, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-2">{String(value)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
