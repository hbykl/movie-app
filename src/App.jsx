import { useEffect } from "react";
import { useState } from "react";
const movie_list = [
  {
    Id: "769",
    Title: "Goodfellas",
    Year: "1990",
    Poster:
      "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  },
  {
    Id: "120",
    Title: "The Lord of the Rings",
    Year: "2001",
    Poster:
      "https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
  },
  {
    Id: "27205",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://image.tmdb.org/t/p/original/1jsZT bVsrqSqzGWeep2B1QiDKuh.jpg",
  },
  {
    Id: "238",
    Title: "The Godfather",
    Year: "1972",
    Poster:
      "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  },
  {
    Id: "680",
    Title: "Pulp Fiction",
    Year: "1994",
    Poster:
      "https://image.tmdb.org/t/p/original/dM2w364MScsjFf8pfMbaWUcWrR.jpg",
  },
  {
    Id: "155",
    Title: "The Dark Knight",
    Year: "2008",
    Poster:
      "https://image.tmdb.org/t/p/original/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg",
  },
  {
    Id: "550",
    Title: "Fight Club",
    Year: "1999",
    Poster:
      "https://image.tmdb.org/t/p/original/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
  },
  {
    Id: "13",
    Title: "Forrest Gump",
    Year: "1994",
    Poster:
      "https://image.tmdb.org/t/p/original/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
  },
  {
    Id: "807",
    Title: "Se7en",
    Year: "1995",
    Poster:
      "https://image.tmdb.org/t/p/original/6yoghtyTpznpBik8EngEmJskVUO.jpg",
  },
  {
    Id: "1891",
    Title: "The Empire Strikes Back",
    Year: "1980",
    Poster:
      "https://image.tmdb.org/t/p/original/7BuH8itoSrLExs2YZSsM01Qk2no.jpg",
  },
  {
    Id: "603",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
  {
    Id: "12444",
    Title: "Harry Potter and the Deathly Hallows: Part 2",
    Year: "2011",
    Poster:
      "https://image.tmdb.org/t/p/original/da22ZBmrDOXOCDRvr8Gic8ldhv.jpg",
  },
  {
    Id: "8077",
    Title: "The Truman Show",
    Year: "1998",
    Poster:
      "https://image.tmdb.org/t/p/original/yJrOYUyjkjFTqfEGxWpYH28zbKA.jpg",
  },
  {
    Id: "7698",
    Title: "The Green Mile",
    Year: "1999",
    Poster:
      "https://image.tmdb.org/t/p/original/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg",
  },
  {
    Id: "1572",
    Title: "Die Hard",
    Year: "1988",
    Poster:
      "https://image.tmdb.org/t/p/original/1Nq3GEX96A1Fzfb5jBqFaQZ02p.jpg",
  },
];
const selected_movie_list = [
  {
    Id: "769",
    Title: "Goodfellas",
    Year: "1990",
    Poster:
      "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    Duration: 120,
    Rating: 8.5,
  },
  {
    Id: "120",
    Title: "The Lord of the Rings",
    Year: "2001",
    Poster:
      "https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    Duration: 125,
    Rating: 8.1,
  },
];

const api_key = "242fc01a5db5c09e93d411a0770051e3";
const query = "First";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  useEffect(function () //first render
  {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`
    )
      .then((res) => res.json())
      .then((res) => setMovies(res.results));
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
            <MovieList movies={movies} onClick={handleClickMovie}></MovieList>
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
    array.reduce((sum, value) => sum + value, 0) / array.length;
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
