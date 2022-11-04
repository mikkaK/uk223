import React from "react";
import { RoundImg } from "../Atoms/RoundImg";
import { Text } from "../Atoms/Text";

interface UserData {
  username: string;
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
        <RoundImg
          logo={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
        />
      </div>
      <div style={userName}>
        <Text text={props.username} isBold={true} />
      </div>
    </div>
  );
}
