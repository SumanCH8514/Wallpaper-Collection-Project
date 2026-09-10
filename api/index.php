<?php

/**
 * Fetch URL contents safely using cURL or file_get_contents
 */
function safeFetch($url, $userAgent = 'Mozilla/5.0 (compatible; Wallpaper-Collection-Project)')
{
    if (function_exists('curl_init')) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_AUTOREFERER, true);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);
        curl_setopt($ch, CURLOPT_TIMEOUT, 6);
        $response = curl_exec($ch);
        curl_close($ch);
        if ($response !== false && !empty($response)) {
            return $response;
        }
    }

    $opts = [
        'http' => [
            'method' => 'GET',
            'header' => "User-Agent: " . $userAgent . "\r\n",
            'timeout' => 6,
            'ignore_errors' => true
        ],
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false
        ]
    ];
    $context = stream_context_create($opts);
    return @file_get_contents($url, false, $context) ?: "";
}

/**
 * Display or redirect to an image
 */
function displayImage($url, $userAgent, $redirect)
{
    if (file_exists($url)) {
        $contents = @file_get_contents($url);
        if (preg_match("/\.(jpg|jpeg)$/i", $url)) {
            header('Content-Type: image/jpeg');
        } elseif (preg_match("/\.(png)$/i", $url)) {
            header('Content-Type: image/png');
        } elseif (preg_match("/\.(gif)$/i", $url)) {
            header('Content-Type: image/gif');
        }
        header('Content-Disposition: inline; filename="' . basename($url) . '"');
        exit($contents);
    }

    if ($redirect) {
        header("Location: $url");
        exit;
    }

    $contents = safeFetch($url, $userAgent);
    if (empty($contents) || strlen($contents) > 4500000) {
        header("Location: $url");
        exit;
    }

    if (preg_match("/\.(jpg|jpeg)$/i", $url)) {
        header('Content-Type: image/jpeg');
    } elseif (preg_match("/\.(png)$/i", $url)) {
        header('Content-Type: image/png');
    } elseif (preg_match("/\.(gif)$/i", $url)) {
        header('Content-Type: image/gif');
    }
    header('Content-Disposition: inline; filename="' . basename($url) . '"');
    exit($contents);
}

$REPO = getenv('GITHUB_REPO') ?: "SumanCH8514/Wallpaper-Collection-Project";
$BRANCH_NAME = getenv('GITHUB_BRANCH') ?: "main";
$IMAGES_DIRECTORY = "images";

$BASE_URL = "https://raw.githubusercontent.com/$REPO/$BRANCH_NAME/$IMAGES_DIRECTORY/";

// Prefix for generating 332x200px thumbnails
$IMGPROXY_PREFIX = "https://dc1imgproxy.fly.dev/x/rs:auto:332:200:1/plain/" . urlencode($BASE_URL);

// Whether to force a redirect
$redirect = isset($_GET['redirect']) ? $_GET['redirect'] === "1" : false;

// If URL is in the form "/images/...", output image
if (preg_match("/\/images\/(.*)$/", $_SERVER['REQUEST_URI'] ?? '', $matches)) {
    $filename = urldecode($matches[1]);
    $local_file = __DIR__ . "/../images/" . $filename;
    if (file_exists($local_file)) {
        displayImage($local_file, $REPO, false);
    } else {
        $image_path = $BASE_URL . rawurlencode($filename);
        displayImage($image_path, $REPO, $redirect);
    }
}

// Load images list
$images = [];

// 1. Try pre-bundled image_list.json (fastest and zero external API dependencies)
$json_path = __DIR__ . '/image_list.json';
if (file_exists($json_path)) {
    $raw_list = json_decode(file_get_contents($json_path), true);
    if (is_array($raw_list)) {
        foreach ($raw_list as $file) {
            $images[] = [
                "name" => $file,
                "download_url" => $BASE_URL . rawurlencode($file)
            ];
        }
    }
}

// 2. Fallback to local images folder if running locally
if (empty($images)) {
    $local_dir = __DIR__ . "/../images";
    if (is_dir($local_dir)) {
        $files = scandir($local_dir);
        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..' && preg_match('/\.(jpg|jpeg|png|webp|gif)$/i', $file)) {
                $images[] = [
                    "name" => $file,
                    "download_url" => "/images/" . rawurlencode($file)
                ];
            }
        }
    }
}

// 3. Fallback to GitHub API if list still empty
if (empty($images)) {
    $github_api_url = "https://api.github.com/repos/$REPO/contents/$IMAGES_DIRECTORY/";
    $api_response = safeFetch($github_api_url, $REPO);
    $decoded = json_decode($api_response, true);
    if (is_array($decoded) && !isset($decoded['message'])) {
        $images = $decoded;
    }
}

