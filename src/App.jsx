import { useEffect } from "react";
import { useState } from "react";

const api_key = "242fc01a5db5c09e93d411a0770051e3";

export default function App() {
  const [query, setQuery] = useState("film");
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () //first render
    {
      async function getMovies() {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`
          );
          if (!res.ok) {
            throw new Error("Bilinmeyen bir hata oluştu");
          }
          const data = await res.json();
          if (data.total_results === 0) {
            throw new Error("Film Bulunamadı");
          }
          setMovies(data.results);
        } catch (e) {
          console.log(e.message);
          setError(e.message);
        }
        setLoading(false);
      }
      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }
      getMovies();
    },
    [query]
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
        <Result movies={movies} />
      </Nav>
      <Main>
        <div className="col-md-9">
          <ListContainer movies={movies}>
            {loading && <Loading />}
            {!loading && !error && (
              <MovieList
                movies={movies}
                selectedMovies={selectedMovies}
                selectedMovie={selectedMovie}
                handleSelectMovie={handleSelectMovie}
              ></MovieList>
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
                onClick={handleClickMovie}
                setSelectedMovie={setSelectedMovie}
                selectedMovies={selectedMovies}
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
function Result({ movies }) {
  return (
    <div className="col-4 text-end">
      <strong>{movies.length}</strong> kayıt bulundu.
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
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5>Listede {selectedMovies.length} film bulunmaktadır.</h5>
        <div className=" d-flex justify-content-between">
          <p>
            <i className="bi bi-star-fill text-warning me-1"></i>
            <span>
              {getAvg(
                selectedMovies.map((movies) => movies.vote_average)
              ).toFixed(2)}
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
              className="btn btn-danger pt-1 pb-1"
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

function AskSelected({ movie, setSelectedMovie, onClick, selectedMovies }) {
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
            <p>{movie.overview}</p>
            <p>
              {movie.genre_ids?.map((genre) => (
                <span key={genre} className="badge text-bg-primary me-1">
                  {genre}
                </span>
              ))}
            </p>
          </div>
          <div className="d-flex justify-content-between me-2">
            {selectedMovies.some((m) => m.id == movie.id) ? (
              <p>Film Listenizde Bulunmaktadır.</p>
            ) : (
              <button className="btn btn-info" onClick={() => onClick(movie)}>
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
