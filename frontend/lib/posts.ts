import { query } from './db';
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

interface PostRow {
    slug: string;
    title: string;
    date: string;
    category: string;
    excerpt: string;
    cover_image: string;
    author: string;
    content: string;
}

function rowToPost(row: PostRow): Post {
    return {
        slug: row.slug,
        title: row.title,
        date: typeof row.date === 'string' ? row.date : new Date(row.date).toISOString().split('T')[0],
        category: row.category,
        excerpt: row.excerpt,
        coverImage: row.cover_image,
        author: row.author,
        content: row.content,
    };
}

export async function getAllPosts(): Promise<Post[]> {
    const result = await query('SELECT * FROM posts ORDER BY date DESC');
    return result.rows.map(rowToPost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const result = await query('SELECT * FROM posts WHERE slug = $1', [slug]);
    if (result.rows.length === 0) return null;
    return rowToPost(result.rows[0]);
}

export async function getPostBySlugWithHtml(slug: string): Promise<Post | null> {
    const post = await getPostBySlug(slug);
    if (!post) return null;

    const htmlContent = await markdownToHtml(post.content);
    return { ...post, htmlContent };
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
    const result = await query(
        'SELECT * FROM posts WHERE LOWER(category) = LOWER($1) ORDER BY date DESC',
        [category]
    );
    return result.rows.map(rowToPost);
}

export async function getRecentPosts(count: number = 5): Promise<Post[]> {
    const result = await query('SELECT * FROM posts ORDER BY date DESC LIMIT $1', [count]);
    return result.rows.map(rowToPost);
}

export async function createPost(data: {
    title: string;
    category: string;
    excerpt: string;
    author: string;
    content: string;
    coverImage?: string;
}): Promise<string> {
    const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    await query(
        `INSERT INTO posts (slug, title, date, category, excerpt, cover_image, author, content)
         VALUES ($1, $2, CURRENT_DATE, $3, $4, $5, $6, $7)`,
        [slug, data.title, data.category, data.excerpt, data.coverImage || '', data.author, data.content]
    );

    return slug;
}

export async function updatePost(
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
): Promise<boolean> {
    const result = await query(
        `UPDATE posts
         SET title = $1, category = $2, excerpt = $3, author = $4, content = $5,
             cover_image = $6, date = COALESCE($7, date), updated_at = NOW()
         WHERE slug = $8`,
        [
            data.title,
            data.category,
            data.excerpt,
            data.author,
            data.content,
            data.coverImage || '',
            data.date || null,
            slug,
        ]
    );

    return (result.rowCount ?? 0) > 0;
}

export async function deletePost(slug: string): Promise<boolean> {
    const result = await query('DELETE FROM posts WHERE slug = $1', [slug]);
    return (result.rowCount ?? 0) > 0;
}
