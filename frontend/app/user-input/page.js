'use client';

import InputForm from '../components/InputForm';

export default function UserInputPage() {
  const handleSubmit = async ({ keywords, url }) => {
    const response = await fetch('http://localhost:5000/api/user-input', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keywords, url }),
    });

    if (!response.ok) {
      throw new Error('Submission failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">User Input Form</h2>
        <InputForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
