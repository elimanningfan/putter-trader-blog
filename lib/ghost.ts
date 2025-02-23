import GhostContentAPI from '@tryghost/content-api';

// Create API instance with site credentials
const api = new GhostContentAPI({
    url: process.env.NEXT_PUBLIC_GHOST_URL || 'https://ghost-production-76af.up.railway.app',
    key: process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY || '',
    version: 'v5.0'
});

// Helper function to handle API errors
const handleError = (error: any) => {
    console.error('Ghost API Error:', error);
    if (error.code === 'ERR_NOT_SUPPORT') {
        return null; // Return null for adapter errors during build
    }
    throw error; // Re-throw other errors
};

// Posts
export async function getPosts() {
    try {
        return await api.posts
            .browse({
                limit: 'all',
                include: ['tags', 'authors']
            });
    } catch (error) {
        return handleError(error) || [];
    }
}

// Single post
export async function getSinglePost(postSlug: string) {
    try {
        return await api.posts
            .read({
                slug: postSlug
            }, {
                include: ['tags', 'authors']
            });
    } catch (error) {
        return handleError(error);
    }
}

// Pages
export async function getPages() {
    try {
        return await api.pages
            .browse({
                limit: 'all'
            });
    } catch (error) {
        return handleError(error) || [];
    }
}

// Single page
export async function getSinglePage(pageSlug: string) {
    try {
        return await api.pages
            .read({
                slug: pageSlug
            });
    } catch (error) {
        return handleError(error);
    }
}

// Tags
export async function getTags() {
    try {
        return await api.tags
            .browse({
                limit: 'all'
            });
    } catch (error) {
        return handleError(error) || [];
    }
}
