export default function Message({ text, isSuccess }) {
    return (
      <p className={`mt-4 text-center text-sm font-medium ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
        {text}
      </p>
    );
  }
  