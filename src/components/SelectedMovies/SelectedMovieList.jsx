import SelectedMovie from "./SelectedMovie";
export default function SelectedMovieList({
  selectedMovies,
  handleDeleteMovie,
}) {
  return selectedMovies.map((movie) => (
    <SelectedMovie
      movie={movie}
      key={movie.id}
      handleDeleteMovie={handleDeleteMovie}
    />
  ));
}
