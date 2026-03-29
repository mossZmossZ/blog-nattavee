import { NextRequest, NextResponse } from 'next/server';
import { getAllCategories, addCategory, deleteCategory } from '@/lib/categories';
import { auth } from '@/lib/auth';

export async function GET() {
    try {
        const categories = getAllCategories();
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch categories' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    // Defense-in-depth: verify auth even though middleware also checks
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, color, icon } = body;

        if (!name) {
            return NextResponse.json(
                { error: 'Category name is required' },
                { status: 400 }
            );
        }

        const category = addCategory({
            name,
            color: color || '#3b82f6',
            icon: icon || 'default',
        });

        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create category' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    // Defense-in-depth: verify auth even though middleware also checks
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        if (!slug) {
            return NextResponse.json(
                { error: 'Category slug is required' },
                { status: 400 }
            );
        }

        const success = deleteCategory(slug);

        if (!success) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Category deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete category' },
            { status: 500 }
        );
    }
}
