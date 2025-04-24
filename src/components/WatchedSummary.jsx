const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function WatchedSummary({ watched }) {
  
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating || 0));
  const avgUserRating = average(watched.map((movie) => movie.userRatings || 0));
  const avgRuntime = average(watched.map((movie) => movie.runtime || 0));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.fixed()}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.fixed()}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

export default WatchedSummary;
