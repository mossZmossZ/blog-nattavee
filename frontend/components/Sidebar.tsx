import Link from 'next/link';
import { getAllCategories } from '@/lib/categories';
import { getAllPosts, getRecentPosts } from '@/lib/posts';
import { FiFolder, FiClock, FiFileText } from 'react-icons/fi';

export default function Sidebar() {
    const categories = getAllCategories();
    const allPosts = getAllPosts();
    const recentPosts = getRecentPosts(5);

    // Count posts per category
    const categoryCounts: Record<string, number> = {};
    allPosts.forEach((post) => {
        const cat = post.category;
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    return (
        <aside className="sidebar">
            {/* Categories Widget */}
            <div className="sidebar-widget">
                <h3 className="sidebar-title">
                    <FiFolder size={16} />
                    Categories
                </h3>
                <ul className="category-list">
                    {categories.map((cat) => (
                        <li key={cat.slug} className="category-item">
                            <Link href={`/category/${cat.slug}`}>
                                <span
                                    className="category-dot"
                                    style={{ backgroundColor: cat.color }}
                                />
                                {cat.name}
                            </Link>
                            <span className="category-count">
                                {categoryCounts[cat.name] || 0}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Recent Posts Widget */}
            <div className="sidebar-widget">
                <h3 className="sidebar-title">
                    <FiClock size={16} />
                    Recent Posts
                </h3>
                {recentPosts.map((post) => (
                    <div key={post.slug} className="recent-post-item">
                        <div className="recent-post-thumb">
                            <FiFileText />
                        </div>
                        <div className="recent-post-info">
                            <div className="recent-post-title">
                                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                            </div>
                            <div className="recent-post-date">
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}
