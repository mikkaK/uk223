import React from "react";
import { RoundImg } from "../Atoms/RoundImg";
import { Text } from "../Atoms/Text";

interface Groupdata {
  name: string;
  moto: string;
  logo: string;
  otherDisplay?: Boolean;
}
const flex: React.CSSProperties = {
  display: "flex",
};
const image: React.CSSProperties = {
  marginRight: "20px",
};
const centerVertical: React.CSSProperties = {
  marginTop: "auto",
  marginBottom: "auto",
};

const otherMotoStyle: React.CSSProperties = {
  // marginTop: "2vh",
  marginLeft: "7.5vw",
};

export function GroupDisplay(props: Groupdata) {
  if (props.otherDisplay) {
    return (
      <>
        <div style={flex}>
          <div style={image}>
            <RoundImg logo={props.logo} />
            <div style={otherMotoStyle}>
              <Text text={"[" + props.moto + "]"} />
            </div>
          </div>
          <div style={centerVertical}>
            <Text text={props.name} isTitle={true} isBold={true} />
          </div>
        </div>
      </>
    );
  } else {
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
}
