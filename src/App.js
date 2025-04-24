import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import NumResults from "./components/NumResults";
import MovieList from "./components/movieList";
import Search from "./components/Search";
import Box from "./components/Box";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import Loader from "./components/Loader";
import ErrorComponent from "./components/ErrorComponent";
import MovieDetails from "./components/MovieDetails";

const API = "http://www.omdbapi.com/?apikey=df4c0274";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(
    function () {
      async function fetchMovieByName(query) {
        try {
          setIsLoading(true);
          setError("");
          const response = await fetch(`${API}&s=${query}`);

          if (!response.ok) throw new Error("Something went wrong");

          const data = await response.json();

          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setIsLoading(false);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
          setMovies([]);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovieByName(query);
    },
    [query]
  );

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWacthedMovie(newMovie) {
    setWatched((prevMovie) => [...prevMovie, newMovie]);
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((prevMovie) =>  prevMovie.filter((movie) => movie.imdbID !== id));
  }
  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <main className="main">
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorComponent message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              id={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddToWatch={handleAddWacthedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched}  onDeleteFromWatch={handleDeleteWatchedMovie} />
            </>
          )}
        </Box>
      </main>
    </>
  );
}
