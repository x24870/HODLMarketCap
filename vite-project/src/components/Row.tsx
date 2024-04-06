import React from "react";
import Input from "./Input";
import { useState } from "react";

interface Props {
  id: number;

  token?: string;
  price?: string;
  supply?: string;
  onDelete: (id: number) => void;
  onUpdate: (id: number, token: string, price: string, supply: string) => void; // Add this line
}

const Row = ({
  id,
  token = "",
  price = "",
  supply = "",
  onDelete,
  onUpdate,
}: Props) => {
  // Initialize state with props
  const [tokenState, setToken] = useState(token);
  const [priceState, setPrice] = useState(price);
  const [supplyState, setSupply] = useState(supply);
  const [marketCap, setMarketCap] = useState("");

  const calculateMarketCap = () => {
    const p = parseFloat(priceState);
    const s = parseFloat(supplyState);
    if (!isNaN(p) && !isNaN(s)) {
      setMarketCap((p * s).toString());
    } else {
      setMarketCap("");
    }
  };

  React.useEffect(() => {
    calculateMarketCap();
  }, [priceState, supplyState]);

  React.useEffect(() => {
    onUpdate(id, tokenState, priceState, supplyState); // Propagate data changes back to parent
  }, [tokenState, priceState, supplyState]);

  return (
    <div className="row g-2 align-items-center">
      <div className="col">
        <Input
          placeholder="token"
          value={tokenState}
          onValueChange={setToken}
        />
      </div>
      <div className="col">
        <Input
          placeholder="price"
          value={priceState}
          onValueChange={setPrice}
        />
      </div>
      <div className="col">
        <Input
          placeholder="supply"
          value={supplyState}
          onValueChange={setSupply}
        />
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
