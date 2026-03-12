import Link from 'next/link';
import type { Post } from '@/lib/posts';
import CategoryBadge from './CategoryBadge';
import { FiUser, FiCalendar } from 'react-icons/fi';

interface BlogCardProps {
    post: Post;
    featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <article className={featured ? 'featured-card' : 'blog-card'}>
            <div className="blog-card-image">
                <span className="blog-card-image-placeholder">📝</span>
            </div>
            <div className="blog-card-body">
                <CategoryBadge category={post.category} />
                <h2 className="blog-card-title">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-card-meta">
                    <span className="blog-card-author">
                        <span className="blog-card-avatar">
                            {post.author.charAt(0).toUpperCase()}
                        </span>
                        {post.author}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FiCalendar size={12} />
                        {formattedDate}
                    </span>
                </div>
            </div>
        </article>
    );
}
