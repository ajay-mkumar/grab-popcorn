import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
const APIKEY = process.env.REACT_APP_OMDB_KEY;

function MovieDetails({ id, onCloseMovie, onAddToWatch, watched }) {
  const [movie, setMovie] = useState({});
  const [userRatings, setUserRatings] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const countRef = useRef(0);
  const isWatched = watched.map((movie) => movie.imdbID).includes(id);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === id
  )?.userRatings;

  const {
    imdbID,
    Title: title,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    imdbRating,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(
    function () {
      async function fetchMovieById(id) {
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${APIKEY}&i=${id}`
        );

        if (!response.ok) throw new Error("Something went wrong");

        const data = await response.json();
        setMovie(data);
        setIsLoading(false);
      }

      fetchMovieById(id);
    },
    [id]
  );

  useEffect(
    function () {
      if (userRatings) countRef.current = countRef.current + 1;
    },
    [userRatings]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "Grab Popcorn";
      };
    },
    [title]
  );

  function handleAddMovie() {
    const newWatchedMovie = {
      imdbID,
      title,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRatings,
      countRatingDecisions: countRef.current,
    };

    onAddToWatch(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseMovie();
          console.log("CLOSING!");
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} . {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    size={24}
                    maxRating={10}
                    onSetRating={setUserRatings}
                  />
                  {userRatings > 0 && (
                    <button onClick={handleAddMovie} className="btn-add">
                      Add to watched
                    </button>
                  )}
                </>
              ) : (
                <>
                  <p>
                    You rated this movie with {watchedUserRating}{" "}
                    <span>⭐</span>{" "}
                  </p>
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
