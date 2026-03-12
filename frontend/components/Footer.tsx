import { FiGithub, FiTwitter, FiMail } from 'react-icons/fi';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-brand">Nattavee Blog</div>
                <div className="footer-links">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FiGithub size={18} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <FiTwitter size={18} />
                    </a>
                    <a href="mailto:admin@nattavee.dev" aria-label="Email">
                        <FiMail size={18} />
                    </a>
                </div>
                <div className="footer-copy">
                    © {currentYear} Nattavee Blog. All rights reserved. Built with Next.js & ❤️
                </div>
            </div>
        </footer>
    );
}
