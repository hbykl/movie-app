export default function SelectedMovie({ movie, handleDeleteMovie }) {
  return (
    <div className="card mb-2">
      <div className="row">
        <div className="col-4">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500` + movie.poster_path
                : "/img/no-image.jpg"
            }
            alt={movie.title}
            className="img-fluid rounded-start"
          />
        </div>
        <div className="col-8 ">
          <div className="card-body">
            <h6 className="card-title">{movie.title}</h6>
            <p>
              <i className="bi bi-star-fill text-warning"></i>
              <span>{movie.vote_average}</span>
            </p>
            <button
              className="btn btn-danger pt-1 pb-1 "
              onClick={() => handleDeleteMovie(movie.id)}
            >
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
