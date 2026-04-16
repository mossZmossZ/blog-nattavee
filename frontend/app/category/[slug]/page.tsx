import { getCategoryBySlug } from '@/lib/categories';
import { getPostsByCategory } from '@/lib/posts';
import { notFound } from 'next/navigation';
import BlogCard from '@/components/BlogCard';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    const posts = await getPostsByCategory(category.name);

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
            <section
                className="category-page-header"
                style={{
                    background: `linear-gradient(135deg, ${category.color}dd 0%, ${category.color}88 100%)`,
                }}
            >
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>
                    {categoryIcons[category.name] || '📁'}
                </div>
                <h1 className="category-page-title">{category.name}</h1>
                <p className="category-page-desc">
                    {posts.length} article{posts.length !== 1 ? 's' : ''} in this category
                </p>
            </section>

            <div className="main-container">
                <div className="content-layout">
                    <div>
                        <div style={{ marginBottom: '24px' }}>
                            <Link
                                href="/category"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    color: '#2563eb',
                                    fontWeight: 600,
                                    fontSize: '0.925rem',
                                }}
                            >
                                <FiArrowLeft size={14} />
                                All Categories
                            </Link>
                        </div>

                        {posts.length > 0 ? (
                            <div className="blog-grid">
                                {posts.map((post) => (
                                    <BlogCard key={post.slug} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-state-icon">📭</div>
                                <div className="empty-state-title">No posts yet</div>
                                <div className="empty-state-desc">
                                    Check back later for articles in {category.name}.
                                </div>
                            </div>
                        )}
                    </div>

                    <Sidebar />
                </div>
            </div>
        </>
    );
}
