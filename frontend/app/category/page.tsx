import { getAllCategories } from '@/lib/categories';
import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { FiGrid } from 'react-icons/fi';

export const dynamic = 'force-dynamic';

export default function CategoriesPage() {
    const categories = getAllCategories();
    const allPosts = getAllPosts();

    const categoryCounts: Record<string, number> = {};
    allPosts.forEach((post) => {
        categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
    });

    const categoryIcons: Record<string, string> = {
        'Cloud Native': '☸️',
        'HomeLab': '🏠',
        'Networking': '🌐',
        'Cloud': '☁️',
        'AI': '🤖',
        'ETC': '📂',
    };

    return (
        <>
            <section className="category-page-header">
                <h1 className="category-page-title">Categories</h1>
                <p className="category-page-desc">
                    Browse articles by category
                </p>
            </section>

            <div className="main-container">
                <div className="categories-grid">
                    {categories.map((cat) => (
                        <Link key={cat.slug} href={`/category/${cat.slug}`}>
                            <div className="category-card">
                                <div
                                    className="category-card-icon"
                                    style={{ backgroundColor: cat.color }}
                                >
                                    {categoryIcons[cat.name] || '📁'}
                                </div>
                                <div className="category-card-name">{cat.name}</div>
                                <div className="category-card-count">
                                    {categoryCounts[cat.name] || 0} articles
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
