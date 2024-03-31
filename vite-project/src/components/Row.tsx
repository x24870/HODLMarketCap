import React from "react";
import Input from "./Input";
import { useState } from "react";

interface Props {
  id: number;
  onDelete: (id: number) => void;
}

const Row = ({ id, onDelete }: Props) => {
  const [token, setToken] = useState("");
  const [price, setPrice] = useState("");
  const [supply, setSupply] = useState("");
  const [marketCap, setMarketCap] = useState("");

  const calculateMarketCap = () => {
    const p = parseFloat(price);
    const s = parseFloat(supply);
    if (!isNaN(p) && !isNaN(s)) {
      setMarketCap((p * s).toString());
    } else {
      setMarketCap("");
    }
  };

  React.useEffect(() => {
    calculateMarketCap();
  }, [price, supply]);

  return (
    <div className="row g-2 align-items-center">
      <div className="col">
        <Input placeholder="Input A" value={token} onValueChange={setToken} />
      </div>
      <div className="col">
        <Input placeholder="price" value={price} onValueChange={setPrice} />
      </div>
      <div className="col">
        <Input placeholder="supply" value={supply} onValueChange={setSupply} />
      </div>
      <div className="col">
        <input
          type="text"
          readOnly
          className="form-control-plaintext"
          value={marketCap || ""}
        />
      </div>
      <div className="col-auto">
        <button className="btn btn-danger" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Row;
