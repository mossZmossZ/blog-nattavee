'use client';

import { useEffect, useRef } from 'react';

export default function CodeBlockEnhancer() {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const addCopyButtons = () => {
            const codeBlocks = document.querySelectorAll('.post-content pre');

            codeBlocks.forEach((pre) => {
                if (pre.querySelector('.copy-btn')) return;

                const wrapper = document.createElement('div');
                wrapper.className = 'code-block-wrapper';
                pre.parentNode?.insertBefore(wrapper, pre);
                wrapper.appendChild(pre);

                // Detect language from class
                const code = pre.querySelector('code');
                const langClass = code?.className
                    ?.split(' ')
                    .find((c: string) => c.startsWith('language-') || c.startsWith('hljs'));
                const lang = langClass?.replace('language-', '').replace('hljs', '').trim();

                if (lang) {
                    const langLabel = document.createElement('span');
                    langLabel.className = 'code-lang-label';
                    langLabel.textContent = lang;
                    wrapper.appendChild(langLabel);
                }

                const btn = document.createElement('button');
                btn.className = 'copy-btn';
                btn.innerHTML = '📋 Copy';
                btn.addEventListener('click', async () => {
                    const text = code?.textContent || '';
                    try {
                        await navigator.clipboard.writeText(text);
                        btn.innerHTML = '✓ Copied!';
                        btn.classList.add('copied');
                        setTimeout(() => {
                            btn.innerHTML = '📋 Copy';
                            btn.classList.remove('copied');
                        }, 2000);
                    } catch {
                        btn.innerHTML = '✗ Failed';
                        setTimeout(() => {
                            btn.innerHTML = '📋 Copy';
                        }, 2000);
                    }
                });
                wrapper.appendChild(btn);
            });
        };

        // Run after a small delay to ensure content is rendered
        setTimeout(addCopyButtons, 100);
    }, []);

    return null;
}