// If ?random requested, return random image
if (isset($_GET['random']) && !empty($images)) {
    $random_item = $images[array_rand($images)];
    $random_image_path = $random_item["download_url"] ?? ($BASE_URL . rawurlencode($random_item["name"]));
    displayImage($random_image_path, $REPO, $redirect);
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minimalistic Wallpaper Collection</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" />
    <script src="https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js"></script>
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            background: #121212;
            color: #f1f1f1;
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 20px 10px;
            text-align: center;
        }

        a {
            color: #64B5F6;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .title {
            margin-top: 1em;
            margin-bottom: 0.2em;
            font-weight: 600;
            font-size: 2.2rem;
            letter-spacing: -0.5px;
        }

        .tagline {
            color: #888;
            font-size: 1rem;
            margin-top: 0;
            margin-bottom: 1.5em;
        }

        .icons {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1.5em;
            margin-bottom: 2.5em;
        }

        .icons a {
            color: #ddd;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 8px;
            border-radius: 50%;
            background: #1e1e1e;
            transition: all 0.2s ease;
        }

        .icons a:hover {
            color: #fff;
            background: #2a2a2a;
            transform: translateY(-2px);
        }

        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            grid-gap: 1.25em;
            width: 95%;
            max-width: 1400px;
            margin: auto;
        }

        .gallery-item {
            position: relative;
            overflow: hidden;
            border-radius: 12px;
            background: #1e1e1e;
            aspect-ratio: 16 / 9;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .gallery-item:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
        }

        .gallery img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            border-radius: 12px;
            transition: opacity 0.3s ease;
        }

        .gallery img.loading {
            background: linear-gradient(90deg, #1e1e1e 0%, #2a2a2a 50%, #1e1e1e 100%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }

        .glightbox-clean .gslide-description {
            background: #181818;
        }

        div.gslide-desc {
            color: #eee;
        }

        .footer {
            margin-top: 4em;
            padding-top: 2em;
            border-top: 1px solid #222;
            color: #777;
            font-size: 0.9rem;
        }
    </style>
</head>

<body>
    <h1 class="title">🖼️ Minimalistic Wallpaper Collection</h1>
    <p class="tagline">Over <?= count($images); ?> handpicked high-resolution minimalistic & nature wallpapers</p>

    <div class="icons">
        <a href="https://github.com/<?= htmlspecialchars($REPO); ?>" target="_blank" title="GitHub Repository">
            <svg stroke="currentColor" fill="currentColor" viewBox="0 0 496 512" height="1.6em" xmlns="http://www.w3.org/2000/svg">
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z"></path>
            </svg>
        </a>
        <a href="/?random" target="_blank" title="Get Random Wallpaper">
            <svg stroke="currentColor" fill="currentColor" viewBox="0 0 512 512" height="1.6em" xmlns="http://www.w3.org/2000/svg">
                <path d="M386.688 487.75l-119.236-55.423c-7.898-3.673-11.334-13.065-7.66-20.976l84.374-181.523c3.667-7.904 13.07-11.334 20.963-7.667l119.24 55.434c7.9 3.673 11.33 13.065 7.656 20.964l-84.37 181.524c-3.678 7.904-13.076 11.334-20.968 7.667zM98.95 467.945L19.79 284.09c-3.448-8.007.255-17.302 8.25-20.744l39.196-16.872 48.975 184.044c4.694 17.588 22.755 28.078 40.36 23.39l39.032-10.386-75.907 32.686c-8.007 3.443-17.296-.255-20.744-8.262zm33.89-41.86L81.362 232.638c-2.24-8.42 2.78-17.078 11.19-19.312l34.033-9.052-4.098 30.465c-2.422 18.036 10.224 34.652 28.285 37.087l79.828 10.758-32.497 109.467c-3.345 11.28-.37 22.948 6.866 31.18l-52.82 14.05c-8.42 2.24-17.07-2.77-19.31-11.196z"></path>
            </svg>
        </a>
    </div>

    <div class="gallery">
        <?php foreach ($images as $image) : ?>
            <?php 
                $file_name = $image["name"] ?? basename($image["download_url"]);
                $full_img_url = $image["download_url"] ?? ($BASE_URL . rawurlencode($file_name));
                $thumb_url = $IMGPROXY_PREFIX . rawurlencode($file_name);
            ?>
            <div class="gallery-item">
                <a href="<?= htmlspecialchars($full_img_url); ?>" class="glightbox" data-alt="<?= htmlspecialchars($file_name); ?>" data-description="<?= htmlspecialchars($file_name); ?>">
                    <img src="<?= htmlspecialchars($thumb_url); ?>" loading="lazy" alt="<?= htmlspecialchars($file_name); ?>" title="<?= htmlspecialchars($file_name); ?>" class="loading" onload="this.classList.remove('loading')" onerror="this.src='<?= htmlspecialchars($full_img_url); ?>'">
                </a>
            </div>
        <?php endforeach; ?>
    </div>

    <div class="footer">
        <p>Curated with ❤️ by <a href="https://github.com/SumanCH8514">SumanCH8514</a> &bull; Distributed under MIT License</p>
    </div>

    <script type="text/javascript">
        window.addEventListener("load", function() {
            const lightbox = GLightbox({
                touchNavigation: true,
                loop: true
            });

            lightbox.on("slide_after_load", function(slide) {
                const image = slide.slide.querySelector("img");
                if (image && image.naturalWidth && image.naturalHeight) {
                    const descElem = slide.slide.querySelector(".gslide-desc");
                    if (descElem) {
                        descElem.innerText = slide.slideConfig.description + ` (${image.naturalWidth} × ${image.naturalHeight})`;
                    }
                }
            });
        });
    </script>
</body>
</html>
