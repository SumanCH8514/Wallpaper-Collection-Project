<?php
ini_set('display_errors', '0');
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);

$REPO = getenv('GITHUB_REPO') ?: "SumanCH8514/Wallpaper-Collection-Project";
$BRANCH_NAME = getenv('GITHUB_BRANCH') ?: "main";
$IMAGES_DIRECTORY = "images";

$BASE_URL = "https://raw.githubusercontent.com/$REPO/$BRANCH_NAME/$IMAGES_DIRECTORY/";

// Prefix for generating 332x200px thumbnails
$IMGPROXY_PREFIX = "https://dc1imgproxy.fly.dev/x/rs:auto:332:200:1/plain/" . urlencode($BASE_URL);

// Whether to force a redirect
$redirect = isset($_GET['redirect']) ? $_GET['redirect'] === "1" : false;
$WALLPAPERS = [
    'acoolrocket-dalle2-hokusai-non-prompt-landscape.png',
    'afreen-red-sunset-horizon.png',
    'alejagalesa-another-world.jpg',
    'alejagalesa-calm-day.jpg',
    'alejagalesa-camp.jpg',
    'alejagalesa-horse-in-the-sunset.jpg',
    'alejagalesa-modern-buildings.jpg',
    'alejagalesa-mount-fuji.jpg',
    'alejagalesa-multivist-landscape.jpg',
    'alejagalesa-pink-landscape.jpg',
    'alejagalesa-purple-bear.jpg',
    'alejagalesa-starry-nigh.jpg',
    'alejagalesa-the-beach-neighborhood.jpg',
    'alejagalesa-the-city.jpg',
    'alena-aenami-7pm.png',
    'alena-aenami-any-minute-now.jpg',
    'alena-aenami-around-us.jpg',
    'alena-aenami-autumn-in-budapest.png',
    'alena-aenami-away.jpg',
    'alena-aenami-blue-hour.jpg',
    'alena-aenami-castle-in-the-sky.jpg',
    'alena-aenami-clouds.jpg',
    'alena-aenami-dawn.jpg',
    'alena-aenami-eclipse.jpg',
    'alena-aenami-escape.jpg',
    'alena-aenami-far-from-tomorrow.jpg',
    'alena-aenami-horizon.png',
    'alena-aenami-in-search-of-peace.png',
    'alena-aenami-lights.jpg',
    'alena-aenami-lost-in-between.jpg',
    'alena-aenami-out-of-time.png',
    'alena-aenami-sky-mirror.jpg',
    'alena-aenami-stardust.jpg',
    'alena-aenami-stars-and-you.png',
    'alena-aenami-the-witcher.jpg',
    'alena-aenami-timeless.jpg',
    'alena-aenami-wait.jpg',
    'alena-aenami-wings.jpg',
    'alena-aenami-you.jpg',
    'altos-odyssey-balloon-over-blue-mountains.jpg',
    'altos-odyssey-blue-hills-balloon.jpg',
    'altos-odyssey-chasm-jump.jpg',
    'altos-odyssey-palm-kicker.jpg',
    'altos-odyssey-purple-mountain-castle.jpg',
    'alx-colorful-clouds.png',
    'alx-sunset-over-palm-trees.png',
    'among-trees-campsite.jpg',
    'among-trees-dadaws-night-is-coming.jpg',
    'among-trees-dadaws-small-cliffs.jpg',
    'andrew-maleski-ghostly-gate.jpg',
    'arcipello-scorched-earth.jpg',
    'arcipello-what-once-was.jpg',
    'arseniy-chebynkin-tokyo-street-night.jpg',
    'artwithflo-empire-state-building.png',
    'baajjii-vector-desert.jpg',
    'bastien-grivet-the-guy-and-the-id-checking-bot.jpg',
    'bisbiswas-a-summer-evening.png',
    'bisbiswas-burning-clouds.png',
    'bisbiswas-gathering.jpg',
    'bisbiswas-lit-up-sky.jpg',
    'bisbiswas-verdant-moonlight-no-people-edit.jpg',
    'blackwolfshadow1-wolf-of-the-night.jpg',
    'by-kvacm-gorod-zakat-liudi-siluty-budushchee.jpg',
    'byrotek-calm-meadow.jpg',
    'byrotek-mountain-view.png',
    'byrotek-north-capital.png',
    'byrotek-sundown-landscape.png',
    'chilledcow-kupla-kingdom-in-blue.jpg',
    'chrisostrowski-the-esteemed-palace-light.jpg',
    'chrisostrowski-the-esteemed-palace.jpg',
    'ciorano-the-sacred-creature.jpg',
    'colormate-monogatari.jpg',
    'craig-nacroix-mountains.jpg',
    'dalle2-minimalistic-colorful-flat-mountain-landscape.png',
    'dangiuz-leopoldo-d-angelo-westofthesun.png',
    'daniel-ignacio-the-deer-spirit.jpg',
    'darkkal44-come-with-me-surfaces.png',
    'dataxiii-upscaled-vector-landscape.jpg',
    'denis-istomin-chicco3.jpg',
    'denis-istomin-listen-to-your-heart.jpg',
    'denis-istomin-midnight-gazing.png',
    'dpcdpc11-exodus.png',
    'dpcdpc11-isolation.png',
    'dpcdpc11-summer-on-the-lake.png',
    'drawingsandstuff-lonely-tree.png',
    'dropside-the-valley-ultrawide-gradient-landscape.png',
    'edward11mk-deer-in-forest.jpg',
    'edward11mk-tents-in-nature.jpg',
    'Electronic_Sample_96-calm-night.png',
    'ellysiumn-flaming-kingdom.jpg',
    'era7-asian-spirit.jpg',
    'era7-city-of-the-amethyst-nights.jpg',
    'eric-elwell-tropical-environment.jpg',
    'exitmothership-sunset-scene.jpg',
    'f-tam-mountain-wilderness.png',
    'faithhal-boat-and-mountains.jpg',
    'farjana5240-bridge-forest.jpg',
    'ferdinand-ladera-rice-terraces.jpg',
    'forangeillustrations-ashenvale.png',
    'frank-sun-twelve-suns.jpg',
    'gamesdas-fantasy-collection-3.jpg',
    'gavrl-snowy-forest.jpg',
    'gavryl-broken-structures.jpg',
    'gavryl-by-your-side.jpg',
    'gavryl-cozy-night.jpg',
    'gloomilygray-journey.jpg',
    'gustavo-arteaga-ancient-tree-shrine.png',
    'gustavo-arteaga-monolith-on-giants-causeway.jpg',
    'gustavo-arteaga-reload.jpg',
    'gustavo-arteaga-revenge.jpg',
    'gydw1n-whisper-of-the-heart.jpg',
    'haneron-landscape-mountain-home.jpg',
    'hangmoon-alexander-komarov-white-blue-red-clouds.jpg',
    'hangmoon-city.jpg',
    'hangmoon-white-blue-red-clouds.jpg',
    'higgsas-outrun.jpg',
    'howard-chen-mao-mao-forest-campsite.jpg',
    'hugobarretcastan-house-in-forest.jpg',
    'icondesire-train-cross.png',
    'incognit0ergosum-stable-diffusion-ultimate-city-autumn-meadow.jpg',
    'itsmatt-japanese-painting-remade.jpg',
    'itspatra-trailer-in-yosemite.png',
    'jaynit-samurai-bridge.jpg',
    'jay_v_jackson-between-the-twin-cities-recolored.jpg',
    'jeff-ostberg-cozy-autumn-rain.jpg',
    'joeyjazz-a-simple-scene.jpg',
    'joeyjazz-antares.png',
    'joeyjazz-behind-the-blister.jpg',
    'joeyjazz-dreams-in-pastel.jpg',
    'joeyjazz-just-a-tree-and-a-breeze.jpg',
    'joeyjazz-place-out-of-place.png',
    'joeyjazz-sp-fields-of-bronze.jpg',
    'joeyjazz-sp-highrise.jpg',
    'joeyjazz-timeless.jpg',
    'joeyjazz-under-the-strange-horizon.jpg',
    'joeyjazz-water-air-and-some-magic.jpg',
    'joeyjazz-where-day-and-night-meet.jpg',
    'jonadinges-getaway.png',
    'josef-barton-the-last-one.jpg',
    'josegoncalo-beasts.jpg',
    'junhyuk-lim-acoolrocket-tree-of-life-edit.png',
    'jurrig-hutan-owl-forest-night.jpg',
    'kak8gm-louis-coyle-inspired-lakeside-aurora.jpg',
    'kevin-gnutzmans-singularity.jpg',
    'kuldarleement-stellar-collision.jpg',
    'kvacm-africa-feeling.png',
    'kvacm-amythest-kingdom.jpg',
    'kvacm-early-evening.jpg',
    'kvacm-falling-sun.png',
    'kvacm-magenta-bay.png',
    'kvacm-misty-mountains.jpg',
    'kvacm-night-patrol.jpg',
    'kvacm-pinky-purple.jpg',
    'kvacm-sunlight.png',
    'kvacm-synth-waterfall.png',
    'kvacm-synthwave-view.jpg',
    'kvacm-torii-city.jpg',
    'lee_zudarts-study.jpg',
    'lofi-coffee.jpg',
    'louis-coyle-inspired-lakeside.png',
    'louis-coyle-sunrise.jpg',
    'mark-kirkpatrick-mk-landscape-05.jpg',
    'masterteacher-red-sky-background.jpg',
    'matt-carlson-spring-mountain.png',
    'michal-lisowski-entergalactic.png',
    'mitchrandom-alpine-sunset.png',
    'mklgustafsson-among-trees-deer.jpg',
    'mklgustafsson-among-trees-forest.png',
    'mklgustafsson-among-trees-fox.jpg',
    'mklgustafsson-among-trees-river-side.jpg',
    'mklgustafsson-small-memory.png',
    'mklgustafsson-the-girl-and-the-bear.png',
    'moewanders-summers-end.jpg',
    'moewanders-the-frontier.jpg',
    'mofghfgfgh-moon-mountain.png',
    'mofghfgfgh-ocean-sunset.png',
    'mrwhoseboss-dalle2-edit-alone-but-awesome.jpg',
    'muhammad-nafay-deer-and-the-fireflies.jpg',
    'muhammad-nafay-the-new-light.jpg',
    'muhammad_nafay-couple-cityscape.png',
    'muriLLu-Anime-Scenery-Sunset.jpg',
    'muriLLu-Japan-Neo-Wallpaper.png',
    'ncoll36-forest-mountain.jpg',
    'neonoverdrive-pastel_sunset_by.png',
    'neonoverdrive-vaporwave-off-kanagawa.jpg',
    'neonoverdrive-vast-neon-cityscape.jpg',
    'normieboy96-cherry-blossom.jpg',
    'ogarart-bitter-coast.jpg',
    'ogarart-blue-lighthouse-2019-01-13.jpg',
    'ogarart-bridge.jpg',
    'ogarart-cactus-2019-01-20.jpg',
    'OGARart-eagle-mountain-sunset-minimalist.jpg',
    'ogarart-forest-mountains-2019-01-17.jpg',
    'ogarart-forest-sunset-2019-01-25.png',
    'ogarart-forest-trees.jpg',
    'ogarart-fortress.jpg',
    'ogarart-frozen.jpg',
    'ogarart-lone-wanderer.jpg',
    'ogarart-mountains-ice.jpg',
    'ogarart-orange-sky-red-rocks-2019-03-04.jpg',
    'ogarart-purple-mountains-2019-01-29.jpg',
    'ogarart-purple-trees-2019-02-11.jpg',
    'ogarart-purple-trees-and-deer-2019-01-15.jpg',
    'ogarart-purple-trees-under-stars-2019-01-27.jpg',
    'ogarart-red-cave.jpg',
    'ogarart-red-mountains-lake-2019-10-06.jpg',
    'ogarart-red-mountains.jpg',
    'ogarart-savannah.jpg',
    'ogarart-sunset-2.jpg',
    'ogarart-wolf-and-blue-trees-2019-01-22.jpg',
    'olly-moss-boris001-firewatch.jpg',
    'olly-moss-dadaws-firewatch-bright-moon.jpg',
    'olly-moss-dadaws-firewatch-cliff.jpg',
    'olly-moss-firewatch-blue-forest.png',
    'olly-moss-firewatch-green.png',
    'olly-moss-firewatch-night.jpg',
    'olly-moss-firewatch-purple.jpg',
    'olly-moss-firewatch-red.jpg',
    'olly-moss-firewatch-river.png',
    'olly-moss-firewatch-stag.jpg',
    'olly-moss-firewatch-yellow.jpg',
    'olly-moss-sunset-mountains-firewatch.jpg',
    'P82En-cherry-blossom-mountain-range.jpg',
    'paralloid-reaching-the-stars-over-mountain.jpg',
    'partenoxenese-blue-faro.jpg',
    'phantomghostx-mountains.jpg',
    'quentinmarsollier-unexplored.png',
    'raven2cz-sunset-river-among-trees.png',
    'redditislikefb-astral-summit.png',
    'refiend-carmine-rock.jpg',
    'rhads-survivors.png',
    'richarddorran-city-of-life.jpg',
    'ricodz-lost.jpg',
    'rmradev-alien-moon.jpg',
    'rmradev-colorful-landscape.png',
    'rmradev-colorful-mountains.jpg',
    'rmradev-evening-forest.png',
    'rmradev-moon-sunset-landscape.png',
    'rmradev-mountain-retreat.jpg',
    'rmradev-mountains.jpg',
    'rmradev-peaceful-lake.png',
    'rmradev-sunset-landscape.jpg',
    'rmradev-tranquility.png',
    'rmradev-vampire-castle.jpg',
    'roboturtle_-purple-sky.jpg',
    'romain-trystram-Neon-Alleyway.jpg',
    'romen-deva-awakening.jpg',
    'rook-rip-mt-fuji.png',
    'ryky-sky-wave.png',
    'ryky-the-rest.png',
    'sabbathbl00dysabbath-desert-synthwave-ai-landscape.png',
    'saisho-moonlit-night-wedding.jpg',
    'salman-illustrator-japanese-landscape.png',
    'samantha-lee-purple-deer.png',
    'sandace11-dusk.jpg',
    'significancefit6753-samurai-evening-jonah-edit.jpg',
    'skavrx-mountain.png',
    'stable-diffusion-wavymulder-cyberpunk-sunset.png',
    'strigonian-far-north.png',
    'surendra-rajawat-butterflies.png',
    'surendra-rajawat-island-in-the-sky.jpg',
    'surendra-rajawat-natures-beauty.png',
    'surendra-rajawat-the-magic-unfolds.png',
    'tacosauceninja-blossoms.jpg',
    'tacosauceninja-i-cant-stop-what-you-began.png',
    'tacosauceninja-remembering.jpg',
    'tacosauceninja-rooftop.jpg',
    'tacosauceninja-shadows-die-twice.png',
    'tanvdesign-fantasy-landscape.png',
    'tanvdesign-wolf.jpg',
    'the-gate-to-serenity-danisogen.png',
    'thedigitalrob-separated-by-fate.jpg',
    'thomasshifflett31-beautiful-city-sunset.jpg',
    'tienphat-night-landscape.jpg',
    'tongxinfen-extraterrestrial.jpg',
    'totalcoconut-midjourney-landscape-wallpaper.jpg',
    'tyler-smith-blue-lagoon-port.jpg',
    'tyler-smith-redwoods-wolf.jpg',
    'uagami-cherry-blossoms.jpg',
    'unknown-anime-sunset.jpg',
    'unknown-bird-landing-on-water.jpg',
    'unknown-blue-moon-planets-over-lake-trees.jpg',
    'unknown-couple-on-red-mountains.jpg',
    'unknown-cyberpunk-city.jpg',
    'unknown-dark-mojave-desert.jpg',
    'unknown-deer-in-the-light.jpg',
    'unknown-downtown-minneapolis.jpg',
    'unknown-elephants-green-mountain.jpg',
    'unknown-green-mountains-and-hills.jpg',
    'unknown-ice-mountain-trees.png',
    'unknown-minimalist-desert-landscape.jpg',
    'unknown-mountain-birds.png',
    'unknown-multicolor-rocket-launch.jpg',
    'unknown-orange-sunset-over-blue-hills.jpg',
    'unknown-pink-mountains.png',
    'unknown-pink-rocky-cliffs-and-water.jpg',
    'unknown-pink-sunset-mountain-trees.png',
    'unknown-purple-lake.jpg',
    'unknown-purple-mountain-landscape-with-ship.jpg',
    'unknown-samurai-forest.jpg',
    'unknown-snowy-landscape.jpg',
    'unknown-sunset-behind-island-palm-trees.jpg',
    'unknown-sunset-fishing.jpg',
    'unknown-whale-tail-at-sunset.jpg',
    'unkown-purple-mountains.png',
    'unreal-midjourney-a-stunning-sunset.jpg',
    'vorgbardo-ancient-oriental-temple.jpg',
    'VorgBardo-midjourney-1960s-sci-fi-planet.jpg',
    'voyager-bequem-almost-spring-prev-2.jpg',
    'voyager-board-man-moonlit-nights-f.jpg',
    'voyager-camino-de-kazul-arte.jpg',
    'voyager-cloud-break-day-drifting.png',
    'voyager-coldbrew-backyard-gardens.jpg',
    'voyager-cosmonkey-leaves.jpg',
    'voyager-lofi-exposure.jpg',
    'voyager-nogymx-marauders.jpg',
    'voyager-otaam-tonion-lush-space.jpg',
    'voyager-quilla-teaser-traders.jpg',
    'voyager-sai-t-inownlove-overseas.jpg',
    'voyager-samurai-bebop-acoolrocket-edit.png',
    'voyager-simber-tibeauthetraveler-eternal-sunshine.jpg',
    'wallpapersden-purple-artistic-landscape.png',
    'wallpapersden.com_cool-red-mountains-4k.jpg',
    'wallpapersden.com_landscape-moon-digital-evening.jpg',
    'wallpapersden.com_minimal-reflection-sunset.jpg',
    'wallpapersden.com_nature-sunset-simple-minimal-illustration.jpg',
    'wallpapersden.com_pyramid-minimal-landscape.jpg',
    'wheazzy-birds-mountain.jpg',
    'wheazzy-blue-mountains.jpg',
    'wp5102649-neon-retro-city-ps4-wallpapers.png',
    'wp5998347-retro-4k-wallpapers.jpg',
    'wp6504516-monument-valley-sunset-ultra-hd-wallpapers.jpg',
    'yefedlger-eolyn.jpg',
    'zakoriart-commission-piece-for-game.jpg',
    'zakoriart-flow.jpg',
    'zakoriart-if-silence-could-be-heard.jpg',
    'zeoluwang-journey.jpg',
];

