import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-4">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
      <Link href="/" className="text-blue-500 hover:text-blue-700">
        ← Back to home
      </Link>
    </div>
  );
}
