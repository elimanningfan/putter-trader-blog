import Link from 'next/link';
import { getPages } from '../lib/ghost';
import { Page } from '../app/types';

export default async function Navigation() {
  const pages = await getPages() as Page[];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center py-4">
                <span className="font-semibold text-gray-500 text-lg">Blog</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              {pages.map((page) => (
                <Link
                  key={page.id}
                  href={`/page/${page.slug}`}
                  className="py-4 px-2 text-gray-500 hover:text-gray-900"
                >
                  {page.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
