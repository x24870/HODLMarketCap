import Alert from "./components/Alert";
import Row from "./components/Row";
import { useState } from "react";

function App() {
  // const [rows, setRows] = const [rows, setRows] = useState<number[]>([]);
  const [rows, setRows] = useState<{ id: number }[]>([]);

  const addRow = () => {
    setRows((prevRows) => [...prevRows, { id: prevRows.length }]);
  };

  const deleteRow = (id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  return (
    <div className="container my-5">
      <div className="mb-3">
        <button className="btn btn-primary" onClick={addRow}>
          Add Row
        </button>
      </div>
      <div className="row g-2 mb-2 fw-bold">
        <div className="col">Token</div>
        <div className="col">Supply</div>
        <div className="col">Price</div>
        <div className="col">Market Cap</div>
        <div className="col-auto">Actions</div>
      </div>
      {rows.map((row, index) => (
        <Row key={row.id} id={row.id} onDelete={deleteRow} />
      ))}
    </div>
  );
}

export default App;
