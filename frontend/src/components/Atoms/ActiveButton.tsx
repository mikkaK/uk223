import React from "react";

interface Props {
  isActive: Boolean;
  onClick: Function;
}
//A button that is either red or green depending on the @isActive Boolean in the props
export function ActiveButton(props: Props) {
  const buttonStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    backgroundColor: props.isActive ? "#4CAF50" : "#f44336",
    border: "none",
    color: "white",
  };

  return <button style={buttonStyle} onClick={() => props.onClick()}></button>;
}
