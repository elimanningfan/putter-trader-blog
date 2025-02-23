import Link from 'next/link';
import { getPages } from '../lib/ghost';
import { Page } from '../app/types';

export default async function Navigation() {
  const pages = await getPages() as Page[];

  return (
    <nav>
      <ul className="flex space-x-6">
        <li>
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Blog
          </Link>
        </li>
        {pages.map((page) => (
          <li key={page.id}>
            <Link
              href={`/page/${page.slug}`}
              className="text-gray-600 hover:text-gray-900"
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
