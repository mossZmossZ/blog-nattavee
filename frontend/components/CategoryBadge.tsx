import { getAllCategories } from '@/lib/categories';

interface CategoryBadgeProps {
    category: string;
}

const categoryColorMap: Record<string, string> = {
    'Cloud Native': '#2563eb',
    'HomeLab': '#0ea5e9',
    'Networking': '#3b82f6',
    'Cloud': '#1d4ed8',
    'AI': '#6366f1',
};

export default function CategoryBadge({ category }: CategoryBadgeProps) {
    const color = categoryColorMap[category] || '#3b82f6';

    return (
        <span
            className="blog-card-category"
            style={{ backgroundColor: color }}
        >
            {category}
        </span>
    );
}
