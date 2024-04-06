import React, { useState } from "react";
import { ImportFromCsv, ExportToCsv, exportToCsv } from "./components/Csv"; // Assuming the file name is CsvComponents.tsx
import Row from "./components/Row";
import Rows from "./components/Rows";

const App: React.FC = () => {
  // State to hold the CSV data
  const [csvData, setCsvData] = useState<Array<Array<string | number>>>([]);

  // Function to handle importing CSV data
  const handleImport = (rows: Array<Array<string | number>>) => {
    setCsvData(rows);
  };

  // Function to trigger CSV export
  const handleExportClick = () => {
    exportToCsv("exportedData.csv", csvData);
  };

  return (
    <div className="container">
      <h1>Token market cap</h1>
      <div>
        <Rows />
      </div>
    </div>
  );
};

export default App;
