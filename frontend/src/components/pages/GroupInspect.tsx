import { Group } from "../../types/Database/Group";
import api from "../../config/Api";
import React, { useEffect, useState } from "react";
import { GroupDisplay } from "../Molecules/GroupDisplay";
import { useParams } from "react-router-dom";
import { User } from "../../types/Database/User";
import { Text } from "../Atoms/Text";
import { UserDisplay } from "../Molecules/UserDisplay";
import Navbar from "../Molecules/Navigation/Navbar";

export function GroupInspect() {
  let { groupId } = useParams();
  const [group, setGroup] = useState<Group>();
  const [users, setUsers] = useState<User[]>();
  let usersElement;
  useEffect(() => {
    //Gets the group using the id
    const getGroup = async function () {
      api({
        method: "GET",
        url: "http://localhost:8080/group/" + groupId,
      })
        .then((res) => {
          setGroup({
            id: res.data.id,
            groupName: res.data.groupName,
            groupMotto: res.data.groupMotto,
            groupLogo: res.data.groupLogo,
          });
          setUsers(res.data.members);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getGroup();
  }, []);

  usersElement = generateUsersElement();

  if (group) {
    return (
      <div>
        <Navbar />
        <div>
          <GroupDisplay
            otherDisplay={true}
            logo={group.groupLogo}
            motto={group.groupMotto}
            name={group.groupName}
          />
        </div>
        <div>{usersElement}</div>
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
                <UserDisplay username={user.firstName + " " + user.lastName} />
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
