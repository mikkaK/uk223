//Notes: Finished
import React from "react";

interface ImageData {
  logo: string;
}
const imageStyle: React.CSSProperties = {
  height: "100%",
  borderRadius: "50%",
};

export function RoundImg(props: ImageData) {
  return <img style={imageStyle} src={props.logo} alt={props.logo}></img>;
}
