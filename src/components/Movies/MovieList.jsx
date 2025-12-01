import Movie from "./Movie";
export default function MovieList({
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
