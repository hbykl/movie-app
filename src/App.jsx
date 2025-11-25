import { useEffect } from "react";
import { useState } from "react";

const api_key = "242fc01a5db5c09e93d411a0770051e3";
const query = "red";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(function () //first render
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
    getMovies();
  }, []);

  const handleClickMovie = (movie, movieId) => {
    const exist = selectedMovies.some((m) => m.id == movieId);
    !exist && setSelectedMovies([...selectedMovies, movie]);
  };

  return (
    <>
      <Nav>
        <Logo />
        <Search />
        <Result movies={movies} />
      </Nav>
      <Main>
        <div className="col-md-9">
          <ListContainer movies={movies}>
            {loading && <Loading />}
            {!loading && !error && (
              <MovieList movies={movies} onClick={handleClickMovie}></MovieList>
            )}
            {error && <ErrorMessage message={error}></ErrorMessage>}
          </ListContainer>
        </div>
        <div className="col-md-3">
          <ListContainer>
            <SelectedDetails selectedMovies={selectedMovies} />
            <SelectedMovieList selectedMovies={selectedMovies} />
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
function Search() {
  return (
    <div className="col-4">
      <input
        type="text"
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
function MovieList({ movies, onClick }) {
  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4">
      {movies.map((movie) => (
        <Movie movie={movie} key={movie.id} onClick={onClick} />
      ))}
    </div>
  );
}
function Movie({ movie, onClick }) {
  return (
    <div className="col mb-2">
      <div
        className="card "
        onClick={() => {
          onClick(movie, movie.id);
        }}
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
function SelectedDetails({ selectedMovies }) {
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
          <p>
            <i className="bi bi-hourglass text-warning me-1"></i>
            <span>
              {getAvg(selectedMovies.map((movies) => movies.Duration))} dk
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
function SelectedMovieList({ selectedMovies }) {
  return selectedMovies.map((movie) => (
    <SelectedMovie movie={movie} key={movie.id} />
  ));
}
function SelectedMovie({ movie }) {
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
            <div className="d-flex justify-content-between">
              <p>
                <i className="bi bi-star-fill text-warning"></i>
                <span>{movie.vote_average}</span>
              </p>
              <p>
                <i className="bi bi-hourglass text-warning"></i>
                <span>{movie.Duration} dk</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
