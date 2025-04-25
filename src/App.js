import { useState } from "react";
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
import { useMovie } from "./hooks/useMovie";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [watched, setWatched] = useLocalStorage([], "watched");

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovie(query);

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
    setWatched((prevMovie) => prevMovie.filter((movie) => movie.imdbID !== id));
  }

  useLocalStorage(watched);

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
              <WatchedMovieList
                watched={watched}
                onDeleteFromWatch={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </main>
    </>
  );
}
