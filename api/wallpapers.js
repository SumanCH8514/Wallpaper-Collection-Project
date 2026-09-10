/**
 * Serverless Function: Wallpapers Catalog API
 * Endpoint: /api/wallpapers
 */

const wallpapers = require('../data/wallpapers.json');

module.exports = (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  const host = req.headers.host || "localhost";
  const parsedUrl = new URL(req.url, `http://${host}`);
  const tag = (parsedUrl.searchParams.get("tag") || "").toLowerCase();
  const query = (
    parsedUrl.searchParams.get("q") ||
    parsedUrl.searchParams.get("query") ||
    ""
  ).toLowerCase();
  const limit = parseInt(parsedUrl.searchParams.get("limit") || "0", 10);
  const page = Math.max(
    1,
    parseInt(parsedUrl.searchParams.get("page") || "1", 10),
  );

  const repo =
    process.env.GITHUB_REPO || "SumanCH8514/Wallpaper-Collection-Project";
  const branch = process.env.GITHUB_BRANCH || "main";
  const rawBaseUrl = `https://raw.githubusercontent.com/${repo}/${branch}/images/`;

  let results = wallpapers;

  if (tag) {
    results = results.filter((w) => w.tags.includes(tag));
  }

  if (query) {
    results = results.filter(
      (w) =>
        w.title.toLowerCase().includes(query) ||
        w.author.toLowerCase().includes(query) ||
        w.filename.toLowerCase().includes(query),
    );
  }

  const totalMatching = results.length;

  // Apply pagination if limit is specified
  if (limit > 0) {
    const offset = (page - 1) * limit;
    results = results.slice(offset, offset + limit);
  }

  const formatted = results.map((item) => ({
    ...item,
    url: `/api/images/${encodeURIComponent(item.filename)}`,
    raw_url: `${rawBaseUrl}${encodeURIComponent(item.filename)}`,
    thumbnail: `https://dc1imgproxy.fly.dev/x/rs:auto:480:270:1/plain/${encodeURIComponent(rawBaseUrl)}${encodeURIComponent(item.filename)}`,
  }));

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
  );

  res.end(
    JSON.stringify(
      {
        status: "success",
        total: wallpapers.length,
        matched: totalMatching,
        page: limit > 0 ? page : 1,
        limit: limit > 0 ? limit : totalMatching,
        data: formatted,
      },
      null,
      2,
    ),
  );
};
