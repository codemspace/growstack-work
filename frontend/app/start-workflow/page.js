'use client';

import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';

export default function StartWorkflowPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const startWorkflow = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/start-workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInputId: 1 }), // Replace with dynamic userInputId if needed
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Workflow started successfully: ${JSON.stringify(data.results)}`);
      } else {
        setMessage('Error starting workflow. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Start Workflow</h2>
        <button
          onClick={startWorkflow}
          disabled={loading}
          className="w-full py-2 px-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex justify-center items-center"
        >
          {loading ? <LoadingSpinner /> : 'Start Parallel Workflow'}
        </button>
        {message && <Message text={message} isSuccess={message.includes('successfully')} />}
      </div>
    </div>
  );
}
