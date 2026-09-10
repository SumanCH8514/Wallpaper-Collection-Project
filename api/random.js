/**
 * Serverless Function: Random Wallpaper API
 * Endpoint: /api/random
 */

const wallpapers = require('./wallpapers.json');

module.exports = (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        return res.end();
    }

    const host = req.headers.host || 'localhost';
    const parsedUrl = new URL(req.url, `http://${host}`);
    const tag = (parsedUrl.searchParams.get('tag') || '').toLowerCase();
    const query = (parsedUrl.searchParams.get('q') || parsedUrl.searchParams.get('query') || '').toLowerCase();
    const asJson = parsedUrl.searchParams.get('json') === 'true' || req.headers.accept?.includes('application/json');
    const redirect = parsedUrl.searchParams.get('redirect') !== 'false';

    const repo = process.env.GITHUB_REPO || 'SumanCH8514/Wallpaper-Collection-Project';
    const branch = process.env.GITHUB_BRANCH || 'main';
    const rawBaseUrl = `https://raw.githubusercontent.com/${repo}/${branch}/images/`;

    // Filter wallpapers if query or tag is supplied
    let pool = wallpapers;
    if (tag) {
        pool = pool.filter(w => w.tags.includes(tag));
    }
    if (query) {
        pool = pool.filter(w => 
            w.title.toLowerCase().includes(query) || 
            w.author.toLowerCase().includes(query) ||
            w.filename.toLowerCase().includes(query)
        );
    }

    if (pool.length === 0) {
        pool = wallpapers; // Fallback to full pool if no match
    }

    const item = pool[Math.floor(Math.random() * pool.length)];
    const fullImageUrl = `${rawBaseUrl}${encodeURIComponent(item.filename)}`;
    const thumbnailUrl = `https://dc1imgproxy.fly.dev/x/rs:auto:480:270:1/plain/${encodeURIComponent(rawBaseUrl)}${encodeURIComponent(item.filename)}`;

    if (asJson) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        return res.end(JSON.stringify({
            status: 'success',
            data: {
                id: item.id,
                title: item.title,
                author: item.author,
                filename: item.filename,
                tags: item.tags,
                format: item.format,
                url: fullImageUrl,
                thumbnail: thumbnailUrl
            }
        }, null, 2));
    }

    // Default: 302 Found redirect to raw image
    res.writeHead(302, {
        'Location': fullImageUrl,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    });
    res.end();
};
