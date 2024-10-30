'use client';

import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

export default function InputForm({ onSubmit }) {
  const [keywords, setKeywords] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await onSubmit({ keywords, url });
      setMessage('Submission successful!');
      setKeywords('');
      setUrl('');
    } catch (error) {
      setMessage('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 shadow-lg rounded-lg">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Keywords</label>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter keywords"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter URL"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex justify-center items-center"
      >
        {loading ? <FaSpinner className="animate-spin mr-2" /> : 'Submit'}
      </button>

      {message && (
        <p className={`mt-4 text-center text-sm font-medium ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
