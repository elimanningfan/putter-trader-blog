// @ts-ignore
import GhostAdminAPI from '@tryghost/admin-api';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const ghostAdmin = new GhostAdminAPI({
    url: process.env.GHOST_ADMIN_API_URL || 'https://ghost-production-76af.up.railway.app',
    key: process.env.GHOST_ADMIN_API_KEY,
    version: 'v5.0'
});

interface PageData {
    title: string;
    content: string;
    slug?: string;
    featured?: boolean;
    status?: 'draft' | 'published';
    tags?: string[];
}

async function createPage(pageData: PageData) {
    try {
        const page = await ghostAdmin.pages.add({
            title: pageData.title,
            html: pageData.content,
            slug: pageData.slug,
            featured: pageData.featured,
            status: pageData.status || 'draft',
            tags: pageData.tags ? pageData.tags.map((tag: string) => ({ name: tag })) : []
        }, { source: 'html' });

        console.log(`✅ Page created successfully: ${page.url}`);
        return page;
    } catch (error) {
        console.error('❌ Failed to create page:', error);
        throw error;
    }
}

async function main() {
    const filePath = './content/test-page.md';
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        // Simple frontmatter parsing
        const [, frontmatter, markdown] = content.split('---\n');
        const metadata = Object.fromEntries(
            frontmatter.split('\n')
                .filter(Boolean)
                .map(line => line.split(': ').map(s => s.trim()))
        );

        await createPage({
            title: metadata.title,
            content: markdown,
            slug: metadata.slug,
            status: metadata.status as 'draft' | 'published',
            tags: metadata.tags?.split(',').map((tag: string) => tag.trim())
        });
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();
