import React from "react";

// Assuming you're lifting state up or using context/state management for handling the imported data
const ImportFromCsv = ({
  onImport,
}: {
  onImport: (rows: Array<Array<string | number>>) => void;
}) => {
  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const text = event.target?.result;
      const rows = (text as string).split("\n").map((row) => row.split(","));
      onImport(rows);
    };
    reader.readAsText(file);
  };
  return <input type="file" accept=".csv" onChange={handleFileSelect} />;
};

const ExportToCsv = ({
  filename,
  onClick,
}: {
  filename: string;
  onClick: () => void;
}) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      Export to CSV
    </button>
  );
};

function exportToCsv(
  filename: string,
  rows: Array<Array<string | number>>
): void {
  const csvContent = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export { ImportFromCsv, ExportToCsv, exportToCsv };
