
# 🍿 Grab Popcorn

**Grab Popcorn** is a React-based movie search and watchlist application inspired by Letterboxd. It allows users to discover movies, view details, and maintain a watch history. It uses the OMDb API for fetching movie data and features a clean, modular UI for a smooth experience.

## 📸 Preview

![image](https://github.com/user-attachments/assets/8b952c3f-767c-4755-b3f7-e042f277b04e)


## 🚀 Features

- 🔍 **Search Movies**: Find movies by title in real time.
- 📄 **Detailed Movie View**: Access details like poster, release year, IMDb rating, genre, and plot.
- ⭐ **Rate with Stars**: Intuitive star rating component for user reviews.
- 📋 **Watchlist**: Add movies to your watched list and track your history.
- 📊 **Summary Stats**: Visual summary of watched movies.
- ⚠️ **Error Handling & Loaders**: Graceful error handling and loading indicators.
- 🧱 **Modular Components**: Clean and reusable component architecture.

## 🗂️ Project Structure

```
grab-popcorn/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Box.jsx
│   │   ├── ErrorComponent.jsx
│   │   ├── Loader.jsx
│   │   ├── Logo.jsx
│   │   ├── Movie.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── MovieList.jsx
│   │   ├── NavBar.jsx
│   │   ├── NumResults.jsx
│   │   ├── Search.jsx
│   │   ├── StarRating.jsx
│   │   ├── WatchedMovie.jsx
│   │   ├── WatchedMovieList.jsx
│   │   └── WatchedSummary.jsx
│   ├── App.js
│   ├── index.css
│   └── index.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## 🛠️ Tech Stack

- **React** – Frontend library
- **OMDb API** – External API for movie data
- **CSS** – Styling

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js and npm

### Installation

```bash
git clone https://github.com/ajay-mkumar/grab-popcorn.git
cd grab-popcorn
npm install
npm start
```

Visit `http://localhost:3000` in your browser.

## 📌 Environment Variables

To use the OMDb API, create a `.env` file in the root directory and add:

```bash
REACT_APP_OMDB_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual OMDb API key.

## 🙌 Acknowledgements

- Movie data from [OMDb API](http://www.omdbapi.com/)
- Inspired by [Letterboxd](https://letterboxd.com/)
