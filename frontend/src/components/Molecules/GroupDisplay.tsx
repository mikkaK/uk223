import React from "react";
import { RoundImg } from "../Atoms/RoundImg";
import { Text } from "../Atoms/Text";

interface Groupdata {
  name: string;
  motto: string;
  logo: string;
  otherDisplay?: Boolean;
}
const flex: React.CSSProperties = {
  display: "flex",
  height: "10vh",
};
const image: React.CSSProperties = {
  marginRight: "20px",
};
const centerVertical: React.CSSProperties = {
  marginTop: "auto",
  marginBottom: "auto",
};

const othermottoStyle: React.CSSProperties = {
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
            <div style={othermottoStyle}>
              <Text text={"[" + props.motto + "]"} />
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
          <Text text={"[" + props.motto + "]"} />
        </div>
      </div>
    );
  }
}
