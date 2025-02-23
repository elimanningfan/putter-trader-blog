import GhostAdminAPI from '@tryghost/admin-api';

const ghostUrl = process.env.NEXT_PUBLIC_GHOST_URL || 'http://localhost:2368';
const ghostKey = process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY || '';

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

// Define Ghost content types
export interface GhostImage {
  url: string;
  alt?: string;
}

export interface GhostAuthor {
  id: string;
  name: string;
  slug: string;
  profile_image?: string;
  bio?: string;
}

export interface GhostTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  feature_image?: string;
  featured: boolean;
  excerpt?: string;
  custom_excerpt?: string;
  visibility: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  authors: GhostAuthor[];
  tags: GhostTag[];
}

export interface GhostPage {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  feature_image?: string;
  excerpt?: string;
  custom_excerpt?: string;
  visibility: string;
  created_at: string;
  updated_at: string;
  published_at: string;
}

// Helper function to handle API errors
const handleError = (error: Error): GhostError => {
  console.error('Ghost API Error:', error);
  return {
    message: error.message || 'An error occurred while fetching data',
    code: (error as GhostError).code
  };
};

// Function to make a fetch request to the Ghost API
async function fetchFromGhost<T>(endpoint: string, params: Record<string, string> = {}): Promise<T | null> {
  try {
    const searchParams = new URLSearchParams({
      key: ghostKey,
      ...params
    });

    const response = await fetch(`${ghostUrl}/ghost/api/content/${endpoint}?${searchParams.toString()}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data[endpoint.split('/')[0]] as T;
  } catch (error) {
    handleError(error as Error);
    return null;
  }
}

// Content API functions
export async function getPosts() {
  return fetchFromGhost<GhostPost[]>('posts', {
    include: 'tags,authors',
    limit: 'all'
  });
}

export async function getSinglePost(slug: string) {
  const posts = await fetchFromGhost<GhostPost[]>('posts', {
    filter: `slug:${slug}`,
    include: 'tags,authors'
  });
  return posts?.[0] || null;
}

export async function getPages() {
  return fetchFromGhost<GhostPage[]>('pages', {
    limit: 'all'
  });
}

export async function getSinglePage(slug: string) {
  const pages = await fetchFromGhost<GhostPage[]>('pages', {
    filter: `slug:${slug}`
  });
  return pages?.[0] || null;
}

// Admin API functions (only available if admin key is set)
export async function createPage(data: Partial<GhostPage>) {
  if (!adminApi) {
    throw new Error('Admin API key not configured');
  }
  try {
    return await adminApi.pages.add(data);
  } catch (error) {
    handleError(error as Error);
    return null;
  }
}

export async function updatePage(pageId: string, data: Partial<GhostPage>) {
  if (!adminApi) {
    throw new Error('Admin API key not configured');
  }
  try {
    return await adminApi.pages.edit({ id: pageId, ...data });
  } catch (error) {
    handleError(error as Error);
    return null;
  }
}

export async function deletePage(pageId: string) {
  if (!adminApi) {
    throw new Error('Admin API key not configured');
  }
  try {
    await adminApi.pages.delete({ id: pageId });
  } catch (error) {
    handleError(error as Error);
  }
}
