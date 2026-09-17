import { createHighlighter, type Highlighter } from 'shiki';

let highlighterPromise: Promise<Highlighter> | null = null;

export async function getShikiHighlighter() {
    if (!highlighterPromise) {
        highlighterPromise = createHighlighter({
            themes: ['github-dark'],
            langs: ['ts', 'tsx', 'js', 'jsx', 'bash', 'json', 'html', 'css', 'markdown', 'python'],
        });
    }
    return highlighterPromise;
}
