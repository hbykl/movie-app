import { useState } from "react";
export default function ListContainer({ children }) {
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
