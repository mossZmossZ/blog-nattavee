import { getAllPosts, getRecentPosts } from '@/lib/posts';
import { getAllCategories } from '@/lib/categories';
import BlogCard from '@/components/BlogCard';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { FiArrowRight, FiBookOpen, FiTrendingUp } from 'react-icons/fi';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const allPosts = await getAllPosts();
  const recentPosts = await getRecentPosts(3);
  const categories = await getAllCategories();
  const featuredPost = allPosts[0];
  const otherPosts = allPosts.slice(1);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Nattavee Blog</h1>
          <p>
            Exploring Cloud Native, HomeLab, Networking, Cloud &amp; AI — Tips,
            tutorials, and hands-on guides for tech enthusiasts.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">{allPosts.length}</div>
              <div className="hero-stat-label">Articles</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">{categories.length}</div>
              <div className="hero-stat-label">Categories</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">∞</div>
              <div className="hero-stat-label">Knowledge</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <div className="main-container">
        <div className="content-layout">
          {/* Main Content */}
          <div>
            {/* Featured / Recent Posts */}
            <section>
              <div className="section-header">
                <h2 className="section-title">
                  <span className="section-title-icon">
                    <FiTrendingUp size={16} />
                  </span>
                  Recent Posts
                </h2>
              </div>

              <div className="blog-grid">
                {featuredPost && (
                  <BlogCard post={featuredPost} featured={true} />
                )}
                {recentPosts.slice(featuredPost ? 1 : 0).map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </section>

            {/* All Posts */}
            {otherPosts.length > 0 && (
              <section className="mt-8">
                <div className="section-header">
                  <h2 className="section-title">
                    <span className="section-title-icon">
                      <FiBookOpen size={16} />
                    </span>
                    All Posts
                  </h2>
                </div>

                <div className="blog-grid">
                  {otherPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </>
  );
}
