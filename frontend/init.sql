-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    color VARCHAR(20) NOT NULL DEFAULT '#3b82f6',
    icon VARCHAR(100) NOT NULL DEFAULT 'default'
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(500) NOT NULL UNIQUE,
    title VARCHAR(500) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    category VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL DEFAULT '',
    cover_image TEXT NOT NULL DEFAULT '',
    author VARCHAR(255) NOT NULL DEFAULT 'Anonymous',
    content TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_date ON posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Seed default categories
INSERT INTO categories (name, slug, color, icon) VALUES
    ('Cloud Native', 'cloud-native', '#2563eb', 'cloud-native'),
    ('HomeLab', 'homelab', '#0ea5e9', 'homelab'),
    ('Networking', 'networking', '#3b82f6', 'networking'),
    ('Cloud', 'cloud', '#1d4ed8', 'cloud'),
    ('AI', 'ai', '#6366f1', 'ai'),
    ('ETC', 'etc', '#3b82f6', 'etc')
ON CONFLICT (slug) DO NOTHING;
