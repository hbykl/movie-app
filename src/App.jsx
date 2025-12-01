import { useState } from "react";
import useMovies from "./hooks/useMovies";
import useLocalStorage from "./hooks/useLocalStorage";
import Pagination from "./components/Pagination";
import Nav from "./components/Navbar/Nav";
import Logo from "./components/Navbar/Logo";
import Result from "./components/Navbar/Result";
import Search from "./components/Navbar/Search";
import MovieList from "./components/Movies/MovieList";
import SelectedDetails from "./components/SelectedMovies/SelectedDetails";
import SelectedMovieList from "./components/SelectedMovies/SelectedMovieList";
import AskSelected from "./components/SelectedMovies/AskSelected";
import Loading from "./components/Loading";
import Main from "./components/Main";
import ListContainer from "./components/ListContainer";
import ErrorMessage from "./components/ErrorMessage";

export default function App() {
  const [query, setQuery] = useState("film");
  const [selectedMovies, setSelectedMovies] = useLocalStorage(
    [],
    "selectedMovies"
  );
  const [selectedMovie, setSelectedMovie] = useState();
  const [rate, setRate] = useState("");

  const {
    movies,
    loading,
    error,
    currentPage,
    totalPage,
    totalResults,
    nextPage,
    previousPage,
  } = useMovies(query);

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
