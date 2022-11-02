import React from "react";
import { RoundImg } from "../Atoms/RoundImg";
import { Text } from "../Atoms/Text";

interface Groupdata {
  name: string;
  moto: string;
  logo: string;
}
const flex: React.CSSProperties = {
  display: "flex",
};
const image: React.CSSProperties = {
  marginRight: "20px",
};

export function GroupDisplay(props: Groupdata) {
  return (
    <div style={flex}>
      <div style={image}>
        <RoundImg logo={props.logo} />
      </div>
      <div>
        <Text text={props.name} isTitle={true} isBold={true} />
        <Text text={"[" + props.moto + "]"} />
      </div>
    </div>
  );
}
