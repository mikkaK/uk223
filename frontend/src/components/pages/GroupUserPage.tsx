import api from "../../config/Api";
import React, { useEffect, useState } from "react";
import { ActiveButton } from "../Atoms/ActiveButton";
import { GroupDisplay } from "../Molecules/GroupDisplay";
import Navbar from "../Atoms/Navbar";
import { User } from "../../types/Database/User";
import { Group } from "../../types/Database/Group";
import { TOKEN_LOCAL_STORAGE_KEY } from "../../Contexts/ActiveUserContext";
import { decode } from "jsonwebtoken";

const buttonSize: React.CSSProperties = {
  width: "3.5vw",
};

const flex: React.CSSProperties = {
  display: "flex",
  marginBottom: "0.3vh",
};

export function GroupUserPage() {
  const [groups, setGroups] = useState<Group[]>();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const getGroups = async function () {
      //Res should contain a list of groups
      //A group contains an id, name, motto, urlForImg and a boolean based on if the user has joined the group
      api({
        method: "GET",
        url: "http://localhost:8080/group",
      })
        .then((res) => {
          console.log(res.data);
          setGroups(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    const getUser = async function () {
      api({
        method: "GET",
        url: "http://localhost:8080/user/" + getUserId(),
      })
        .then((res) => {
          console.log(res);
          setUser(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getUser();
    getGroups();
  }, []);
  if (groups && user) {
    return (
      <div>
        <Navbar />
        {groups.map((group: Group, index: Number) => {
          return (
            <div style={flex}>
              <div style={buttonSize}>
                <ActiveButton
                  isActive={group.id === user.groupId}
                  onClick={() => changeSubscription(group.id!)}
                />
              </div>
              <div>
                <GroupDisplay
                  name={group.groupName}
                  motto={group.groupMotto}
                  logo={group.groupLogo}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <></>;
  }

  //note needs to be tested
  function changeSubscription(newGroup: string) {
    let userCopy = user!;
    userCopy.id = newGroup;

    api({
      method: "PUT",
      url: "http://localhost:8080/user",
      data: {
        userId: userCopy.id,
        newRoom: newGroup,
      },
    })
      .then((res) => {
        setUser(userCopy);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

function getUserId() {
  const bearerToken = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  const token = bearerToken?.split(" ")[1];
  const decodedToken = decode(token!);
  return decodedToken?.sub;
}