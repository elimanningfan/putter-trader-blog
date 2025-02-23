import GhostContentAPI from '@tryghost/content-api';
import GhostAdminAPI from '@tryghost/admin-api';

const ghostUrl = process.env.NEXT_PUBLIC_GHOST_URL || 'http://localhost:2368';
const ghostKey = process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY || '';

// Initialize the content API client
const api = new GhostContentAPI({
  url: ghostUrl,
  key: ghostKey,
  version: 'v5.0'
});

// Initialize the admin API client (if admin key is available)
const adminKey = process.env.GHOST_ADMIN_API_KEY;
const adminApi = adminKey ? new GhostAdminAPI({
  url: process.env.GHOST_ADMIN_API_URL || ghostUrl,
  key: adminKey,
  version: 'v5.0'
}) : null;

export interface GhostError {
  message: string;
  code?: string;
}

// Helper function to handle API errors
const handleError = (error: any): GhostError => {
  console.error('Ghost API Error:', error);
  return {
    message: error.message || 'An error occurred while fetching data',
    code: error.code
  };
};

// Wrapper function for error handling
const tryFetch = async <T>(fetchFn: () => Promise<T>): Promise<T | null> => {
  try {
    return await fetchFn();
  } catch (error) {
    handleError(error);
    return null;
  }
};

// Content API functions
export async function getPosts() {
  return tryFetch(() => 
    api.posts
      .browse({
        limit: 'all',
        include: ['tags', 'authors']
      })
  );
}

export async function getSinglePost(slug: string) {
  return tryFetch(() =>
    api.posts
      .read({
        slug,
        include: ['tags', 'authors']
      })
  );
}

export async function getPages() {
  return tryFetch(() =>
    api.pages
      .browse({
        limit: 'all'
      })
  );
}

export async function getSinglePage(slug: string) {
  return tryFetch(() =>
    api.pages
      .read({
        slug
      })
  );
}

// Admin API functions (only available if admin key is set)
export async function createPage(data: any) {
  if (!adminApi) {
    throw new Error('Admin API key not configured');
  }
  return tryFetch(() => adminApi.pages.add(data));
}

export async function updatePage(pageId: string, data: any) {
  if (!adminApi) {
    throw new Error('Admin API key not configured');
  }
  return tryFetch(() => adminApi.pages.edit({ id: pageId, ...data }));
}

export async function deletePage(pageId: string) {
  if (!adminApi) {
    throw new Error('Admin API key not configured');
  }
  return tryFetch(() => adminApi.pages.delete({ id: pageId }));
}
