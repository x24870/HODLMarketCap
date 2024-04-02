import React, { useState } from "react";
import { ImportFromCsv, ExportToCsv, exportToCsv } from "./components/Csv"; // Assuming the file name is CsvComponents.tsx

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
      <h1>CSV Import/Export Example</h1>
      <ImportFromCsv onImport={handleImport} />
      <ExportToCsv filename="exportedData.csv" onClick={handleExportClick} />
      {/* Optionally, display the imported CSV data here */}
      <div>
        <h2>Imported Data:</h2>
        <pre>{JSON.stringify(csvData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
