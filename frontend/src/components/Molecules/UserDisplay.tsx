import React from "react";
import { RoundImg } from "../Atoms/RoundImg";
import { Text } from "../Atoms/Text";

interface Props {
  username: string;
  userId?: string;
  email?: string;
  group?: string;
}

export function UserDisplay(props: Props) {
  let userId = <></>;
  let email = <></>;
  let group = <></>;

  if (props.userId) {
    userId = <Text text={"ID: " + props.userId} isBold={true} />;
  }
  if (props.email) {
    email = <Text text={"Email: " + props.email} />;
  }
  if (props.group) {
    group = <Text text={"Is Part of Group: " + props.group} />;
  }
  return (
    <div style={flex}>
      <div style={image}>
        <RoundImg
          logo={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
        />
      </div>
      <div style={data}>
        {userId}
        <Text text={"Username: " + props.username} />
        {email}
        {group}
      </div>
    </div>
  );
}

const flex: React.CSSProperties = {
  display: "flex",
  boxShadow: "0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
  padding: "5px",
  height: "100%",
  maxHeight: "25vh",
  background: "#575252",
  margin: "5px",
};

const image: React.CSSProperties = {
  marginRight: "20px",
  width: "10vh",
  height: "10vh",
  marginTop: "2vh",
};

const data: React.CSSProperties = {
  marginTop: "2vh",
  marginBottom: "2vh",
};
