import React, { useState } from "react";
import Row from "./Row"; // Import your Row component

interface RowData {
  id: number;
  token: string;
  price: string;
  supply: string;
}

const Rows: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>([]);

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const text = event.target?.result as string;
      const rowsData: RowData[] = text.split("\n").map((row, index) => {
        const [token, price, supply] = row.split(",");
        return { id: index, token, price, supply };
      });

      setRows(rowsData);
    };
    reader.readAsText(file);
  };

  const handleAdd = () => {
    setRows((rows) => [
      ...rows,
      { id: rows.length, token: "", price: "", supply: "" },
    ]);
  };

  const handleDelete = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleExportToCsv = () => {
    console.log(rows);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows
        .map((row) => [row.token, row.price, row.supply].join(","))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "exportedData.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdateRow = (
    id: number,
    token: string,
    price: string,
    supply: string
  ) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { id, token, price, supply } : row
    );
    setRows(updatedRows);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileSelect} />
      <button className="btn btn-primary" onClick={handleExportToCsv}>
        Export to CSV
      </button>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={handleAdd}>
          Add Row
        </button>
      </div>
      {rows.map((rowData) => (
        <Row
          key={rowData.id}
          {...rowData} // Spread the rest of rowData as props
          onDelete={handleDelete}
          onUpdate={handleUpdateRow}
        />
      ))}
    </div>
  );
};

export default Rows;
