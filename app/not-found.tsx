export default function NotFound() {
  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-4">Sorry, we couldn't find the page you're looking for.</p>
      <a href="/" className="text-blue-500 hover:text-blue-700">
        ← Back to home
      </a>
    </div>
  );
}
