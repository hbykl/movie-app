export default function Movie({
  movie,
  selectedMovies,
  selectedMovie,
  handleSelectMovie,
}) {
  return (
    <div className="col mb-2">
      <div
        className={`card movie ${
          selectedMovies.some((m) => m.id === movie.id) ||
          selectedMovie === movie
            ? "selected-movie"
            : ""
        }`}
        onClick={() => handleSelectMovie(movie)}
      >
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500` + movie.poster_path
              : "/img/no-image.jpg"
          }
          alt={movie.title}
          className="card-img-top"
        />
        <div className="card-body">
          <h6 className="card-title">{movie.title}</h6>
          <div>
            <i className="bi bi-calendar2-date me-1"></i>
            <span>{movie.release_date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
