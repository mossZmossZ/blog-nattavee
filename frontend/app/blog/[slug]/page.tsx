import { getPostBySlugWithHtml } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CodeBlockEnhancer from '@/components/CodeBlockEnhancer';
import { FiArrowLeft, FiCalendar, FiUser, FiFolder } from 'react-icons/fi';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPostBySlugWithHtml(slug);

    if (!post) {
        notFound();
    }

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const categoryColorMap: Record<string, string> = {
        'Cloud Native': '#2563eb',
        'HomeLab': '#0ea5e9',
        'Networking': '#3b82f6',
        'Cloud': '#1d4ed8',
        'AI': '#6366f1',
        'ETC': '#6b7280',
    };

    const categoryColor = categoryColorMap[post.category] || '#3b82f6';
    const categorySlug = post.category
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-');

    return (
        <article className="post-page">
            {/* Breadcrumb */}
            <nav className="post-breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href={`/category/${categorySlug}`}>{post.category}</Link>
                <span>/</span>
                <span>{post.title}</span>
            </nav>

            {/* Post Header */}
            <header className="post-header">
                <span
                    className="post-category-badge"
                    style={{ backgroundColor: categoryColor }}
                >
                    {post.category}
                </span>
                <h1 className="post-title">{post.title}</h1>
                <div className="post-meta">
                    <span className="post-meta-item">
                        <FiUser size={16} />
                        {post.author}
                    </span>
                    <span className="post-meta-item">
                        <FiCalendar size={16} />
                        {formattedDate}
                    </span>
                    <span className="post-meta-item">
                        <FiFolder size={16} />
                        {post.category}
                    </span>
                </div>
            </header>

            {/* Cover Image */}
            <div className="post-cover">
                📝
            </div>

            {/* Post Content */}
            <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}
            />

            {/* Copy Button Enhancement */}
            <CodeBlockEnhancer />

            {/* Back to Home */}
            <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '2px solid #e2e8f0' }}>
                <Link
                    href="/"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#2563eb',
                        fontWeight: 600,
                    }}
                >
                    <FiArrowLeft size={16} />
                    Back to all posts
                </Link>
            </div>
        </article>
    );
}
