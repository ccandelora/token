import React from "react";
import { token_backend } from "../../../declarations/token_backend/index";


function Faucet() {
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("Gimme gimme");

  async function handleClick(event) {
    setIsDisabled(true);
     const outPut = await token_backend.payOut();
     setButtonText(outPut);
    //setIsDisabled(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free CANDY tokens here! Claim 100 CANDY tokens to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
