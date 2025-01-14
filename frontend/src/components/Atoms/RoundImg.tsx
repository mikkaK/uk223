import React from "react";

interface Props {
  logo: string;
}
//Displays a round image
export function RoundImg(props: Props) {
  return <img style={imageStyle} src={props.logo} alt={props.logo}></img>;
}

const imageStyle: React.CSSProperties = {
  height: "100%",
  borderRadius: "50%",
};
