import React, {useState, useEffect} from "react";
import { token_backend } from "../../../declarations/token_backend/index";
import { Principal } from "@dfinity/principal";

function Balance() {

  const [inputValue, setInputValue] = React.useState("");
  const [balance, setBalance] = React.useState(0);
  const [symbol, setSymbol] = React.useState("");
  const [isHidden, setIsHidden] = React.useState(true);
  
  useEffect(() => {
    getSymbol();
  }, []);
  
  async function handleClick() {
    const principal = Principal.fromText(inputValue);
    const balance = await token_backend.balanceOf(principal);
    setBalance(balance.toLocaleString());
    setIsHidden(false);
  };

  async function getSymbol() {
    const symbol = await token_backend.getSymbol();
    setSymbol(symbol);
  }
  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balance} {symbol} tokens.</p>
    </div>
  );
}

export default Balance;
