export default function SelectedDetails({ selectedMovies, setSelectedMovies }) {
  const getAvg = (array) =>
    array.reduce((sum, value) => sum + value / array.length, 0);
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5>Listede {selectedMovies.length} film bulunmaktadır.</h5>
        <div className=" d-flex justify-content-between ">
          <p>
            <i className="bi bi-star-fill text-warning me-1"></i>
            <span>
              {getAvg(
                selectedMovies.map((movies) => movies.vote_average)
              ).toFixed(2)}
            </span>
          </p>
          <p>
            <i className="bi bi-stars text-warning me-1"></i>
            <span>
              {getAvg(selectedMovies.map((movies) => movies.rate)).toFixed(2)}
            </span>
          </p>
          <button
            className=" btn btn-danger text-white"
            onClick={() => setSelectedMovies([])}
          >
            <i className="bi bi-trash-fill"></i> Temizle
          </button>
        </div>
      </div>
    </div>
  );
}
