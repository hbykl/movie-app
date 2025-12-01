import { useEffect } from "react";
import { useState } from "react";
const api_key = "242fc01a5db5c09e93d411a0770051e3";

export default function (query) {
  const [movies, setMovies] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(
    function () {
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
  return {
    movies,
    loading,
    error,
    currentPage,
    totalPage,
    totalResults,
    nextPage,
    previousPage,
  };
}
