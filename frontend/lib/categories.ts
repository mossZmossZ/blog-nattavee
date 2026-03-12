import fs from 'fs';
import path from 'path';

export interface Category {
    name: string;
    slug: string;
    color: string;
    icon: string;
}

const categoriesPath = path.join(process.cwd(), 'content', 'categories.json');

function ensureCategoriesFile() {
    const dir = path.dirname(categoriesPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(categoriesPath)) {
        fs.writeFileSync(categoriesPath, '[]', 'utf8');
    }
}

export function getAllCategories(): Category[] {
    ensureCategoriesFile();
    const fileContents = fs.readFileSync(categoriesPath, 'utf8');
    return JSON.parse(fileContents);
}

export function getCategoryBySlug(slug: string): Category | undefined {
    return getAllCategories().find((c) => c.slug === slug);
}

export function addCategory(category: Omit<Category, 'slug'>): Category {
    const categories = getAllCategories();
    const slug = category.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const newCategory: Category = { ...category, slug };
    categories.push(newCategory);
    fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2), 'utf8');
    return newCategory;
}

export function updateCategory(slug: string, data: Partial<Category>): boolean {
    const categories = getAllCategories();
    const index = categories.findIndex((c) => c.slug === slug);
    if (index === -1) return false;

    categories[index] = { ...categories[index], ...data };
    fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2), 'utf8');
    return true;
}

export function deleteCategory(slug: string): boolean {
    const categories = getAllCategories();
    const filtered = categories.filter((c) => c.slug !== slug);
    if (filtered.length === categories.length) return false;

    fs.writeFileSync(categoriesPath, JSON.stringify(filtered, null, 2), 'utf8');
    return true;
}
