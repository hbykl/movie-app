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

function App() {
  const [movies, setMovies] = useState(movie_list);
  const [selectedMovies, setSelectedMovies] = useState(selected_movie_list);
  return (
    <>
      <nav className="bg-primary text-white p-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-4">Movie App</div>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                placeholder="Film arayın..."
              />
            </div>
            <div className="col-4 text-end">
              <strong>5</strong> kayıt bulundu.
            </div>
          </div>
        </div>
      </nav>
      <main className="container">
        <div className="row mt-2">
          <div className="col-md-9">
            <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4">
              {movies.map((movie) => (
                <div className="col mb-2" key={movie.Id}>
                  <div className="card">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h6 className="card-title">{movie.Title}</h6>
                      <div>
                        <i className="bi bi-calendar2-date me-1"></i>
                        <span>{movie.Year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3">
            <div className="movie-list">
              {selectedMovies.map((movie) => (
                <div className="card-mb-2" key={movie.Id}>
                  <div className="row">
                    <div className="col-4">
                      <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="img-fluid rounded-start"
                      />
                    </div>
                    <div className="col-8 ">
                      <div className="card-body">
                        <h6 className="card-title">{movie.Title}</h6>
                        <div className="d-flex justify-content-between">
                          <p>
                            <i className="bi bi-star-fill text-warning"></i>
                            <span>{movie.Rating}</span>
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
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
