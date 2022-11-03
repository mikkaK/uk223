//Notes: Finished
import React from "react";

interface Props {
  setText: (params: string) => any;
  text: string;
  label: string;
}
const imageStyle: React.CSSProperties = {
  // width: "100%",
  // height: "100%",
  borderRadius: "50%",
};

export function TextInput(props: Props) {
  return (
    <input
      type="text"
      value={props.text}
      onChange={(e) => props.setText(e.target.value)}
    />
  );
}
