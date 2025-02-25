'use client';

import { useState } from 'react';

export default function PutterSearch() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setResult(data.result);
    } catch {
      setError('Failed to get putter information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Scotty Cameron Putter Research</h2>
        <p className="text-gray-600">Search for detailed information about any Scotty Cameron putter model</p>
      </div>

      <div className="mb-4 text-sm text-gray-600">
        <p>Example searches:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>&quot;Tell me about the Scotty Cameron Newport 2&quot;</li>
          <li>&quot;What&apos;s special about the TeI3 Del Mar?&quot;</li>
          <li>&quot;Latest Phantom X series features&quot;</li>
        </ul>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your Scotty Cameron putter query..."
            className="flex-1 p-4 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            aria-label="Search query"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="mr-2">Searching</span>
                <span className="animate-pulse">...</span>
              </span>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Researching putter details...</p>
        </div>
      )}

      {result && (
        <div className="prose max-w-none bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div 
            dangerouslySetInnerHTML={{ __html: result }}
            className="text-gray-900"
          />
        </div>
      )}
    </div>
  );
}
