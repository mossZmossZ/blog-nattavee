'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit2, FiTrash2, FiLogOut, FiHome, FiFileText, FiFolder } from 'react-icons/fi';

interface Post {
    slug: string;
    title: string;
    date: string;
    category: string;
    author: string;
}

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteSlug, setDeleteSlug] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
        }
    }, [status, router]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/posts');
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch posts', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (slug: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            const res = await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
            if (res.ok) {
                setPosts(posts.filter((p) => p.slug !== slug));
            }
        } catch (error) {
            console.error('Failed to delete post', error);
        }
    };

    if (status === 'loading' || loading) {
        return (
            <div className="admin-layout">
                <div className="admin-container" style={{ textAlign: 'center', padding: '100px 24px' }}>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return null;
    }

    return (
        <div className="admin-layout">
            {/* Admin Header */}
            <div className="admin-header">
                <span className="admin-title">📝 Admin Dashboard</span>
                <div className="admin-nav">
                    <Link href="/" className="admin-nav-link">
                        <FiHome size={14} style={{ marginRight: '4px' }} />
                        View Site
                    </Link>
                    <button
                        onClick={() => signOut({ callbackUrl: '/admin/login' })}
                        className="admin-nav-link"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                    >
                        <FiLogOut size={14} style={{ marginRight: '4px' }} />
                        Logout
                    </button>
                </div>
            </div>

            <div className="admin-container">
                {/* Toolbar */}
                <div className="admin-toolbar">
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
                        <FiFileText size={20} style={{ marginRight: '8px', display: 'inline' }} />
                        Posts ({posts.length})
                    </h1>
                    <Link href="/admin/posts/new" className="btn btn-primary">
                        <FiPlus size={16} />
                        New Post
                    </Link>
                </div>

                {/* Posts Table */}
                {posts.length > 0 ? (
                    <table className="admin-posts-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Author</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.slug}>
                                    <td>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            style={{ fontWeight: 600, color: '#1e293b' }}
                                        >
                                            {post.title}
                                        </Link>
                                    </td>
                                    <td>
                                        <span
                                            style={{
                                                padding: '4px 10px',
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                background: '#eff6ff',
                                                color: '#2563eb',
                                            }}
                                        >
                                            {post.category}
                                        </span>
                                    </td>
                                    <td style={{ color: '#64748b', fontSize: '0.875rem' }}>
                                        {new Date(post.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </td>
                                    <td style={{ color: '#64748b', fontSize: '0.875rem' }}>
                                        {post.author}
                                    </td>
                                    <td>
                                        <div className="admin-actions">
                                            <Link
                                                href={`/admin/posts/${post.slug}/edit`}
                                                className="btn btn-secondary btn-sm"
                                            >
                                                <FiEdit2 size={14} />
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.slug)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                <FiTrash2 size={14} />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">📝</div>
                        <div className="empty-state-title">No posts yet</div>
                        <div className="empty-state-desc">
                            Create your first blog post to get started.
                        </div>
                        <Link href="/admin/posts/new" className="btn btn-primary" style={{ marginTop: '16px' }}>
                            <FiPlus size={16} />
                            Create First Post
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
