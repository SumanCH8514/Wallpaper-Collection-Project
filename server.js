/**
 * Production-Grade Zero-Dependency HTTP Server
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const randomHandler = require("./api/random");
const wallpapersHandler = require("./api/wallpapers");
const imagesHandler = require("./api/images");

const PORT = parseInt(process.env.PORT || "8000", 10);
const HOST = process.env.HOST || "0.0.0.0";
const PUBLIC_DIR = path.resolve(__dirname, "public");
const IMAGES_DIR = path.resolve(__dirname, "images");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

/**
 * Apply Security Headers
 */
function applySecurityHeaders(res) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
}

/**
 * Serve static files safely with path traversal protection and Gzip compression
 */
function serveStatic(req, res, targetPath) {
  const ext = path.extname(targetPath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  fs.stat(targetPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("404 Not Found");
    }

    // Cache static assets (CSS, JS, images, JSON)
    if (
      [".css", ".js", ".jpg", ".jpeg", ".png", ".webp", ".svg"].includes(ext)
    ) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    } else {
      res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    }

    res.setHeader("Content-Type", contentType);

    const acceptEncoding = req.headers["accept-encoding"] || "";
    const shouldCompress = [".html", ".css", ".js", ".json", ".svg"].includes(
      ext,
    );

    if (shouldCompress && acceptEncoding.includes("gzip")) {
      res.setHeader("Content-Encoding", "gzip");
      res.writeHead(200);
      fs.createReadStream(targetPath).pipe(zlib.createGzip()).pipe(res);
    } else {
      res.setHeader("Content-Length", stats.size);
      res.writeHead(200);
      fs.createReadStream(targetPath).pipe(res);
    }
  });
}

const server = http.createServer((req, res) => {
  applySecurityHeaders(res);

  const host = req.headers.host || "localhost";
  const parsedUrl = new URL(req.url, `http://${host}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // API Routes
  if (
    pathname === "/api/random" ||
    pathname === "/random" ||
    parsedUrl.searchParams.has("random")
  ) {
    return randomHandler(req, res);
  }

  if (pathname.startsWith("/api/images")) {
    return imagesHandler(req, res);
  }

  if (pathname === "/api/wallpapers" || pathname === "/wallpapers") {
    return wallpapersHandler(req, res);
  }

  // Direct Image Serving (/images/...)
  if (pathname.startsWith("/images/")) {
    const imageFile = pathname.replace(/^\/images\//, "");
    const safeImagePath = path.resolve(IMAGES_DIR, imageFile);

    // Path traversal guard
    if (!safeImagePath.startsWith(IMAGES_DIR)) {
      res.writeHead(403, { "Content-Type": "text/plain" });
      return res.end("403 Forbidden");
    }

    return serveStatic(req, res, safeImagePath);
  }

  // Public Static Files (/ or /css/*, /js/*, /data/*)
  const relativePath =
    pathname === "/" ? "index.html" : pathname.replace(/^\//, "");
  const safeFilePath = path.resolve(PUBLIC_DIR, relativePath);

  // Path traversal guard
  if (!safeFilePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    return res.end("403 Forbidden");
  }

  serveStatic(req, res, safeFilePath);
});

server.listen(PORT, HOST, () => {
  console.log(`\n==================================================`);
  console.log(`🖼️  Minimalistic Wallpaper Collection`);
  console.log(
    `⚡  Server running at:  http://${HOST === "0.0.0.0" ? "localhost" : HOST}:${PORT}`,
  );
  console.log(`🔀  Random API at:      http://localhost:${PORT}/api/random`);
  console.log(
    `📋  Catalog API at:     http://localhost:${PORT}/api/wallpapers`,
  );
  console.log(`==================================================\n`);
});

// Graceful Shutdown
function handleShutdown(signal) {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log("Server closed successfully.");
    process.exit(0);
  });
}

process.on("SIGINT", () => handleShutdown("SIGINT"));
process.on("SIGTERM", () => handleShutdown("SIGTERM"));
