import api from "../../config/Api";
import { useEffect, useState } from "react";
import { User } from "../../types/Database/User";
import { Group } from "../../types/Database/Group";
import { UserDisplay } from "../Molecules/UserDisplay";
import AdminPageNav from "../Organism/AdminPageNav";
import EditUser from "../Organism/EditUser";

//Page where an admin can view and edit limit userdata.
export function UserList() {
  const [users, setUsers] = useState<User[]>();
  const [groupMap, setGroupMap] = useState<Map<string, Group>>();
  const [input, setInput] = useState<Number | String>("");

  let inputElement = generateInputElement();

  useEffect(() => {
    const getGroups = async function () {
      api({
        method: "GET",
        url:  `${process.env.REACT_APP_BASEURL}/group`,
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
        <div>{inputElement}</div>
        <div style={flex}>
          {users.map((user: User, index: Number) => {
            return (
              <div style={displayContainer} onClick={() => setInput(index)}>
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

  function quitInput() {
    setInput("");
  }

  async function getUsers() {
    api({
      method: "GET",
      url:  `${process.env.REACT_APP_BASEURL}/user`,
    })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function generateInputElement() {
    if (users && typeof input == "number") {
      return (
        <EditUser user={users[input]} quit={quitInput} reload={getUsers} />
      );
    }
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
