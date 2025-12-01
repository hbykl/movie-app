import { useEffect } from "react";
import { useState } from "react";
import StarRating from "./StarRating";
const api_key = "242fc01a5db5c09e93d411a0770051e3";

export default function App() {
  const [query, setQuery] = useState("film");
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rate, setRate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  function nextPage() {
    currentPage + 1 > totalPage
      ? setCurrentPage(1)
      : setCurrentPage(currentPage + 1);
  }
  function previousPage() {
    currentPage - 1 <= 0
      ? setCurrentPage(totalPage)
      : setCurrentPage(currentPage - 1);
  }

  useEffect(
    function () //first render
    {
      const controller = new AbortController();
      const signal = controller.signal;
      async function getMovies(page) {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${page}`,
            { signal: signal }
          );
          if (!res.ok) {
            throw new Error("Bilinmeyen bir hata oluştu");
          }
          const data = await res.json();
          if (data.total_results === 0) {
            throw new Error("Film Bulunamadı");
          }
          setMovies(data.results);
          setTotalPage(data.total_pages);
          setTotalResults(data.total_results);
        } catch (e) {
          if (e.name === "AbortError") {
            console.log(e.message);
          } else {
            setError(e.message);
          }
        }
        setLoading(false);
      }
      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }
      getMovies(currentPage);
      return () => {
        controller.abort();
      };
    },
    [query, currentPage]
  );

  const handleClickMovie = (movie) => {
    const exist = selectedMovies.some((m) => m.id == movie.id);
    if (!exist) {
      setSelectedMovies([...selectedMovies, movie]);
      setSelectedMovie();
    } else {
      setSelectedMovie();
    }
  };
  const handleClickwithRate = (movie) => {
    const newMovie = {
      ...movie,
      rate,
    };
    handleClickMovie(newMovie);
    setRate("0");
  };

  const handleSelectMovie = (movie) => {
    selectedMovie === movie ? setSelectedMovie() : setSelectedMovie(movie);
  };

  const handleDeleteMovie = (id) => {
    setSelectedMovies(selectedMovies.filter((m) => m.id !== id));
  };

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Result totalResults={totalResults} />
      </Nav>
      <Main>
        <div className="col-md-9">
          <ListContainer movies={movies}>
            {loading && <Loading />}
            {!loading && !error && movies.length > 0 && (
              <>
                <MovieList
                  movies={movies}
                  selectedMovies={selectedMovies}
                  selectedMovie={selectedMovie}
                  handleSelectMovie={handleSelectMovie}
                ></MovieList>
                <Pagination
                  nextPage={nextPage}
                  previousPage={previousPage}
                  totalPage={totalPage}
                  currentPage={currentPage}
                />
              </>
            )}
            {error && <ErrorMessage message={error}></ErrorMessage>}
          </ListContainer>
        </div>
        <div className="col-md-3">
          <ListContainer>
            <SelectedDetails
              selectedMovies={selectedMovies}
              setSelectedMovies={setSelectedMovies}
            />
            {selectedMovie ? (
              <AskSelected
                movie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
                selectedMovies={selectedMovies}
                setRate={setRate}
                handleClickwithRate={handleClickwithRate}
              />
            ) : (
              <SelectedMovieList
                selectedMovies={selectedMovies}
                handleDeleteMovie={handleDeleteMovie}
              />
            )}
          </ListContainer>
        </div>
      </Main>
    </>
  );
}

function Pagination({ nextPage, previousPage, totalPage, currentPage }) {
  return (
    <nav>
      <ul className="pagination d-flex justify-content-between">
        <li className="page-item">
          <a className="page-link" href="#" onClick={previousPage}>
            Geri
          </a>
        </li>
        <p>
          Toplam {totalPage} sayfada {currentPage}. sayfayı görüntülüyorsunuz.
        </p>
        <li className="page-item">
          <a className="page-link" href="#" onClick={nextPage}>
            İleri
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Nav({ children }) {
  return (
    <nav className="bg-primary text-white p-2">
      <div className="container">
        <div className="row align-items-center">{children}</div>
      </div>
    </nav>
  );
}

function Loading() {
  return (
    <div className="spinner-border text-info" role="status">
      <span className="sr-only"></span>
    </div>
  );
}

function ErrorMessage({ message }) {
  return <div className="alert alert-danger">{message}</div>;
}

function Logo() {
  return (
    <div className="col-4">
      <i className="bi bi-camera-reels me-2"></i>
      Movie App
    </div>
  );
}
function Search({ query, setQuery }) {
  return (
    <div className="col-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="form-control"
        placeholder="Film arayın..."
      />
    </div>
  );
}
function Result({ totalResults }) {
  return (
    <div className="col-4 text-end">
      <strong>{totalResults}</strong> kayıt bulundu.
    </div>
  );
}
function Main({ children }) {
  return (
    <main className="container">
      <div className="row mt-2">{children}</div>
    </main>
  );
}
function ListContainer({ children }) {
  const [isOpen, setButton] = useState(true);
  return (
    <>
      <button
        className="btn btn-outline-primary mb-2"
        onClick={() => setButton((val) => !val)}
      >
        {isOpen ? (
          <i className="bi bi-chevron-up"></i>
        ) : (
          <i className="bi bi-chevron-down"></i>
        )}
      </button>
      {isOpen && children}
    </>
  );
}
function MovieList({
  movies,
  selectedMovies,
  selectedMovie,
  handleSelectMovie,
}) {
  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4">
      {movies.map((movie) => (
        <Movie
          movie={movie}
          key={movie.id}
          selectedMovies={selectedMovies}
          selectedMovie={selectedMovie}
          handleSelectMovie={handleSelectMovie}
        />
      ))}
    </div>
  );
}
function Movie({ movie, selectedMovies, selectedMovie, handleSelectMovie }) {
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
// function SelectedMovieListContainer() {
//
//   return (
//     <div className="col-md-3 ">
//       <div className="movie-list">
//       </div>
//     </div>
//   );
// }
function SelectedDetails({ selectedMovies, setSelectedMovies }) {
  const getAvg = (array) =>
    array.reduce((sum, value) => sum + value / array.length, 0);
  const getUserAvg = (array) =>
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
function SelectedMovieList({ selectedMovies, handleDeleteMovie }) {
  return selectedMovies.map((movie) => (
    <SelectedMovie
      movie={movie}
      key={movie.id}
      handleDeleteMovie={handleDeleteMovie}
    />
  ));
}
function SelectedMovie({ movie, handleDeleteMovie }) {
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

function AskSelected({
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
