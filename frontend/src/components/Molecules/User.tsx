import React from "react";
import { RoundImg } from "../Atoms/RoundImg";
import { Text } from "../Atoms/Text";

interface UserData {
  username: string;
  profilePicture: string;
}

const flex: React.CSSProperties = {
  display: "flex",
  width: "fit-content",
  boxShadow: "0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
  padding: "5px",
};
const image: React.CSSProperties = {
  marginRight: "20px",
  width: "10vh",
  height: "10vh",
};
const userName: React.CSSProperties = {
  marginTop: "2vh",
  width: "12.5vw",
};

export function UserElement(props: UserData) {
  return (
    <div style={flex}>
      <div style={image}>
        <RoundImg logo={props.profilePicture} />
      </div>
      <div style={userName}>
        <Text text={props.username} isBold={true} />
      </div>
    </div>
  );
}
