//Notes: Finished
import React from "react";

interface Props {
  setText: (value: string, field?: string) => any;
  text: string;
  label: string;
  field?: string;
}

export function TextInput(props: Props) {
  return (
    <div>
      <label htmlFor={props.label}>{props.label}</label>
      <input
        name={props.label}
        type="text"
        value={props.text}
        onChange={(e) => props.setText(e.target.value, props.field)}
      />
    </div>
  );
}
