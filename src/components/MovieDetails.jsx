function MovieDetails({ id, onCloseMovie }) {
  return (
    <p className="details">
      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>
      {/* <Movie movie={movie} /> */}
      {id}
    </p>
  );
}

export default MovieDetails;
