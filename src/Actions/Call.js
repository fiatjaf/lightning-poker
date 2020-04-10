import React, { useContext, useState } from "react";
import { RoomContext } from "../Room";
import { CALL } from "../lib/types";
import dispatch from "../dispatch";

function Call() {
  const { tableId, maxBet = 0, me = {} } = useContext(RoomContext);
  const { id: playerId, bet = 0, chips = 0 } = me;
  const [disabled, disable] = useState(false);

  console.log(me);

  let amountToCall = maxBet - bet;
  let allin;

  if (amountToCall >= chips) {
    allin = true;
    amountToCall = 0;
  }

  return (
    <div className={`call-control${allin ? " all-in" : ""}`}>
      <button
        className="call"
        disabled={disabled}
        onClick={async () => {
          try {
            disable(true);
            await dispatch({ type: CALL, tableId, playerId });
            disable(false);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <div>{allin ? "All In" : amountToCall === 0 ? "Check" : "Call"}</div>
        <div
          style={{
            display: `${amountToCall === 0 ? "none" : "block"}`
          }}
        >
          {amountToCall}
        </div>
      </button>
    </div>
  );
}

export default Call;
