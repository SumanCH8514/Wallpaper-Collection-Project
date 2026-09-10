const http = require('http');
const fs = require('fs');
const path = require('path');
const randomHandler = require('./api/random');

const PORT = process.env.PORT || 8000;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    // Handle Random Wallpaper API (/api/random or /random or /?random)
    if (pathname === '/api/random' || pathname === '/random' || parsedUrl.searchParams.has('random')) {
        return randomHandler(req, res);
    }

    // Handle static file serving
    let filePath = pathname === '/' ? path.join(__dirname, 'index.html') : path.join(__dirname, pathname);

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('404 Not Found');
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
    });
});

server.listen(PORT, () => {
    console.log(`🖼️ Wallpaper Collection server running at http://localhost:${PORT}`);
    console.log(`🔀 Random API available at http://localhost:${PORT}/api/random`);
});
