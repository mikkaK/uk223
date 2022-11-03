//Notes: Finished
import React from "react";

interface ButtonData {
  isActive: Boolean;
  onClick: Function;
}

export function ActiveButton(props: ButtonData) {
  const buttonStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    backgroundColor: props.isActive ? "#4CAF50" : "#f44336",
    border: "none",
    color: "white",
  };

  return <button style={buttonStyle} onClick={() => props.onClick()}></button>;
}
