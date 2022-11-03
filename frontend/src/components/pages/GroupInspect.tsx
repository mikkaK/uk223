import { Group } from "../../types/Database/Group";
import api from "../../config/Api";
import React, { useEffect, useState } from "react";
import { GroupDisplay } from "../Molecules/GroupDisplay";
import { useParams } from "react-router-dom";
import Navbar from "../Atoms/Navbar";
import { User } from "../../types/Database/User";
import { Text } from "../Atoms/Text";
import { UserElement } from "../Molecules/User";

const flex: React.CSSProperties = {
  display: "flex",
};

export function GroupInspect() {
  let { groupId } = useParams();
  const [group, setGroup] = useState<Group>();
  const [users, setUsers] = useState<[User]>();
  let usersElement;
  useEffect(() => {
    //Gets the group using the id
    const getGroup = async function () {
      api({
        method: "GET",
        url: "http://localhost:5000/group/" + groupId,
      })
        .then((res) => {
          setGroup(res.data[0]);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    //Gets all usres that are part of group with group ID
    //User should only contain Name and Profile picture URL
    const getUsers = async function () {
      api({
        method: "GET",
        url: "http://localhost:5000/user/partof/" + groupId,
      })
        .then((res) => {
          setUsers(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getGroup();
    getUsers();
  });

  usersElement = generateUsersElement();

  if (group) {
    return (
      <div>
        <Navbar />
        <div>
          <GroupDisplay
            otherDisplay={true}
            logo={group.name}
            moto={group.moto}
            name={group.name}
          />
        </div>
        <div></div>
      </div>
    );
  } else {
    return <Navbar />;
  }

  function generateUsersElement() {
    if (users) {
      return (
        <div>
          {users.map((user) => {
            return (
              <div>
                <UserElement
                  username={user.name}
                  profilePicture={user.imageUrl}
                />
              </div>
            );
          })}
        </div>
      );
    } else {
      return <Text text="No user has joined this group yet!" />;
    }
  }
}
