import GhostContentAPI from '@tryghost/content-api';

// Create API instance with site credentials
const api = new GhostContentAPI({
    url: process.env.NEXT_PUBLIC_GHOST_URL || 'https://ghost-production-76af.up.railway.app',
    key: process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY || '',
    version: 'v5.0'
});

// Posts
export async function getPosts() {
    return await api.posts
        .browse({
            limit: 'all',
            include: ['tags', 'authors']
        })
        .catch(err => {
            console.error(err);
            return [];
        });
}

// Single post
export async function getSinglePost(postSlug: string) {
    return await api.posts
        .read({
            slug: postSlug
        }, {
            include: ['tags', 'authors']
        })
        .catch(err => {
            console.error(err);
            return null;
        });
}

// Tags
export async function getTags() {
    return await api.tags
        .browse({
            limit: 'all'
        })
        .catch(err => {
            console.error(err);
            return [];
        });
}

// Pages
export async function getPages() {
    return await api.pages
        .browse({
            limit: 'all'
        })
        .catch(err => {
            console.error(err);
            return [];
        });
}

export async function getSinglePage(pageSlug: string) {
    return await api.pages
        .read({
            slug: pageSlug
        })
        .catch(err => {
            console.error(err);
            return null;
        });
}
