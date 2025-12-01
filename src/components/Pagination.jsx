export default function Pagination({
  nextPage,
  previousPage,
  totalPage,
  currentPage,
}) {
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
