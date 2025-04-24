function WatchedMovie({ movie, onDeleteFromWatch }) {

  return (
    <li >
      <img src={movie.poster} alt={`${movie.Title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRatings}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
          <button className="btn-delete" onClick={() => onDeleteFromWatch(movie.imdbID)}>🚮</button>
        </p>
      </div>
    </li>
  );
}

export default WatchedMovie;
