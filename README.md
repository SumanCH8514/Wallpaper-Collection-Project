# 🖼️ Wallpaper Collection

> **A SumanOnline Project** — A curated gallery of clean, high-resolution minimalistic and digital nature wallpapers with a lightweight random wallpaper API.

[![Wallpapers Count](https://img.shields.io/badge/wallpapers-300%2B-blue?style=for-the-badge&logo=google-photos&logoColor=white)](images/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/SumanCH8514/Wallpaper-Collection-Project?style=for-the-badge&color=gold)](https://github.com/SumanCH8514/Wallpaper-Collection-Project/stargazers)
[![Deployment](https://img.shields.io/badge/deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://wallpapers.sumanonline.com)

---

## 📖 Overview

**Wallpaper Collection** (A SumanOnline Project) is an open-source, handpicked catalog of flat art, vector landscapes, and colorful digital nature backgrounds. Built with a responsive Edge CDN web gallery and a lightweight serverless Node.js API, it allows users to effortlessly browse, preview in full resolution, or dynamically fetch random wallpapers for automated device setups.

---

## ✨ Features

- 🎨 **Curated Aesthetic Collection**: Over 300+ handpicked minimalistic, flat-art, and landscape wallpapers.
- ⚡ **High Resolution**: High quality wallpapers optimized for 1080p, 2K, and 4K displays.
- 🌐 **Responsive Web Gallery**: Interactive lightbox preview powered by GLightbox with optimized thumbnail generation.
- 🔀 **Random Wallpaper API**: Fetch dynamic wallpapers on-demand for desktop scripts, terminal banners, or mobile automations (e.g., IFTTT, Shortcuts).
- 🚀 **Serverless Ready**: Fully configured for seamless deployment on Vercel or modern PHP runtimes.

---

## 🛠️ Tech Stack

| Component                | Technology                    | Badge                                                                                                          |
| :----------------------- | :---------------------------- | :------------------------------------------------------------------------------------------------------------- |
| **Backend & API**        | Node.js / Serverless JS       | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)       |
| **Hosting & Platform**   | Vercel (Edge CDN + Functions) | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)            |
| **Image Proxy & Cache**  | Fly.io / imgproxy             | ![Fly.io](https://img.shields.io/badge/Fly.io-24185B?style=flat-square&logo=flydotio&logoColor=white)          |
| **Frontend Lightbox**    | GLightbox                     | ![JavaScript](https://img.shields.io/badge/GLightbox-F7DF1E?style=flat-square&logo=javascript&logoColor=black) |
| **Styling & Typography** | CSS3 & Google Fonts (Poppins) | ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)                  |

---

## 📸 Screenshots & Demo

<div align="center">
  <img src="https://user-images.githubusercontent.com/20955511/186479660-475532e8-427d-4df1-a19d-7f94090805b1.png" alt="Minimalistic Wallpaper Collection Preview" width="850"/>
  <p><em>Interactive gallery view with responsive grid and instant lightbox previews</em></p>
</div>

---

## 📁 Project Structure

```plaintext
wallpaper-collection-project/
├── .github/
│   ├── scripts/             # Automation and maintenance scripts
│   └── workflows/           # CI/CD and automated validation actions
├── api/
│   ├── image_list.json      # Indexed list of 337+ wallpapers
│   └── random.js            # Serverless Node.js Random Wallpaper API endpoint
├── images/                  # Stored high-resolution wallpapers
├── index.html               # High-performance Edge CDN Gallery UI
├── package.json             # Project metadata & npm scripts
├── server.js                # Zero-dependency local development server
├── Procfile                 # Process configuration for PaaS
├── vercel.json              # Vercel routing & Edge configuration
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed locally:

- [Git](https://git-scm.com/)
- [Node.js 18+](https://nodejs.org/)
- _(Optional)_ [Vercel CLI](https://vercel.com/cli)

### Installation & Local Run

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SumanCH8514/Wallpaper-Collection-Project.git
   cd Wallpaper-Collection-Project
   ```

2. **Run locally using Node.js:**

   ```bash
   npm start
   ```

   _(or `node server.js`)_

3. Open your browser and navigate to `http://localhost:8000`.

---

## 🔌 API Documentation

The serverless API allows you to fetch wallpapers, filter by categories, and query the catalog programmatically:

### 1. Random Wallpaper API (`/api/random`)

- **Direct Image Redirect (`302 Found`):**
  ```http
  GET https://wallpapers.sumanonline.com/api/random
  ```
- **Filter by Category / Tag:**
  ```http
  GET https://wallpapers.sumanonline.com/api/random?tag=mountain
  GET https://wallpapers.sumanonline.com/api/random?tag=cyberpunk
  ```
- **Filter by Search Keyword:**
  ```http
  GET https://wallpapers.sumanonline.com/api/random?q=sunset
  ```
- **Get JSON Metadata Response:**
  ```http
  GET https://wallpapers.sumanonline.com/api/random?json=true
  ```

### 2. Wallpapers Catalog API (`/api/wallpapers`)

Query the entire collection with pagination and keyword filtering:

```http
GET https://wallpapers.sumanonline.com/api/wallpapers?q=forest&limit=10&page=1
```

### 📱 Terminal / CLI Example

```bash
# Download a fresh random wallpaper directly
curl -sL "https://wallpapers.sumanonline.com/api/random" -o wallpaper.jpg
```

---

## 🤝 Contributing

Contributions are always welcome! Whether you are suggesting a new wallpaper or improving the gallery codebase:

1. **Fork the Repository**
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/AddWallpapers
   ```
3. **Guidelines for Wallpaper Submissions**:
   - **Resolution**: Minimum `1920x1080` (1080p); `3840x2160` (4K) preferred.
   - **Naming Convention**: `[Artist/Source] - [Title/Description].[ext]`
   - **Quality**: Avoid heavily compressed or blurry images. Clean AI upscales are acceptable.
4. **Commit your changes**:
   ```bash
   git commit -m "feat: add landscape wallpapers by artist"
   ```
5. **Push to the branch**:
   ```bash
   git push origin feature/AddWallpapers
   ```
6. **Open a Pull Request**

> **Disclaimer:** Images in this repository are credited to their respective artists and online creators. If any image belongs to you and you wish to update credits or request removal, please open an issue.

---

## 📄 License

This project is distributed under the **MIT License**. Wallpapers remain copyrighted by their respective creators.

---

## 👤 Author & Contact

**SumanCH8514**

- GitHub: [@SumanCH8514](https://github.com/SumanCH8514)
- Repository: [Wallpaper-Collection-Project](https://github.com/SumanCH8514/Wallpaper-Collection-Project)

---

<div align="center">
  <sub>Made with ❤️ for minimalists and aesthetic enthusiasts. Don't forget to star ⭐ the repo if you like it!</sub>
</div>
