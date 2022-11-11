import React from "react";
import { RoundImg } from "../Atoms/RoundImg";
import { Text } from "../Atoms/Text";

interface Props {
  name: string;
  motto: string;
  logo: string;
  otherDisplay?: Boolean;
}

//Displays the data of a group(name,motto,logo)
export function GroupDisplay(props: Props) {
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
  marginLeft: "7.5vw",
};
