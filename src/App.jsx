import { useState } from "react";

function App() {
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
          <div className="col-md-9">Movie List</div>
          <div className="col-md-3">Selected Movie List</div>
        </div>
      </main>
    </>
  );
}

export default App;