// Handle /images/... direct requests
$request_uri = $_SERVER['REQUEST_URI'] ?? '';
if (preg_match("/\/images\/(.*)$/", $request_uri, $matches)) {
    $filename = urldecode($matches[1]);
    $image_url = $BASE_URL . rawurlencode($filename);
    header("Location: $image_url", true, 302);
    exit;
}

// Handle ?random requests
if (isset($_GET['random']) && !empty($WALLPAPERS)) {
    $random_name = $WALLPAPERS[array_rand($WALLPAPERS)];
    $random_url = $BASE_URL . rawurlencode($random_name);
    header("Location: $random_url", true, 302);
    exit;
}

$total_count = count($WALLPAPERS);
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
        * { box-sizing: border-box; }
        body {
            background: #121212;
            color: #f1f1f1;
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 20px 10px;
            text-align: center;
        }
        a { color: #64B5F6; text-decoration: none; }
        a:hover { text-decoration: underline; }
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
            padding: 10px;
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
        div.gslide-desc { color: #eee; }
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
    <h1 class="title">??? Minimalistic Wallpaper Collection</h1>
    <p class="tagline">Over <?= $total_count; ?> handpicked high-resolution minimalistic & nature wallpapers</p>

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
        <?php foreach ($WALLPAPERS as $file_name) : ?>
            <?php 
                $full_img_url = $BASE_URL . rawurlencode($file_name);
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
        <p>Curated with ?? by <a href="https://github.com/SumanCH8514">SumanCH8514</a> &bull; Distributed under MIT License</p>
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
