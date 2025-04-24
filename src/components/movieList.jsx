import Movie from "./Movie";

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {Array.isArray(movies) &&
        movies?.map((movie) => (
          <Movie
            key={movie.imdbID}
            onSelectMovie={onSelectMovie}
            movie={movie}
          />
        ))}
    </ul>
  );
}

export default MovieList;
