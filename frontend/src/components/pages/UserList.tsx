import api from "../../config/Api";
import { useEffect, useState } from "react";
import { User } from "../../types/Database/User";
import { Group } from "../../types/Database/Group";
import { UserDisplay } from "../Molecules/UserDisplay";
import AdminPageNav from "../Organism/AdminPageNav";

export function UserList() {
  const [users, setUsers] = useState<User[]>();
  const [groupMap, setGroupMap] = useState<Map<string, Group>>();

  useEffect(() => {
    const getUsers = async function () {
      api({
        method: "GET",
        url: "http://localhost:8080/user",
      })
        .then((res) => {
          setUsers(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const getGroups = async function () {
      api({
        method: "GET",
        url: "http://localhost:8080/group",
      })
        .then((res) => {
          let map = new Map<string, Group>();
          res.data.forEach((group: Group) => {
            map.set(group.id!, group);
          });
          setGroupMap(map);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    getGroups();
    getUsers();
  }, []);

  if (users) {
    return (
      <div>
        <AdminPageNav />
        <div style={flex}>
          {users.map((user: User, index: Number) => {
            return (
              <div style={displayContainer}>
                <UserDisplay
                  username={user.firstName + " " + user.lastName}
                  userId={user.id}
                  email={user.email}
                  group={groupMap?.get(user.group?.id!)?.groupName}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

const flex: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  gap: "10px",
  flex: 4,
};

const displayContainer: React.CSSProperties = {
  marginBottom: "2vh",
};
