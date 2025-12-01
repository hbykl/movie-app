import StarRating from "../../StarRating";
export default function AskSelected({
  movie,
  setSelectedMovie,
  handleClickwithRate,
  selectedMovies,
  setRate,
}) {
  const selectedRate = selectedMovies.find((m) => m.id === movie.id)?.rate;
  return (
    <div className="card mb-2">
      <div className="col">
        <div className="row">
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
        <div className="row m-3">
          <div className="card-body">
            <h6 className="card-title">{movie.title}</h6>
            <p>
              <i className="bi bi-star-fill text-warning"></i>
              <span>{movie.vote_average}</span>
            </p>
            <p>{movie.overview}</p>
            <p>
              {movie.genre_ids?.map((genre) => (
                <span key={genre} className="badge text-bg-primary me-1">
                  {genre}
                </span>
              ))}
            </p>
          </div>
          <div className="mb-3">
            <StarRating size={"20"} maxRating={10} onRating={setRate} />
          </div>
          <div className="d-flex justify-content-between ">
            {selectedMovies.some((m) => m.id == movie.id) ? (
              <p>
                Film Listenizde Bulunmaktadır. Değerlendirmeniz:{" "}
                {selectedRate ? selectedRate : "0"}
              </p>
            ) : (
              <button
                className="btn btn-info"
                onClick={() => handleClickwithRate(movie)}
              >
                Listeye Ekle
              </button>
            )}

            <button
              className="btn btn-danger"
              onClick={() => setSelectedMovie()}
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
