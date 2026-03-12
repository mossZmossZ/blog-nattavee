'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

interface Category {
    name: string;
    slug: string;
    color: string;
}

export default function NewPostPage() {
    const { status } = useSession();
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
        }
    }, [status, router]);

    useEffect(() => {
        fetch('/api/categories')
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
                if (data.length > 0) setCategory(data[0].name);
            })
            .catch(console.error);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    category,
                    excerpt,
                    author: 'Nattavee',
                    content,
                }),
            });

            if (res.ok) {
                router.push('/admin');
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to create post');
            }
        } catch {
            setError('An error occurred');
        } finally {
            setSaving(false);
        }
    };

    if (status === 'loading') {
        return (
            <div className="admin-layout">
                <div className="admin-container" style={{ textAlign: 'center', padding: '100px' }}>
                    Loading...
                </div>
            </div>
        );
    }

    if (status === 'unauthenticated') return null;

    return (
        <div className="admin-layout">
            <div className="admin-header">
                <span className="admin-title">📝 New Post</span>
            </div>

            <div className="admin-container" style={{ maxWidth: '900px' }}>
                <div style={{ marginBottom: '24px' }}>
                    <Link
                        href="/admin"
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
                        Back to Dashboard
                    </Link>
                </div>

                {error && <div className="form-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div
                        style={{
                            background: 'white',
                            borderRadius: '16px',
                            border: '1px solid #e2e8f0',
                            padding: '32px',
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                className="form-input"
                                placeholder="Your amazing blog post title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label htmlFor="category" className="form-label">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    className="form-select"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.slug} value={cat.name}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="excerpt" className="form-label">
                                    Excerpt
                                </label>
                                <input
                                    id="excerpt"
                                    type="text"
                                    className="form-input"
                                    placeholder="Brief description of your post"
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="content" className="form-label">
                                Content (Markdown)
                            </label>
                            <textarea
                                id="content"
                                className="form-textarea"
                                placeholder="Write your blog post content in Markdown...

# Heading 1
## Heading 2

Some text with **bold** and *italic*.

```bash
echo 'Hello World'
```

- List item 1
- List item 2"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <Link href="/admin" className="btn btn-secondary">
                                Cancel
                            </Link>
                            <button type="submit" className="btn btn-primary" disabled={saving}>
                                <FiSave size={16} />
                                {saving ? 'Publishing...' : 'Publish Post'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
