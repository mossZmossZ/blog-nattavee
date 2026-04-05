import { query } from './db';

export interface Category {
    name: string;
    slug: string;
    color: string;
    icon: string;
}

export async function getAllCategories(): Promise<Category[]> {
    const result = await query('SELECT name, slug, color, icon FROM categories ORDER BY id ASC');
    return result.rows;
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const result = await query('SELECT name, slug, color, icon FROM categories WHERE slug = $1', [slug]);
    return result.rows[0] || undefined;
}

export async function addCategory(category: Omit<Category, 'slug'>): Promise<Category> {
    const slug = category.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const result = await query(
        'INSERT INTO categories (name, slug, color, icon) VALUES ($1, $2, $3, $4) RETURNING name, slug, color, icon',
        [category.name, slug, category.color, category.icon]
    );

    return result.rows[0];
}

export async function updateCategory(slug: string, data: Partial<Category>): Promise<boolean> {
    const setClauses: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    if (data.name !== undefined) {
        setClauses.push(`name = $${paramIndex++}`);
        values.push(data.name);
    }
    if (data.color !== undefined) {
        setClauses.push(`color = $${paramIndex++}`);
        values.push(data.color);
    }
    if (data.icon !== undefined) {
        setClauses.push(`icon = $${paramIndex++}`);
        values.push(data.icon);
    }

    if (setClauses.length === 0) return false;

    values.push(slug);
    const result = await query(
        `UPDATE categories SET ${setClauses.join(', ')} WHERE slug = $${paramIndex}`,
        values
    );

    return (result.rowCount ?? 0) > 0;
}

export async function deleteCategory(slug: string): Promise<boolean> {
    const result = await query('DELETE FROM categories WHERE slug = $1', [slug]);
    return (result.rowCount ?? 0) > 0;
}
