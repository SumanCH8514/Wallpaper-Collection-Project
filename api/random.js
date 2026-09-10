/**
 * Serverless Function: Random Wallpaper API
 * Endpoint: /api/random
 */

const wallpapers = [
  {
    "id": 1,
    "filename": "acoolrocket-dalle2-hokusai-non-prompt-landscape.png",
    "title": "Dalle2 Hokusai Non Prompt Landscape",
    "author": "Acoolrocket",
    "tags": [
      "landscape"
    ],
    "format": "png"
  },
  {
    "id": 2,
    "filename": "afreen-red-sunset-horizon.png",
    "title": "Red Sunset Horizon",
    "author": "Afreen",
    "tags": [
      "sunset"
    ],
    "format": "png"
  },
  {
    "id": 3,
    "filename": "alejagalesa-another-world.jpg",
    "title": "Another World",
    "author": "Alejagalesa",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 4,
    "filename": "alejagalesa-calm-day.jpg",
    "title": "Calm Day",
    "author": "Alejagalesa",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 5,
    "filename": "alejagalesa-camp.jpg",
    "title": "Camp",
    "author": "Alejagalesa",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 6,
    "filename": "alejagalesa-horse-in-the-sunset.jpg",
    "title": "Horse In The Sunset",
    "author": "Alejagalesa",
    "tags": [
      "sunset"
    ],
    "format": "jpg"
  },
  {
    "id": 7,
    "filename": "alejagalesa-modern-buildings.jpg",
    "title": "Modern Buildings",
    "author": "Alejagalesa",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 8,
    "filename": "alejagalesa-mount-fuji.jpg",
    "title": "Mount Fuji",
    "author": "Alejagalesa",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 9,
    "filename": "alejagalesa-multivist-landscape.jpg",
    "title": "Multivist Landscape",
    "author": "Alejagalesa",
    "tags": [
      "landscape"
    ],
    "format": "jpg"
  },
  {
    "id": 10,
    "filename": "alejagalesa-pink-landscape.jpg",
    "title": "Pink Landscape",
    "author": "Alejagalesa",
    "tags": [
      "landscape"
    ],
    "format": "jpg"
  },
  {
    "id": 11,
    "filename": "alejagalesa-purple-bear.jpg",
    "title": "Purple Bear",
    "author": "Alejagalesa",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 12,
    "filename": "alejagalesa-starry-nigh.jpg",
    "title": "Starry Nigh",
    "author": "Alejagalesa",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 13,
    "filename": "alejagalesa-the-beach-neighborhood.jpg",
    "title": "The Beach Neighborhood",
    "author": "Alejagalesa",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 14,
    "filename": "alejagalesa-the-city.jpg",
    "title": "The City",
    "author": "Alejagalesa",
    "tags": [
      "city"
    ],
    "format": "jpg"
  },
  {
    "id": 15,
    "filename": "alena-aenami-7pm.png",
    "title": "Aenami 7pm",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 16,
    "filename": "alena-aenami-any-minute-now.jpg",
    "title": "Aenami Any Minute Now",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 17,
    "filename": "alena-aenami-around-us.jpg",
    "title": "Aenami Around Us",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 18,
    "filename": "alena-aenami-autumn-in-budapest.png",
    "title": "Aenami Autumn In Budapest",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 19,
    "filename": "alena-aenami-away.jpg",
    "title": "Aenami Away",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 20,
    "filename": "alena-aenami-blue-hour.jpg",
    "title": "Aenami Blue Hour",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 21,
    "filename": "alena-aenami-castle-in-the-sky.jpg",
    "title": "Aenami Castle In The Sky",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 22,
    "filename": "alena-aenami-clouds.jpg",
    "title": "Aenami Clouds",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 23,
    "filename": "alena-aenami-dawn.jpg",
    "title": "Aenami Dawn",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 24,
    "filename": "alena-aenami-eclipse.jpg",
    "title": "Aenami Eclipse",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 25,
    "filename": "alena-aenami-escape.jpg",
    "title": "Aenami Escape",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 26,
    "filename": "alena-aenami-far-from-tomorrow.jpg",
    "title": "Aenami Far From Tomorrow",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 27,
    "filename": "alena-aenami-horizon.png",
    "title": "Aenami Horizon",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 28,
    "filename": "alena-aenami-in-search-of-peace.png",
    "title": "Aenami In Search Of Peace",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 29,
    "filename": "alena-aenami-lights.jpg",
    "title": "Aenami Lights",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 30,
    "filename": "alena-aenami-lost-in-between.jpg",
    "title": "Aenami Lost In Between",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 31,
    "filename": "alena-aenami-out-of-time.png",
    "title": "Aenami Out Of Time",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 32,
    "filename": "alena-aenami-sky-mirror.jpg",
    "title": "Aenami Sky Mirror",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 33,
    "filename": "alena-aenami-stardust.jpg",
    "title": "Aenami Stardust",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 34,
    "filename": "alena-aenami-stars-and-you.png",
    "title": "Aenami Stars And You",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 35,
    "filename": "alena-aenami-the-witcher.jpg",
    "title": "Aenami The Witcher",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 36,
    "filename": "alena-aenami-timeless.jpg",
    "title": "Aenami Timeless",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 37,
    "filename": "alena-aenami-wait.jpg",
    "title": "Aenami Wait",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 38,
    "filename": "alena-aenami-wings.jpg",
    "title": "Aenami Wings",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 39,
    "filename": "alena-aenami-you.jpg",
    "title": "Aenami You",
    "author": "Alena",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 40,
    "filename": "altos-odyssey-balloon-over-blue-mountains.jpg",
    "title": "Odyssey Balloon Over Blue Mountains",
    "author": "Altos",
    "tags": [
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 41,
    "filename": "altos-odyssey-blue-hills-balloon.jpg",
    "title": "Odyssey Blue Hills Balloon",
    "author": "Altos",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 42,
    "filename": "altos-odyssey-chasm-jump.jpg",
    "title": "Odyssey Chasm Jump",
    "author": "Altos",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 43,
    "filename": "altos-odyssey-palm-kicker.jpg",
    "title": "Odyssey Palm Kicker",
    "author": "Altos",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 44,
    "filename": "altos-odyssey-purple-mountain-castle.jpg",
    "title": "Odyssey Purple Mountain Castle",
    "author": "Altos",
    "tags": [
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 45,
    "filename": "alx-colorful-clouds.png",
    "title": "Colorful Clouds",
    "author": "Alx",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 46,
    "filename": "alx-sunset-over-palm-trees.png",
    "title": "Sunset Over Palm Trees",
    "author": "Alx",
    "tags": [
      "sunset"
    ],
    "format": "png"
  },
  {
    "id": 47,
    "filename": "among-trees-campsite.jpg",
    "title": "Trees Campsite",
    "author": "Among",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 48,
    "filename": "among-trees-dadaws-night-is-coming.jpg",
    "title": "Trees Dadaws Night Is Coming",
    "author": "Among",
    "tags": [
      "night"
    ],
    "format": "jpg"
  },
  {
    "id": 49,
    "filename": "among-trees-dadaws-small-cliffs.jpg",
    "title": "Trees Dadaws Small Cliffs",
    "author": "Among",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 50,
    "filename": "andrew-maleski-ghostly-gate.jpg",
    "title": "Maleski Ghostly Gate",
    "author": "Andrew",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 51,
    "filename": "arcipello-scorched-earth.jpg",
    "title": "Scorched Earth",
    "author": "Arcipello",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 52,
    "filename": "arcipello-what-once-was.jpg",
    "title": "What Once Was",
    "author": "Arcipello",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 53,
    "filename": "arseniy-chebynkin-tokyo-street-night.jpg",
    "title": "Chebynkin Tokyo Street Night",
    "author": "Arseniy",
    "tags": [
      "night"
    ],
    "format": "jpg"
  },
  {
    "id": 54,
    "filename": "artwithflo-empire-state-building.png",
    "title": "Empire State Building",
    "author": "Artwithflo",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 55,
    "filename": "baajjii-vector-desert.jpg",
    "title": "Vector Desert",
    "author": "Baajjii",
    "tags": [
      "desert"
    ],
    "format": "jpg"
  },
  {
    "id": 56,
    "filename": "bastien-grivet-the-guy-and-the-id-checking-bot.jpg",
    "title": "Grivet The Guy And The Id Checking Bot",
    "author": "Bastien",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 57,
    "filename": "bisbiswas-a-summer-evening.png",
    "title": "A Summer Evening",
    "author": "Bisbiswas",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 58,
    "filename": "bisbiswas-burning-clouds.png",
    "title": "Burning Clouds",
    "author": "Bisbiswas",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 59,
    "filename": "bisbiswas-gathering.jpg",
    "title": "Gathering",
    "author": "Bisbiswas",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 60,
    "filename": "bisbiswas-lit-up-sky.jpg",
    "title": "Lit Up Sky",
    "author": "Bisbiswas",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 61,
    "filename": "bisbiswas-verdant-moonlight-no-people-edit.jpg",
    "title": "Verdant Moonlight No People Edit",
    "author": "Bisbiswas",
    "tags": [
      "moon"
    ],
    "format": "jpg"
  },
  {
    "id": 62,
    "filename": "blackwolfshadow1-wolf-of-the-night.jpg",
    "title": "Wolf Of The Night",
    "author": "Blackwolfshadow1",
    "tags": [
      "night"
    ],
    "format": "jpg"
  },
  {
    "id": 63,
    "filename": "by-kvacm-gorod-zakat-liudi-siluty-budushchee.jpg",
    "title": "Kvacm Gorod Zakat Liudi Siluty Budushchee",
    "author": "By",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 64,
    "filename": "byrotek-calm-meadow.jpg",
    "title": "Calm Meadow",
    "author": "Byrotek",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 65,
    "filename": "byrotek-mountain-view.png",
    "title": "Mountain View",
    "author": "Byrotek",
    "tags": [
      "mountain"
    ],
    "format": "png"
  },
  {
    "id": 66,
    "filename": "byrotek-north-capital.png",
    "title": "North Capital",
    "author": "Byrotek",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 67,
    "filename": "byrotek-sundown-landscape.png",
    "title": "Sundown Landscape",
    "author": "Byrotek",
    "tags": [
      "landscape"
    ],
    "format": "png"
  },
  {
    "id": 68,
    "filename": "chilledcow-kupla-kingdom-in-blue.jpg",
    "title": "Kupla Kingdom In Blue",
    "author": "Chilledcow",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 69,
    "filename": "chrisostrowski-the-esteemed-palace-light.jpg",
    "title": "The Esteemed Palace Light",
    "author": "Chrisostrowski",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 70,
    "filename": "chrisostrowski-the-esteemed-palace.jpg",
    "title": "The Esteemed Palace",
    "author": "Chrisostrowski",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 71,
    "filename": "ciorano-the-sacred-creature.jpg",
    "title": "The Sacred Creature",
    "author": "Ciorano",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 72,
    "filename": "colormate-monogatari.jpg",
    "title": "Monogatari",
    "author": "Colormate",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 73,
    "filename": "craig-nacroix-mountains.jpg",
    "title": "Nacroix Mountains",
    "author": "Craig",
    "tags": [
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 74,
    "filename": "dalle2-minimalistic-colorful-flat-mountain-landscape.png",
    "title": "Minimalistic Colorful Flat Mountain Landscape",
    "author": "Dalle2",
    "tags": [
      "landscape",
      "mountain",
      "minimal"
    ],
    "format": "png"
  },
  {
    "id": 75,
    "filename": "dangiuz-leopoldo-d-angelo-westofthesun.png",
    "title": "Leopoldo D Angelo Westofthesun",
    "author": "Dangiuz",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 76,
    "filename": "daniel-ignacio-the-deer-spirit.jpg",
    "title": "Ignacio The Deer Spirit",
    "author": "Daniel",
    "tags": [
      "deer"
    ],
    "format": "jpg"
  },
  {
    "id": 77,
    "filename": "darkkal44-come-with-me-surfaces.png",
    "title": "Come With Me Surfaces",
    "author": "Darkkal44",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 78,
    "filename": "dataxiii-upscaled-vector-landscape.jpg",
    "title": "Upscaled Vector Landscape",
    "author": "Dataxiii",
    "tags": [
      "landscape"
    ],
    "format": "jpg"
  },
  {
    "id": 79,
    "filename": "denis-istomin-chicco3.jpg",
    "title": "Istomin Chicco3",
    "author": "Denis",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 80,
    "filename": "denis-istomin-listen-to-your-heart.jpg",
    "title": "Istomin Listen To Your Heart",
    "author": "Denis",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 81,
    "filename": "denis-istomin-midnight-gazing.png",
    "title": "Istomin Midnight Gazing",
    "author": "Denis",
    "tags": [
      "night"
    ],
    "format": "png"
  },
  {
    "id": 82,
    "filename": "dpcdpc11-exodus.png",
    "title": "Exodus",
    "author": "Dpcdpc11",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 83,
    "filename": "dpcdpc11-isolation.png",
    "title": "Isolation",
    "author": "Dpcdpc11",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 84,
    "filename": "dpcdpc11-summer-on-the-lake.png",
    "title": "Summer On The Lake",
    "author": "Dpcdpc11",
    "tags": [
      "lake"
    ],
    "format": "png"
  },
  {
    "id": 85,
    "filename": "drawingsandstuff-lonely-tree.png",
    "title": "Lonely Tree",
    "author": "Drawingsandstuff",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 86,
    "filename": "dropside-the-valley-ultrawide-gradient-landscape.png",
    "title": "The Valley Ultrawide Gradient Landscape",
    "author": "Dropside",
    "tags": [
      "landscape"
    ],
    "format": "png"
  },
  {
    "id": 87,
    "filename": "edward11mk-deer-in-forest.jpg",
    "title": "Deer In Forest",
    "author": "Edward11mk",
    "tags": [
      "forest",
      "deer"
    ],
    "format": "jpg"
  },
  {
    "id": 88,
    "filename": "edward11mk-tents-in-nature.jpg",
    "title": "Tents In Nature",
    "author": "Edward11mk",
    "tags": [
      "nature"
    ],
    "format": "jpg"
  },
  {
    "id": 89,
    "filename": "Electronic_Sample_96-calm-night.png",
    "title": "Sample 96 Calm Night",
    "author": "Electronic",
    "tags": [
      "night"
    ],
    "format": "png"
  },
  {
    "id": 90,
    "filename": "ellysiumn-flaming-kingdom.jpg",
    "title": "Flaming Kingdom",
    "author": "Ellysiumn",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 91,
    "filename": "era7-asian-spirit.jpg",
    "title": "Asian Spirit",
    "author": "Era7",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 92,
    "filename": "era7-city-of-the-amethyst-nights.jpg",
    "title": "City Of The Amethyst Nights",
    "author": "Era7",
    "tags": [
      "city",
      "night"
    ],
    "format": "jpg"
  },
  {
    "id": 93,
    "filename": "eric-elwell-tropical-environment.jpg",
    "title": "Elwell Tropical Environment",
    "author": "Eric",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 94,
    "filename": "exitmothership-sunset-scene.jpg",
    "title": "Sunset Scene",
    "author": "Exitmothership",
    "tags": [
      "sunset"
    ],
    "format": "jpg"
  },
  {
    "id": 95,
    "filename": "f-tam-mountain-wilderness.png",
    "title": "Tam Mountain Wilderness",
    "author": "F",
    "tags": [
      "mountain"
    ],
    "format": "png"
  },
  {
    "id": 96,
    "filename": "faithhal-boat-and-mountains.jpg",
    "title": "Boat And Mountains",
    "author": "Faithhal",
    "tags": [
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 97,
    "filename": "farjana5240-bridge-forest.jpg",
    "title": "Bridge Forest",
    "author": "Farjana5240",
    "tags": [
      "forest"
    ],
    "format": "jpg"
  },
  {
    "id": 98,
    "filename": "ferdinand-ladera-rice-terraces.jpg",
    "title": "Ladera Rice Terraces",
    "author": "Ferdinand",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 99,
    "filename": "forangeillustrations-ashenvale.png",
    "title": "Ashenvale",
    "author": "Forangeillustrations",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 100,
    "filename": "frank-sun-twelve-suns.jpg",
    "title": "Sun Twelve Suns",
    "author": "Frank",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 101,
    "filename": "gamesdas-fantasy-collection-3.jpg",
    "title": "Fantasy Collection 3",
    "author": "Gamesdas",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 102,
    "filename": "gavrl-snowy-forest.jpg",
    "title": "Snowy Forest",
    "author": "Gavrl",
    "tags": [
      "forest"
    ],
    "format": "jpg"
  },
  {
    "id": 103,
    "filename": "gavryl-broken-structures.jpg",
    "title": "Broken Structures",
    "author": "Gavryl",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 104,
    "filename": "gavryl-by-your-side.jpg",
    "title": "By Your Side",
    "author": "Gavryl",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 105,
    "filename": "gavryl-cozy-night.jpg",
    "title": "Cozy Night",
    "author": "Gavryl",
    "tags": [
      "night"
    ],
    "format": "jpg"
  },
  {
    "id": 106,
    "filename": "gloomilygray-journey.jpg",
    "title": "Journey",
    "author": "Gloomilygray",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 107,
    "filename": "gustavo-arteaga-ancient-tree-shrine.png",
    "title": "Arteaga Ancient Tree Shrine",
    "author": "Gustavo",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 108,
    "filename": "gustavo-arteaga-monolith-on-giants-causeway.jpg",
    "title": "Arteaga Monolith On Giants Causeway",
    "author": "Gustavo",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 109,
    "filename": "gustavo-arteaga-reload.jpg",
    "title": "Arteaga Reload",
    "author": "Gustavo",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 110,
    "filename": "gustavo-arteaga-revenge.jpg",
    "title": "Arteaga Revenge",
    "author": "Gustavo",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 111,
    "filename": "gydw1n-whisper-of-the-heart.jpg",
    "title": "Whisper Of The Heart",
    "author": "Gydw1n",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 112,
    "filename": "haneron-landscape-mountain-home.jpg",
    "title": "Landscape Mountain Home",
    "author": "Haneron",
    "tags": [
      "landscape",
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 113,
    "filename": "hangmoon-alexander-komarov-white-blue-red-clouds.jpg",
    "title": "Alexander Komarov White Blue Red Clouds",
    "author": "Hangmoon",
    "tags": [
      "moon"
    ],
    "format": "jpg"
  },
  {
    "id": 114,
    "filename": "hangmoon-city.jpg",
    "title": "City",
    "author": "Hangmoon",
    "tags": [
      "moon",
      "city"
    ],
    "format": "jpg"
  },
  {
    "id": 115,
    "filename": "hangmoon-white-blue-red-clouds.jpg",
    "title": "White Blue Red Clouds",
    "author": "Hangmoon",
    "tags": [
      "moon"
    ],
    "format": "jpg"
  },
  {
    "id": 116,
    "filename": "higgsas-outrun.jpg",
    "title": "Outrun",
    "author": "Higgsas",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 117,
    "filename": "howard-chen-mao-mao-forest-campsite.jpg",
    "title": "Chen Mao Mao Forest Campsite",
    "author": "Howard",
    "tags": [
      "forest"
    ],
    "format": "jpg"
  },
  {
    "id": 118,
    "filename": "hugobarretcastan-house-in-forest.jpg",
    "title": "House In Forest",
    "author": "Hugobarretcastan",
    "tags": [
      "forest"
    ],
    "format": "jpg"
  },
  {
    "id": 119,
    "filename": "icondesire-train-cross.png",
    "title": "Train Cross",
    "author": "Icondesire",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 120,
    "filename": "incognit0ergosum-stable-diffusion-ultimate-city-autumn-meadow.jpg",
    "title": "Stable Diffusion Ultimate City Autumn Meadow",
    "author": "Incognit0ergosum",
    "tags": [
      "city"
    ],
    "format": "jpg"
  },
  {
    "id": 121,
    "filename": "itsmatt-japanese-painting-remade.jpg",
    "title": "Japanese Painting Remade",
    "author": "Itsmatt",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 122,
    "filename": "itspatra-trailer-in-yosemite.png",
    "title": "Trailer In Yosemite",
    "author": "Itspatra",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 123,
    "filename": "jaynit-samurai-bridge.jpg",
    "title": "Samurai Bridge",
    "author": "Jaynit",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 124,
    "filename": "jay_v_jackson-between-the-twin-cities-recolored.jpg",
    "title": "V Jackson Between The Twin Cities Recolored",
    "author": "Jay",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 125,
    "filename": "jeff-ostberg-cozy-autumn-rain.jpg",
    "title": "Ostberg Cozy Autumn Rain",
    "author": "Jeff",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 126,
    "filename": "joeyjazz-a-simple-scene.jpg",
    "title": "A Simple Scene",
    "author": "Joeyjazz",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 127,
    "filename": "joeyjazz-antares.png",
    "title": "Antares",
    "author": "Joeyjazz",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 128,
    "filename": "joeyjazz-behind-the-blister.jpg",
    "title": "Behind The Blister",
    "author": "Joeyjazz",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 129,
    "filename": "joeyjazz-dreams-in-pastel.jpg",
    "title": "Dreams In Pastel",
    "author": "Joeyjazz",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 130,
    "filename": "joeyjazz-just-a-tree-and-a-breeze.jpg",
    "title": "Just A Tree And A Breeze",
    "author": "Joeyjazz",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 131,
    "filename": "joeyjazz-place-out-of-place.png",
    "title": "Place Out Of Place",
    "author": "Joeyjazz",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 132,
    "filename": "joeyjazz-sp-fields-of-bronze.jpg",
    "title": "Sp Fields Of Bronze",
    "author": "Joeyjazz",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 133,
    "filename": "joeyjazz-sp-highrise.jpg",
    "title": "Sp Highrise",
    "author": "Joeyjazz",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 134,
    "filename": "joeyjazz-timeless.jpg",
    "title": "Timeless",
    "author": "Joeyjazz",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 135,
    "filename": "joeyjazz-under-the-strange-horizon.jpg",
    "title": "Under The Strange Horizon",
    "author": "Joeyjazz",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 136,
    "filename": "joeyjazz-water-air-and-some-magic.jpg",
    "title": "Water Air And Some Magic",
    "author": "Joeyjazz",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 137,
    "filename": "joeyjazz-where-day-and-night-meet.jpg",
    "title": "Where Day And Night Meet",
    "author": "Joeyjazz",
    "tags": [
      "night"
    ],
    "format": "jpg"
  },
  {
    "id": 138,
    "filename": "jonadinges-getaway.png",
    "title": "Getaway",
    "author": "Jonadinges",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 139,
    "filename": "josef-barton-the-last-one.jpg",
    "title": "Barton The Last One",
    "author": "Josef",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 140,
    "filename": "josegoncalo-beasts.jpg",
    "title": "Beasts",
    "author": "Josegoncalo",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 141,
    "filename": "junhyuk-lim-acoolrocket-tree-of-life-edit.png",
    "title": "Lim Acoolrocket Tree Of Life Edit",
    "author": "Junhyuk",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 142,
    "filename": "jurrig-hutan-owl-forest-night.jpg",
    "title": "Hutan Owl Forest Night",
    "author": "Jurrig",
    "tags": [
      "forest",
      "night"
    ],
    "format": "jpg"
  },
  {
    "id": 143,
    "filename": "kak8gm-louis-coyle-inspired-lakeside-aurora.jpg",
    "title": "Louis Coyle Inspired Lakeside Aurora",
    "author": "Kak8gm",
    "tags": [
      "lake"
    ],
    "format": "jpg"
  },
  {
    "id": 144,
    "filename": "kevin-gnutzmans-singularity.jpg",
    "title": "Gnutzmans Singularity",
    "author": "Kevin",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 145,
    "filename": "kuldarleement-stellar-collision.jpg",
    "title": "Stellar Collision",
    "author": "Kuldarleement",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 146,
    "filename": "kvacm-africa-feeling.png",
    "title": "Africa Feeling",
    "author": "Kvacm",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 147,
    "filename": "kvacm-amythest-kingdom.jpg",
    "title": "Amythest Kingdom",
    "author": "Kvacm",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 148,
    "filename": "kvacm-early-evening.jpg",
    "title": "Early Evening",
    "author": "Kvacm",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 149,
    "filename": "kvacm-falling-sun.png",
    "title": "Falling Sun",
    "author": "Kvacm",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 150,
    "filename": "kvacm-magenta-bay.png",
    "title": "Magenta Bay",
    "author": "Kvacm",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 151,
    "filename": "kvacm-misty-mountains.jpg",
    "title": "Misty Mountains",
    "author": "Kvacm",
    "tags": [
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 152,
    "filename": "kvacm-night-patrol.jpg",
    "title": "Night Patrol",
    "author": "Kvacm",
    "tags": [
      "night"
    ],
    "format": "jpg"
  },
  {
    "id": 153,
    "filename": "kvacm-pinky-purple.jpg",
    "title": "Pinky Purple",
    "author": "Kvacm",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 154,
    "filename": "kvacm-sunlight.png",
    "title": "Sunlight",
    "author": "Kvacm",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 155,
    "filename": "kvacm-synth-waterfall.png",
    "title": "Synth Waterfall",
    "author": "Kvacm",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 156,
    "filename": "kvacm-synthwave-view.jpg",
    "title": "Synthwave View",
    "author": "Kvacm",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 157,
    "filename": "kvacm-torii-city.jpg",
    "title": "Torii City",
    "author": "Kvacm",
    "tags": [
      "city"
    ],
    "format": "jpg"
  },
  {
    "id": 158,
    "filename": "lee_zudarts-study.jpg",
    "title": "Zudarts Study",
    "author": "Lee",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 159,
    "filename": "lofi-coffee.jpg",
    "title": "Coffee",
    "author": "Lofi",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 160,
    "filename": "louis-coyle-inspired-lakeside.png",
    "title": "Coyle Inspired Lakeside",
    "author": "Louis",
    "tags": [
      "lake"
    ],
    "format": "png"
  },
  {
    "id": 161,
    "filename": "louis-coyle-sunrise.jpg",
    "title": "Coyle Sunrise",
    "author": "Louis",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 162,
    "filename": "mark-kirkpatrick-mk-landscape-05.jpg",
    "title": "Kirkpatrick Mk Landscape 05",
    "author": "Mark",
    "tags": [
      "landscape"
    ],
    "format": "jpg"
  },
  {
    "id": 163,
    "filename": "masterteacher-red-sky-background.jpg",
    "title": "Red Sky Background",
    "author": "Masterteacher",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 164,
    "filename": "matt-carlson-spring-mountain.png",
    "title": "Carlson Spring Mountain",
    "author": "Matt",
    "tags": [
      "mountain"
    ],
    "format": "png"
  },
  {
    "id": 165,
    "filename": "michal-lisowski-entergalactic.png",
    "title": "Lisowski Entergalactic",
    "author": "Michal",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 166,
    "filename": "mitchrandom-alpine-sunset.png",
    "title": "Alpine Sunset",
    "author": "Mitchrandom",
    "tags": [
      "sunset"
    ],
    "format": "png"
  },
  {
    "id": 167,
    "filename": "mklgustafsson-among-trees-deer.jpg",
    "title": "Among Trees Deer",
    "author": "Mklgustafsson",
    "tags": [
      "deer"
    ],
    "format": "jpg"
  },
  {
    "id": 168,
    "filename": "mklgustafsson-among-trees-forest.png",
    "title": "Among Trees Forest",
    "author": "Mklgustafsson",
    "tags": [
      "forest"
    ],
    "format": "png"
  },
  {
    "id": 169,
    "filename": "mklgustafsson-among-trees-fox.jpg",
    "title": "Among Trees Fox",
    "author": "Mklgustafsson",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 170,
    "filename": "mklgustafsson-among-trees-river-side.jpg",
    "title": "Among Trees River Side",
    "author": "Mklgustafsson",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 171,
    "filename": "mklgustafsson-small-memory.png",
    "title": "Small Memory",
    "author": "Mklgustafsson",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 172,
    "filename": "mklgustafsson-the-girl-and-the-bear.png",
    "title": "The Girl And The Bear",
    "author": "Mklgustafsson",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 173,
    "filename": "moewanders-summers-end.jpg",
    "title": "Summers End",
    "author": "Moewanders",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 174,
    "filename": "moewanders-the-frontier.jpg",
    "title": "The Frontier",
    "author": "Moewanders",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 175,
    "filename": "mofghfgfgh-moon-mountain.png",
    "title": "Moon Mountain",
    "author": "Mofghfgfgh",
    "tags": [
      "mountain",
      "moon"
    ],
    "format": "png"
  },
  {
    "id": 176,
    "filename": "mofghfgfgh-ocean-sunset.png",
    "title": "Ocean Sunset",
    "author": "Mofghfgfgh",
    "tags": [
      "sunset"
    ],
    "format": "png"
  },
  {
    "id": 177,
    "filename": "mrwhoseboss-dalle2-edit-alone-but-awesome.jpg",
    "title": "Dalle2 Edit Alone But Awesome",
    "author": "Mrwhoseboss",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 178,
    "filename": "muhammad-nafay-deer-and-the-fireflies.jpg",
    "title": "Nafay Deer And The Fireflies",
    "author": "Muhammad",
    "tags": [
      "deer"
    ],
    "format": "jpg"
  },
  {
    "id": 179,
    "filename": "muhammad-nafay-the-new-light.jpg",
    "title": "Nafay The New Light",
    "author": "Muhammad",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 180,
    "filename": "muhammad_nafay-couple-cityscape.png",
    "title": "Nafay Couple Cityscape",
    "author": "Muhammad",
    "tags": [
      "city"
    ],
    "format": "png"
  },
  {
    "id": 181,
    "filename": "muriLLu-Anime-Scenery-Sunset.jpg",
    "title": "Anime Scenery Sunset",
    "author": "MuriLLu",
    "tags": [
      "sunset",
      "anime"
    ],
    "format": "jpg"
  },
  {
    "id": 182,
    "filename": "muriLLu-Japan-Neo-Wallpaper.png",
    "title": "Japan Neo Wallpaper",
    "author": "MuriLLu",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 183,
    "filename": "ncoll36-forest-mountain.jpg",
    "title": "Forest Mountain",
    "author": "Ncoll36",
    "tags": [
      "mountain",
      "forest"
    ],
    "format": "jpg"
  },
  {
    "id": 184,
    "filename": "neonoverdrive-pastel_sunset_by.png",
    "title": "Pastel Sunset By",
    "author": "Neonoverdrive",
    "tags": [
      "sunset"
    ],
    "format": "png"
  },
  {
    "id": 185,
    "filename": "neonoverdrive-vaporwave-off-kanagawa.jpg",
    "title": "Vaporwave Off Kanagawa",
    "author": "Neonoverdrive",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 186,
    "filename": "neonoverdrive-vast-neon-cityscape.jpg",
    "title": "Vast Neon Cityscape",
    "author": "Neonoverdrive",
    "tags": [
      "city"
    ],
    "format": "jpg"
  },
  {
    "id": 187,
    "filename": "normieboy96-cherry-blossom.jpg",
    "title": "Cherry Blossom",
    "author": "Normieboy96",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 188,
    "filename": "ogarart-bitter-coast.jpg",
    "title": "Bitter Coast",
    "author": "Ogarart",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 189,
    "filename": "ogarart-blue-lighthouse-2019-01-13.jpg",
    "title": "Blue Lighthouse 2019 01 13",
    "author": "Ogarart",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 190,
    "filename": "ogarart-bridge.jpg",
    "title": "Bridge",
    "author": "Ogarart",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 191,
    "filename": "ogarart-cactus-2019-01-20.jpg",
    "title": "Cactus 2019 01 20",
    "author": "Ogarart",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 192,
    "filename": "OGARart-eagle-mountain-sunset-minimalist.jpg",
    "title": "Eagle Mountain Sunset Minimalist",
    "author": "OGARart",
    "tags": [
      "mountain",
      "sunset",
      "minimal"
    ],
    "format": "jpg"
  },
  {
    "id": 193,
    "filename": "ogarart-forest-mountains-2019-01-17.jpg",
    "title": "Forest Mountains 2019 01 17",
    "author": "Ogarart",
    "tags": [
      "mountain",
      "forest"
    ],
    "format": "jpg"
  },
  {
    "id": 194,
    "filename": "ogarart-forest-sunset-2019-01-25.png",
    "title": "Forest Sunset 2019 01 25",
    "author": "Ogarart",
    "tags": [
      "sunset",
      "forest"
    ],
    "format": "png"
  },
  {
    "id": 195,
    "filename": "ogarart-forest-trees.jpg",
    "title": "Forest Trees",
    "author": "Ogarart",
    "tags": [
      "forest"
    ],
    "format": "jpg"
  },
  {
    "id": 196,
    "filename": "ogarart-fortress.jpg",
    "title": "Fortress",
    "author": "Ogarart",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 197,
    "filename": "ogarart-frozen.jpg",
    "title": "Frozen",
    "author": "Ogarart",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 198,
    "filename": "ogarart-lone-wanderer.jpg",
    "title": "Lone Wanderer",
    "author": "Ogarart",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 199,
    "filename": "ogarart-mountains-ice.jpg",
    "title": "Mountains Ice",
    "author": "Ogarart",
    "tags": [
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 200,
    "filename": "ogarart-orange-sky-red-rocks-2019-03-04.jpg",
    "title": "Orange Sky Red Rocks 2019 03 04",
    "author": "Ogarart",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 201,
    "filename": "ogarart-purple-mountains-2019-01-29.jpg",
    "title": "Purple Mountains 2019 01 29",
    "author": "Ogarart",
    "tags": [
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 202,
    "filename": "ogarart-purple-trees-2019-02-11.jpg",
    "title": "Purple Trees 2019 02 11",
    "author": "Ogarart",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 203,
    "filename": "ogarart-purple-trees-and-deer-2019-01-15.jpg",
    "title": "Purple Trees And Deer 2019 01 15",
    "author": "Ogarart",
    "tags": [
      "deer"
    ],
    "format": "jpg"
  },
  {
    "id": 204,
    "filename": "ogarart-purple-trees-under-stars-2019-01-27.jpg",
    "title": "Purple Trees Under Stars 2019 01 27",
    "author": "Ogarart",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 205,
    "filename": "ogarart-red-cave.jpg",
    "title": "Red Cave",
    "author": "Ogarart",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 206,
    "filename": "ogarart-red-mountains-lake-2019-10-06.jpg",
    "title": "Red Mountains Lake 2019 10 06",
    "author": "Ogarart",
    "tags": [
      "mountain",
      "lake"
    ],
    "format": "jpg"
  },
  {
    "id": 207,
    "filename": "ogarart-red-mountains.jpg",
    "title": "Red Mountains",
    "author": "Ogarart",
    "tags": [
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 208,
    "filename": "ogarart-savannah.jpg",
    "title": "Savannah",
    "author": "Ogarart",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 209,
    "filename": "ogarart-sunset-2.jpg",
    "title": "Sunset 2",
    "author": "Ogarart",
    "tags": [
      "sunset"
    ],
    "format": "jpg"
  },
  {
    "id": 210,
    "filename": "ogarart-wolf-and-blue-trees-2019-01-22.jpg",
    "title": "Wolf And Blue Trees 2019 01 22",
    "author": "Ogarart",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 211,
    "filename": "olly-moss-boris001-firewatch.jpg",
    "title": "Moss Boris001 Firewatch",
    "author": "Olly",
    "tags": [
      "firewatch"
    ],
    "format": "jpg"
  },
  {
    "id": 212,
    "filename": "olly-moss-dadaws-firewatch-bright-moon.jpg",
    "title": "Moss Dadaws Firewatch Bright Moon",
    "author": "Olly",
    "tags": [
      "moon",
      "firewatch"
    ],
    "format": "jpg"
  },
  {
    "id": 213,
    "filename": "olly-moss-dadaws-firewatch-cliff.jpg",
    "title": "Moss Dadaws Firewatch Cliff",
    "author": "Olly",
    "tags": [
      "firewatch"
    ],
    "format": "jpg"
  },
  {
    "id": 214,
    "filename": "olly-moss-firewatch-blue-forest.png",
    "title": "Moss Firewatch Blue Forest",
    "author": "Olly",
    "tags": [
      "forest",
      "firewatch"
    ],
    "format": "png"
  },
  {
    "id": 215,
    "filename": "olly-moss-firewatch-green.png",
    "title": "Moss Firewatch Green",
    "author": "Olly",
    "tags": [
      "firewatch"
    ],
    "format": "png"
  },
  {
    "id": 216,
    "filename": "olly-moss-firewatch-night.jpg",
    "title": "Moss Firewatch Night",
    "author": "Olly",
    "tags": [
      "night",
      "firewatch"
    ],
    "format": "jpg"
  },
  {
    "id": 217,
    "filename": "olly-moss-firewatch-purple.jpg",
    "title": "Moss Firewatch Purple",
    "author": "Olly",
    "tags": [
      "firewatch"
    ],
    "format": "jpg"
  },
  {
    "id": 218,
    "filename": "olly-moss-firewatch-red.jpg",
    "title": "Moss Firewatch Red",
    "author": "Olly",
    "tags": [
      "firewatch"
    ],
    "format": "jpg"
  },
  {
    "id": 219,
    "filename": "olly-moss-firewatch-river.png",
    "title": "Moss Firewatch River",
    "author": "Olly",
    "tags": [
      "firewatch"
    ],
    "format": "png"
  },
  {
    "id": 220,
    "filename": "olly-moss-firewatch-stag.jpg",
    "title": "Moss Firewatch Stag",
    "author": "Olly",
    "tags": [
      "firewatch"
    ],
    "format": "jpg"
  },
  {
    "id": 221,
    "filename": "olly-moss-firewatch-yellow.jpg",
    "title": "Moss Firewatch Yellow",
    "author": "Olly",
    "tags": [
      "firewatch"
    ],
    "format": "jpg"
  },
  {
    "id": 222,
    "filename": "olly-moss-sunset-mountains-firewatch.jpg",
    "title": "Moss Sunset Mountains Firewatch",
    "author": "Olly",
    "tags": [
      "mountain",
      "sunset",
      "firewatch"
    ],
    "format": "jpg"
  },
  {
    "id": 223,
    "filename": "P82En-cherry-blossom-mountain-range.jpg",
    "title": "Cherry Blossom Mountain Range",
    "author": "P82En",
    "tags": [
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 224,
    "filename": "paralloid-reaching-the-stars-over-mountain.jpg",
    "title": "Reaching The Stars Over Mountain",
    "author": "Paralloid",
    "tags": [
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 225,
    "filename": "partenoxenese-blue-faro.jpg",
    "title": "Blue Faro",
    "author": "Partenoxenese",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 226,
    "filename": "phantomghostx-mountains.jpg",
    "title": "Mountains",
    "author": "Phantomghostx",
    "tags": [
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 227,
    "filename": "quentinmarsollier-unexplored.png",
    "title": "Unexplored",
    "author": "Quentinmarsollier",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 228,
    "filename": "raven2cz-sunset-river-among-trees.png",
    "title": "Sunset River Among Trees",
    "author": "Raven2cz",
    "tags": [
      "sunset"
    ],
    "format": "png"
  },
  {
    "id": 229,
    "filename": "redditislikefb-astral-summit.png",
    "title": "Astral Summit",
    "author": "Redditislikefb",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 230,
    "filename": "refiend-carmine-rock.jpg",
    "title": "Carmine Rock",
    "author": "Refiend",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 231,
    "filename": "rhads-survivors.png",
    "title": "Survivors",
    "author": "Rhads",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 232,
    "filename": "richarddorran-city-of-life.jpg",
    "title": "City Of Life",
    "author": "Richarddorran",
    "tags": [
      "city"
    ],
    "format": "jpg"
  },
  {
    "id": 233,
    "filename": "ricodz-lost.jpg",
    "title": "Lost",
    "author": "Ricodz",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 234,
    "filename": "rmradev-alien-moon.jpg",
    "title": "Alien Moon",
    "author": "Rmradev",
    "tags": [
      "moon"
    ],
    "format": "jpg"
  },
  {
    "id": 235,
    "filename": "rmradev-colorful-landscape.png",
    "title": "Colorful Landscape",
    "author": "Rmradev",
    "tags": [
      "landscape"
    ],
    "format": "png"
  },
  {
    "id": 236,
    "filename": "rmradev-colorful-mountains.jpg",
    "title": "Colorful Mountains",
    "author": "Rmradev",
    "tags": [
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 237,
    "filename": "rmradev-evening-forest.png",
    "title": "Evening Forest",
    "author": "Rmradev",
    "tags": [
      "forest"
    ],
    "format": "png"
  },
  {
    "id": 238,
    "filename": "rmradev-moon-sunset-landscape.png",
    "title": "Moon Sunset Landscape",
    "author": "Rmradev",
    "tags": [
      "landscape",
      "sunset",
      "moon"
    ],
    "format": "png"
  },
  {
    "id": 239,
    "filename": "rmradev-mountain-retreat.jpg",
    "title": "Mountain Retreat",
    "author": "Rmradev",
    "tags": [
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 240,
    "filename": "rmradev-mountains.jpg",
    "title": "Mountains",
    "author": "Rmradev",
    "tags": [
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 241,
    "filename": "rmradev-peaceful-lake.png",
    "title": "Peaceful Lake",
    "author": "Rmradev",
    "tags": [
      "lake"
    ],
    "format": "png"
  },
  {
    "id": 242,
    "filename": "rmradev-sunset-landscape.jpg",
    "title": "Sunset Landscape",
    "author": "Rmradev",
    "tags": [
      "landscape",
      "sunset"
    ],
    "format": "jpg"
  },
  {
    "id": 243,
    "filename": "rmradev-tranquility.png",
    "title": "Tranquility",
    "author": "Rmradev",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 244,
    "filename": "rmradev-vampire-castle.jpg",
    "title": "Vampire Castle",
    "author": "Rmradev",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 245,
    "filename": "roboturtle_-purple-sky.jpg",
    "title": "Purple Sky",
    "author": "Roboturtle",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 246,
    "filename": "romain-trystram-Neon-Alleyway.jpg",
    "title": "Trystram Neon Alleyway",
    "author": "Romain",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 247,
    "filename": "romen-deva-awakening.jpg",
    "title": "Deva Awakening",
    "author": "Romen",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 248,
    "filename": "rook-rip-mt-fuji.png",
    "title": "Rip Mt Fuji",
    "author": "Rook",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 249,
    "filename": "ryky-sky-wave.png",
    "title": "Sky Wave",
    "author": "Ryky",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 250,
    "filename": "ryky-the-rest.png",
    "title": "The Rest",
    "author": "Ryky",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 251,
    "filename": "sabbathbl00dysabbath-desert-synthwave-ai-landscape.png",
    "title": "Desert Synthwave Ai Landscape",
    "author": "Sabbathbl00dysabbath",
    "tags": [
      "landscape",
      "desert"
    ],
    "format": "png"
  },
  {
    "id": 252,
    "filename": "saisho-moonlit-night-wedding.jpg",
    "title": "Moonlit Night Wedding",
    "author": "Saisho",
    "tags": [
      "moon",
      "night"
    ],
    "format": "jpg"
  },
  {
    "id": 253,
    "filename": "salman-illustrator-japanese-landscape.png",
    "title": "Illustrator Japanese Landscape",
    "author": "Salman",
    "tags": [
      "landscape"
    ],
    "format": "png"
  },
  {
    "id": 254,
    "filename": "samantha-lee-purple-deer.png",
    "title": "Lee Purple Deer",
    "author": "Samantha",
    "tags": [
      "deer"
    ],
    "format": "png"
  },
  {
    "id": 255,
    "filename": "sandace11-dusk.jpg",
    "title": "Dusk",
    "author": "Sandace11",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 256,
    "filename": "significancefit6753-samurai-evening-jonah-edit.jpg",
    "title": "Samurai Evening Jonah Edit",
    "author": "Significancefit6753",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 257,
    "filename": "skavrx-mountain.png",
    "title": "Mountain",
    "author": "Skavrx",
    "tags": [
      "mountain"
    ],
    "format": "png"
  },
  {
    "id": 258,
    "filename": "stable-diffusion-wavymulder-cyberpunk-sunset.png",
    "title": "Diffusion Wavymulder Cyberpunk Sunset",
    "author": "Stable",
    "tags": [
      "sunset",
      "cyberpunk"
    ],
    "format": "png"
  },
  {
    "id": 259,
    "filename": "strigonian-far-north.png",
    "title": "Far North",
    "author": "Strigonian",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 260,
    "filename": "surendra-rajawat-butterflies.png",
    "title": "Rajawat Butterflies",
    "author": "Surendra",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 261,
    "filename": "surendra-rajawat-island-in-the-sky.jpg",
    "title": "Rajawat Island In The Sky",
    "author": "Surendra",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 262,
    "filename": "surendra-rajawat-natures-beauty.png",
    "title": "Rajawat Natures Beauty",
    "author": "Surendra",
    "tags": [
      "nature"
    ],
    "format": "png"
  },
  {
    "id": 263,
    "filename": "surendra-rajawat-the-magic-unfolds.png",
    "title": "Rajawat The Magic Unfolds",
    "author": "Surendra",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 264,
    "filename": "tacosauceninja-blossoms.jpg",
    "title": "Blossoms",
    "author": "Tacosauceninja",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 265,
    "filename": "tacosauceninja-i-cant-stop-what-you-began.png",
    "title": "I Cant Stop What You Began",
    "author": "Tacosauceninja",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 266,
    "filename": "tacosauceninja-remembering.jpg",
    "title": "Remembering",
    "author": "Tacosauceninja",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 267,
    "filename": "tacosauceninja-rooftop.jpg",
    "title": "Rooftop",
    "author": "Tacosauceninja",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 268,
    "filename": "tacosauceninja-shadows-die-twice.png",
    "title": "Shadows Die Twice",
    "author": "Tacosauceninja",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 269,
    "filename": "tanvdesign-fantasy-landscape.png",
    "title": "Fantasy Landscape",
    "author": "Tanvdesign",
    "tags": [
      "landscape"
    ],
    "format": "png"
  },
  {
    "id": 270,
    "filename": "tanvdesign-wolf.jpg",
    "title": "Wolf",
    "author": "Tanvdesign",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 271,
    "filename": "the-gate-to-serenity-danisogen.png",
    "title": "Gate To Serenity Danisogen",
    "author": "The",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 272,
    "filename": "thedigitalrob-separated-by-fate.jpg",
    "title": "Separated By Fate",
    "author": "Thedigitalrob",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 273,
    "filename": "thomasshifflett31-beautiful-city-sunset.jpg",
    "title": "Beautiful City Sunset",
    "author": "Thomasshifflett31",
    "tags": [
      "sunset",
      "city"
    ],
    "format": "jpg"
  },
  {
    "id": 274,
    "filename": "tienphat-night-landscape.jpg",
    "title": "Night Landscape",
    "author": "Tienphat",
    "tags": [
      "landscape",
      "night"
    ],
    "format": "jpg"
  },
  {
    "id": 275,
    "filename": "tongxinfen-extraterrestrial.jpg",
    "title": "Extraterrestrial",
    "author": "Tongxinfen",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 276,
    "filename": "totalcoconut-midjourney-landscape-wallpaper.jpg",
    "title": "Midjourney Landscape Wallpaper",
    "author": "Totalcoconut",
    "tags": [
      "landscape"
    ],
    "format": "jpg"
  },
  {
    "id": 277,
    "filename": "tyler-smith-blue-lagoon-port.jpg",
    "title": "Smith Blue Lagoon Port",
    "author": "Tyler",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 278,
    "filename": "tyler-smith-redwoods-wolf.jpg",
    "title": "Smith Redwoods Wolf",
    "author": "Tyler",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 279,
    "filename": "uagami-cherry-blossoms.jpg",
    "title": "Cherry Blossoms",
    "author": "Uagami",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 280,
    "filename": "unknown-anime-sunset.jpg",
    "title": "Anime Sunset",
    "author": "Unknown",
    "tags": [
      "sunset",
      "anime"
    ],
    "format": "jpg"
  },
  {
    "id": 281,
    "filename": "unknown-bird-landing-on-water.jpg",
    "title": "Bird Landing On Water",
    "author": "Unknown",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 282,
    "filename": "unknown-blue-moon-planets-over-lake-trees.jpg",
    "title": "Blue Moon Planets Over Lake Trees",
    "author": "Unknown",
    "tags": [
      "moon",
      "lake"
    ],
    "format": "jpg"
  },
  {
    "id": 283,
    "filename": "unknown-couple-on-red-mountains.jpg",
    "title": "Couple On Red Mountains",
    "author": "Unknown",
    "tags": [
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 284,
    "filename": "unknown-cyberpunk-city.jpg",
    "title": "Cyberpunk City",
    "author": "Unknown",
    "tags": [
      "cyberpunk",
      "city"
    ],
    "format": "jpg"
  },
  {
    "id": 285,
    "filename": "unknown-dark-mojave-desert.jpg",
    "title": "Dark Mojave Desert",
    "author": "Unknown",
    "tags": [
      "desert"
    ],
    "format": "jpg"
  },
  {
    "id": 286,
    "filename": "unknown-deer-in-the-light.jpg",
    "title": "Deer In The Light",
    "author": "Unknown",
    "tags": [
      "deer"
    ],
    "format": "jpg"
  },
  {
    "id": 287,
    "filename": "unknown-downtown-minneapolis.jpg",
    "title": "Downtown Minneapolis",
    "author": "Unknown",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 288,
    "filename": "unknown-elephants-green-mountain.jpg",
    "title": "Elephants Green Mountain",
    "author": "Unknown",
    "tags": [
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 289,
    "filename": "unknown-green-mountains-and-hills.jpg",
    "title": "Green Mountains And Hills",
    "author": "Unknown",
    "tags": [
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 290,
    "filename": "unknown-ice-mountain-trees.png",
    "title": "Ice Mountain Trees",
    "author": "Unknown",
    "tags": [
      "mountain"
    ],
    "format": "png"
  },
  {
    "id": 291,
    "filename": "unknown-minimalist-desert-landscape.jpg",
    "title": "Minimalist Desert Landscape",
    "author": "Unknown",
    "tags": [
      "landscape",
      "desert",
      "minimal"
    ],
    "format": "jpg"
  },
  {
    "id": 292,
    "filename": "unknown-mountain-birds.png",
    "title": "Mountain Birds",
    "author": "Unknown",
    "tags": [
      "mountain"
    ],
    "format": "png"
  },
  {
    "id": 293,
    "filename": "unknown-multicolor-rocket-launch.jpg",
    "title": "Multicolor Rocket Launch",
    "author": "Unknown",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 294,
    "filename": "unknown-orange-sunset-over-blue-hills.jpg",
    "title": "Orange Sunset Over Blue Hills",
    "author": "Unknown",
    "tags": [
      "sunset"
    ],
    "format": "jpg"
  },
  {
    "id": 295,
    "filename": "unknown-pink-mountains.png",
    "title": "Pink Mountains",
    "author": "Unknown",
    "tags": [
      "mountain"
    ],
    "format": "png"
  },
  {
    "id": 296,
    "filename": "unknown-pink-rocky-cliffs-and-water.jpg",
    "title": "Pink Rocky Cliffs And Water",
    "author": "Unknown",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 297,
    "filename": "unknown-pink-sunset-mountain-trees.png",
    "title": "Pink Sunset Mountain Trees",
    "author": "Unknown",
    "tags": [
      "mountain",
      "sunset"
    ],
    "format": "png"
  },
  {
    "id": 298,
    "filename": "unknown-purple-lake.jpg",
    "title": "Purple Lake",
    "author": "Unknown",
    "tags": [
      "lake"
    ],
    "format": "jpg"
  },
  {
    "id": 299,
    "filename": "unknown-purple-mountain-landscape-with-ship.jpg",
    "title": "Purple Mountain Landscape With Ship",
    "author": "Unknown",
    "tags": [
      "landscape",
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 300,
    "filename": "unknown-samurai-forest.jpg",
    "title": "Samurai Forest",
    "author": "Unknown",
    "tags": [
      "forest"
    ],
    "format": "jpg"
  },
  {
    "id": 301,
    "filename": "unknown-snowy-landscape.jpg",
    "title": "Snowy Landscape",
    "author": "Unknown",
    "tags": [
      "landscape"
    ],
    "format": "jpg"
  },
  {
    "id": 302,
    "filename": "unknown-sunset-behind-island-palm-trees.jpg",
    "title": "Sunset Behind Island Palm Trees",
    "author": "Unknown",
    "tags": [
      "sunset"
    ],
    "format": "jpg"
  },
  {
    "id": 303,
    "filename": "unknown-sunset-fishing.jpg",
    "title": "Sunset Fishing",
    "author": "Unknown",
    "tags": [
      "sunset"
    ],
    "format": "jpg"
  },
  {
    "id": 304,
    "filename": "unknown-whale-tail-at-sunset.jpg",
    "title": "Whale Tail At Sunset",
    "author": "Unknown",
    "tags": [
      "sunset"
    ],
    "format": "jpg"
  },
  {
    "id": 305,
    "filename": "unkown-purple-mountains.png",
    "title": "Purple Mountains",
    "author": "Unkown",
    "tags": [
      "mountain"
    ],
    "format": "png"
  },
  {
    "id": 306,
    "filename": "unreal-midjourney-a-stunning-sunset.jpg",
    "title": "Midjourney A Stunning Sunset",
    "author": "Unreal",
    "tags": [
      "sunset"
    ],
    "format": "jpg"
  },
  {
    "id": 307,
    "filename": "vorgbardo-ancient-oriental-temple.jpg",
    "title": "Ancient Oriental Temple",
    "author": "Vorgbardo",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 308,
    "filename": "VorgBardo-midjourney-1960s-sci-fi-planet.jpg",
    "title": "Midjourney 1960s Sci Fi Planet",
    "author": "VorgBardo",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 309,
    "filename": "voyager-bequem-almost-spring-prev-2.jpg",
    "title": "Bequem Almost Spring Prev 2",
    "author": "Voyager",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 310,
    "filename": "voyager-board-man-moonlit-nights-f.jpg",
    "title": "Board Man Moonlit Nights F",
    "author": "Voyager",
    "tags": [
      "moon",
      "night"
    ],
    "format": "jpg"
  },
  {
    "id": 311,
    "filename": "voyager-camino-de-kazul-arte.jpg",
    "title": "Camino De Kazul Arte",
    "author": "Voyager",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 312,
    "filename": "voyager-cloud-break-day-drifting.png",
    "title": "Cloud Break Day Drifting",
    "author": "Voyager",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 313,
    "filename": "voyager-coldbrew-backyard-gardens.jpg",
    "title": "Coldbrew Backyard Gardens",
    "author": "Voyager",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 314,
    "filename": "voyager-cosmonkey-leaves.jpg",
    "title": "Cosmonkey Leaves",
    "author": "Voyager",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 315,
    "filename": "voyager-lofi-exposure.jpg",
    "title": "Lofi Exposure",
    "author": "Voyager",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 316,
    "filename": "voyager-nogymx-marauders.jpg",
    "title": "Nogymx Marauders",
    "author": "Voyager",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 317,
    "filename": "voyager-otaam-tonion-lush-space.jpg",
    "title": "Otaam Tonion Lush Space",
    "author": "Voyager",
    "tags": [
      "space"
    ],
    "format": "jpg"
  },
  {
    "id": 318,
    "filename": "voyager-quilla-teaser-traders.jpg",
    "title": "Quilla Teaser Traders",
    "author": "Voyager",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 319,
    "filename": "voyager-sai-t-inownlove-overseas.jpg",
    "title": "Sai T Inownlove Overseas",
    "author": "Voyager",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 320,
    "filename": "voyager-samurai-bebop-acoolrocket-edit.png",
    "title": "Samurai Bebop Acoolrocket Edit",
    "author": "Voyager",
    "tags": [
      "minimalist"
    ],
    "format": "png"
  },
  {
    "id": 321,
    "filename": "voyager-simber-tibeauthetraveler-eternal-sunshine.jpg",
    "title": "Simber Tibeauthetraveler Eternal Sunshine",
    "author": "Voyager",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 322,
    "filename": "wallpapersden-purple-artistic-landscape.png",
    "title": "Purple Artistic Landscape",
    "author": "Wallpapersden",
    "tags": [
      "landscape"
    ],
    "format": "png"
  },
  {
    "id": 323,
    "filename": "wallpapersden.com_cool-red-mountains-4k.jpg",
    "title": "Cool Red Mountains 4k",
    "author": "Wallpapersden.Com",
    "tags": [
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 324,
    "filename": "wallpapersden.com_landscape-moon-digital-evening.jpg",
    "title": "Landscape Moon Digital Evening",
    "author": "Wallpapersden.Com",
    "tags": [
      "landscape",
      "moon"
    ],
    "format": "jpg"
  },
  {
    "id": 325,
    "filename": "wallpapersden.com_minimal-reflection-sunset.jpg",
    "title": "Minimal Reflection Sunset",
    "author": "Wallpapersden.Com",
    "tags": [
      "sunset",
      "minimal"
    ],
    "format": "jpg"
  },
  {
    "id": 326,
    "filename": "wallpapersden.com_nature-sunset-simple-minimal-illustration.jpg",
    "title": "Nature Sunset Simple Minimal Illustration",
    "author": "Wallpapersden.Com",
    "tags": [
      "nature",
      "sunset",
      "minimal"
    ],
    "format": "jpg"
  },
  {
    "id": 327,
    "filename": "wallpapersden.com_pyramid-minimal-landscape.jpg",
    "title": "Pyramid Minimal Landscape",
    "author": "Wallpapersden.Com",
    "tags": [
      "landscape",
      "minimal"
    ],
    "format": "jpg"
  },
  {
    "id": 328,
    "filename": "wheazzy-birds-mountain.jpg",
    "title": "Birds Mountain",
    "author": "Wheazzy",
    "tags": [
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 329,
    "filename": "wheazzy-blue-mountains.jpg",
    "title": "Blue Mountains",
    "author": "Wheazzy",
    "tags": [
      "mountain"
    ],
    "format": "jpg"
  },
  {
    "id": 330,
    "filename": "wp5102649-neon-retro-city-ps4-wallpapers.png",
    "title": "Neon Retro City Ps4 Wallpapers",
    "author": "Wp5102649",
    "tags": [
      "city",
      "retro"
    ],
    "format": "png"
  },
  {
    "id": 331,
    "filename": "wp5998347-retro-4k-wallpapers.jpg",
    "title": "Retro 4k Wallpapers",
    "author": "Wp5998347",
    "tags": [
      "retro"
    ],
    "format": "jpg"
  },
  {
    "id": 332,
    "filename": "wp6504516-monument-valley-sunset-ultra-hd-wallpapers.jpg",
    "title": "Monument Valley Sunset Ultra Hd Wallpapers",
    "author": "Wp6504516",
    "tags": [
      "sunset"
    ],
    "format": "jpg"
  },
  {
    "id": 333,
    "filename": "yefedlger-eolyn.jpg",
    "title": "Eolyn",
    "author": "Yefedlger",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 334,
    "filename": "zakoriart-commission-piece-for-game.jpg",
    "title": "Commission Piece For Game",
    "author": "Zakoriart",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 335,
    "filename": "zakoriart-flow.jpg",
    "title": "Flow",
    "author": "Zakoriart",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 336,
    "filename": "zakoriart-if-silence-could-be-heard.jpg",
    "title": "If Silence Could Be Heard",
    "author": "Zakoriart",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  },
  {
    "id": 337,
    "filename": "zeoluwang-journey.jpg",
    "title": "Journey",
    "author": "Zeoluwang",
    "tags": [
      "minimalist"
    ],
    "format": "jpg"
  }
];

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        return res.end();
    }

    const host = req.headers.host || 'localhost';
    const parsedUrl = new URL(req.url, 'http://' + host);
    const tag = (parsedUrl.searchParams.get('tag') || '').toLowerCase();
    const query = (parsedUrl.searchParams.get('q') || parsedUrl.searchParams.get('query') || '').toLowerCase();
    const asJson = parsedUrl.searchParams.get('json') === 'true' || req.headers.accept?.includes('application/json');

    const repo = process.env.GITHUB_REPO || 'SumanCH8514/Wallpaper-Collection-Project';
    const branch = process.env.GITHUB_BRANCH || 'main';
    const rawBaseUrl = 'https://raw.githubusercontent.com/' + repo + '/' + branch + '/images/';

    let pool = wallpapers;
    if (tag) {
        pool = pool.filter(w => w.tags && w.tags.includes(tag));
    }
    if (query) {
        pool = pool.filter(w => 
            (w.title && w.title.toLowerCase().includes(query)) || 
            (w.author && w.author.toLowerCase().includes(query)) ||
            (w.filename && w.filename.toLowerCase().includes(query))
        );
    }

    if (pool.length === 0) {
        pool = wallpapers;
    }

    const item = pool[Math.floor(Math.random() * pool.length)];
    const fullImageUrl = rawBaseUrl + encodeURIComponent(item.filename);
    const thumbnailUrl = 'https://wsrv.nl/?url=' + encodeURIComponent(fullImageUrl) + '&w=640&h=360&fit=cover&output=webp';

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

    res.writeHead(302, {
        'Location': fullImageUrl,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    });
    res.end();
};
