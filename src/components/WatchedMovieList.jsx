import WatchedMovie from "./WatchedMovie";

function WatchedMovieList({ watched, onDeleteFromWatch }) {
  return (
    <ul className="list">
      {watched?.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDeleteFromWatch={onDeleteFromWatch}/>
      ))}
    </ul>
  );
}

export default WatchedMovieList;
