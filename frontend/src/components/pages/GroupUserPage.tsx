import api from "../../config/Api";
import React, { useEffect, useState } from "react";
import { ActiveButton } from "../Atoms/ActiveButton";
import { RoundImg } from "../Atoms/RoundImg";
import { Text } from "../Atoms/Text";
import { GroupDisplay } from "../Molecules/GroupDisplay";
import jwt from "jsonwebtoken";
import { TOKEN_LOCAL_STORAGE_KEY } from "../../Contexts/ActiveUserContext";
interface ResponseData {
  id: string;
  name: string;
  moto: string;
  url: string;
  isSubed: Boolean;
}

const flex: React.CSSProperties = {
  display: "flex",
};

export function groupUserPage() {
  const [groups, setGroups] = useState();
  const [userData, setUserData] = useState();
  useEffect(() => {
    const getGroups = async function () {
      //Res should contain a list of groups
      //A group contains an id, name, moto, urlForImg and a boolean based on if the user has joined the group
      const res = await api({
        method: "GET",
        url: "http://localhost:5000/group",
      });
    };
    const getUser = async function () {
      //Res should contain a list of groups
      //A group contains an id, name, moto, urlForImg and a boolean based on if the user has joined the group
      const res = await api({
        method: "GET",
        url: "http://localhost:5000/user/" + getUserId(),
      });

      setGroups(res.data[0]);
    };
    getUser();
    getGroups();
  });

  return (
    <div>
      {groups.map((value: ResponseData, index: Number) => {
        return (
          <div style={flex}>
            <div>
              <ActiveButton
                isActive={value.id === userData.roomId}
                onClick={() => changeSubscription(index)}
              />
            </div>
            <div>
              <GroupDisplay
                name={value.name}
                moto={value.moto}
                logo={value.url}
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  function changeSubscription(newRoom: Number) {
    let userCopy = userData;
    userCopy.roomId = newRoom;

    //make update request for user
    //.then function setUserData
  }

  function getUserId() {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
    const decodedToken = jwt.decode(token!);
    return decodedToken?.sub;
  }
}
