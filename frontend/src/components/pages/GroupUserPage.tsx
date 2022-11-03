import api from "../../config/Api";
import React, { useEffect, useState } from "react";
import { ActiveButton } from "../Atoms/ActiveButton";
import { GroupDisplay } from "../Molecules/GroupDisplay";
import Navbar from "../Atoms/Navbar";
import { User } from "../../types/Database/User";

interface Props {
  setUser: (params: any) => any;
  user: User;
}

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

export function GroupUserPage(props: Props) {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    const getGroups = async function () {
      //Res should contain a list of groups
      //A group contains an id, name, moto, urlForImg and a boolean based on if the user has joined the group
      api({
        method: "GET",
        url: "http://localhost:5000/group",
      })
        .then((res) => {
          setGroups(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getGroups();
  });

  return (
    <div>
      <Navbar />
      {groups.map((value: ResponseData, index: Number) => {
        return (
          <div style={flex}>
            <div>
              <ActiveButton
                isActive={value.id === props.user.groupId}
                onClick={() => changeSubscription(value.id)}
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

  function changeSubscription(newGroup: string) {
    let userCopy = props.user;
    userCopy.groupId = newGroup;

    api({
      method: "PUT",
      url: "http://localhost:5000/user",
      data: {
        userId: userCopy.id,
        newRoom: newGroup,
      },
    })
      .then((res) => {
        props.setUser(userCopy);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
