import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, createPost } from '@/lib/posts';

export async function GET() {
    try {
        const posts = getAllPosts();
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, category, excerpt, author, content, coverImage } = body;

        if (!title || !category || !content) {
            return NextResponse.json(
                { error: 'Title, category, and content are required' },
                { status: 400 }
            );
        }

        const slug = createPost({
            title,
            category,
            excerpt: excerpt || '',
            author: author || 'Nattavee',
            content,
            coverImage,
        });

        return NextResponse.json({ slug, message: 'Post created successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create post' },
            { status: 500 }
        );
    }
}
