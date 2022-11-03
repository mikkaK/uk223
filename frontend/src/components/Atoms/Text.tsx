//Notes: Finished
import React from "react";

interface Title {
  text: string;
  isTitle?: Boolean;
  isBold?: Boolean;
}
const styleNormal: React.CSSProperties = {
  fontSize: "16px",
  margin: "0px",
};
const styleTitle: React.CSSProperties = {
  fontSize: "24px",
  margin: "0px",
};
const styleBold: React.CSSProperties = {
  fontSize: "16px",
  margin: "0px",
  fontWeight: "bold",
};

const styleBoldTitle: React.CSSProperties = {
  fontSize: "24px",
  margin: "0px",
  fontWeight: "bold",
};

export function Text(props: Title) {
  let styleToUse = styleNormal;
  if (props.isBold && props.isTitle) {
    styleToUse = styleBoldTitle;
  } else if (props.isBold) {
    styleToUse = styleBold;
  } else if (props.isTitle) {
    styleToUse = styleTitle;
  }
  return <p style={styleToUse}>{props.text}</p>;
}
