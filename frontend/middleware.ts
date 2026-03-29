export { auth as middleware } from '@/lib/auth';

export const config = {
    // Protect admin routes and mutating API endpoints
    matcher: [
        '/admin/:path*',
        '/api/posts/:path*',
        '/api/categories/:path*',
    ],
};
