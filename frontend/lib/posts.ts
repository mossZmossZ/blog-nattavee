import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { markdownToHtml } from './markdown';

export interface Post {
    slug: string;
    title: string;
    date: string;
    category: string;
    excerpt: string;
    coverImage: string;
    author: string;
    content: string;
    htmlContent?: string;
}

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

function ensurePostsDirectory() {
    if (!fs.existsSync(postsDirectory)) {
        fs.mkdirSync(postsDirectory, { recursive: true });
    }
}

export function getAllPosts(): Post[] {
    ensurePostsDirectory();
    const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'));

    const posts = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title || slug,
            date: data.date || new Date().toISOString().split('T')[0],
            category: data.category || 'Uncategorized',
            excerpt: data.excerpt || '',
            coverImage: data.coverImage || '',
            author: data.author || 'Anonymous',
            content,
        } as Post;
    });

    return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | null {
    ensurePostsDirectory();
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString().split('T')[0],
        category: data.category || 'Uncategorized',
        excerpt: data.excerpt || '',
        coverImage: data.coverImage || '',
        author: data.author || 'Anonymous',
        content,
    };
}

export async function getPostBySlugWithHtml(slug: string): Promise<Post | null> {
    const post = getPostBySlug(slug);
    if (!post) return null;

    const htmlContent = await markdownToHtml(post.content);
    return { ...post, htmlContent };
}

export function getPostsByCategory(category: string): Post[] {
    return getAllPosts().filter(
        (post) => post.category.toLowerCase() === category.toLowerCase()
    );
}

export function getRecentPosts(count: number = 5): Post[] {
    return getAllPosts().slice(0, count);
}

export function createPost(data: {
    title: string;
    category: string;
    excerpt: string;
    author: string;
    content: string;
    coverImage?: string;
}): string {
    ensurePostsDirectory();
    const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const frontmatter = `---
title: "${data.title}"
date: "${new Date().toISOString().split('T')[0]}"
category: "${data.category}"
excerpt: "${data.excerpt}"
coverImage: "${data.coverImage || ''}"
author: "${data.author}"
---

${data.content}`;

    const fullPath = path.join(postsDirectory, `${slug}.md`);
    fs.writeFileSync(fullPath, frontmatter, 'utf8');
    return slug;
}

export function updatePost(
    slug: string,
    data: {
        title: string;
        category: string;
        excerpt: string;
        author: string;
        content: string;
        coverImage?: string;
        date?: string;
    }
): boolean {
    ensurePostsDirectory();
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        return false;
    }

    const existingPost = getPostBySlug(slug);
    const date = data.date || existingPost?.date || new Date().toISOString().split('T')[0];

    const frontmatter = `---
title: "${data.title}"
date: "${date}"
category: "${data.category}"
excerpt: "${data.excerpt}"
coverImage: "${data.coverImage || ''}"
author: "${data.author}"
---

${data.content}`;

    fs.writeFileSync(fullPath, frontmatter, 'utf8');
    return true;
}

export function deletePost(slug: string): boolean {
    ensurePostsDirectory();
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        return false;
    }

    fs.unlinkSync(fullPath);
    return true;
}
