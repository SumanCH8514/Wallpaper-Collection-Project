const wallpapers = require('./image_list.json');

module.exports = (req, res) => {
    const repo = process.env.GITHUB_REPO || "SumanCH8514/Wallpaper-Collection-Project";
    const branch = process.env.GITHUB_BRANCH || "main";
    const baseUrl = `https://raw.githubusercontent.com/${repo}/${branch}/images/`;

    const randomFile = wallpapers[Math.floor(Math.random() * wallpapers.length)];
    const imageUrl = baseUrl + encodeURIComponent(randomFile);

    // Redirect to the random wallpaper
    res.writeHead(302, {
        'Location': imageUrl,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    });
    res.end();
};
