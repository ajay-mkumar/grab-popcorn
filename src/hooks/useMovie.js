import { useEffect, useState } from "react";

const APIKEY = process.env.REACT_APP_OMDB_KEY;

export function useMovie(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovieByName(query) {
        try {
          setIsLoading(true);
          setError("");
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`,
            {
              signal: controller.signal,
            }
          );

          if (!response.ok) throw new Error("Something went wrong");

          const data = await response.json();

          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setIsLoading(false);
          setError("");
        } catch (err) {
          console.error(err.message);

          if (err.name !== "AbortError") {
            setError(err.message);
          }

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

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
