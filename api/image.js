/**
 * Robust High-Performance Edge-Cached Image Proxy
 * Endpoint: /api/images/:file or /api/image?file=:file
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const wallpapers = require('../data/wallpapers.json');
const validFilenames = new Set(wallpapers.map(w => w.filename.toLowerCase()));

const MIME_TYPES = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
};

module.exports = (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        return res.end();
    }

    const host = req.headers.host || 'localhost';
    const parsedUrl = new URL(req.url, `http://${host}`);
    
    // Extract filename from query or url path
    let filename = req.query?.file || parsedUrl.searchParams.get('file') || '';
    if (!filename) {
        const parts = parsedUrl.pathname.split('/');
        filename = parts[parts.length - 1] || '';
    }

    filename = decodeURIComponent(filename).trim();
    const safeFilename = path.basename(filename);

    if (!safeFilename) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Filename parameter is required' }));
    }

    const ext = path.extname(safeFilename).toLowerCase();
    const contentType = MIME_TYPES[ext];

    if (!contentType) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Unsupported file extension' }));
    }

    // Security Check: Validate filename against the collection
    if (!validFilenames.has(safeFilename.toLowerCase())) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Image not found in collection' }));
    }

    // 1. Check if file exists locally on disk (for local development or container runtimes)
    const localImagePath = path.resolve(__dirname, '../images', safeFilename);
    if (fs.existsSync(localImagePath)) {
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `inline; filename="${safeFilename}"`);
        res.setHeader('Cache-Control', 'public, max-age=31536000, s-maxage=31536000, immutable');
        return fs.createReadStream(localImagePath).pipe(res);
    }

    // 2. Stream from GitHub Raw source with Edge CDN caching
    const repo = process.env.GITHUB_REPO || 'SumanCH8514/Wallpaper-Collection-Project';
    const branch = process.env.GITHUB_BRANCH || 'main';
    const targetUrl = `https://raw.githubusercontent.com/${repo}/${branch}/images/${encodeURIComponent(safeFilename)}`;

    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Wallpaper-Collection-Proxy/1.0)'
        }
    };

    https.get(targetUrl, options, (proxyRes) => {
        if (proxyRes.statusCode !== 200) {
            res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: `Failed to fetch image: HTTP ${proxyRes.statusCode}` }));
        }

        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `inline; filename="${safeFilename}"`);
        res.setHeader('Cache-Control', 'public, max-age=31536000, s-maxage=31536000, immutable');
        if (proxyRes.headers['content-length']) {
            res.setHeader('Content-Length', proxyRes.headers['content-length']);
        }
        if (proxyRes.headers['etag']) {
            res.setHeader('ETag', proxyRes.headers['etag']);
        }

        proxyRes.pipe(res);
    }).on('error', (err) => {
        console.error('Image proxy error:', err);
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Bad gateway connecting to upstream source' }));
    });
};
