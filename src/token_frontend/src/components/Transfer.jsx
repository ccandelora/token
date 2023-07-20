import React, { useState } from "react";
import { token_backend } from "../../../declarations/token_backend/index";
import { Principal } from "@dfinity/principal";
import { Nat } from "@dfinity/agent";
function Transfer() {
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("Transfer");
  const [inputValue, setInputValue] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  
  async function handleClick() {
    setIsDisabled(true);
    let toId = Principal.fromText(inputValue)
    let amountTransfer = Number(amount);
    const result = await token_backend.transfer(toId, amountTransfer);
    setButtonText(result);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled} >
            {buttonText}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Transfer;
