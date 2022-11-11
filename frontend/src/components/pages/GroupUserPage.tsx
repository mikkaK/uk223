import api from "../../config/Api";
import React, { useEffect, useState } from "react";
import { ActiveButton } from "../Atoms/ActiveButton";
import { GroupDisplay } from "../Molecules/GroupDisplay";
import { User } from "../../types/Database/User";
import { Group } from "../../types/Database/Group";
import { TOKEN_LOCAL_STORAGE_KEY } from "../../Contexts/ActiveUserContext";
import { decode } from "jsonwebtoken";
import Navbar from "../Molecules/Navigation/Navbar";
import { useNavigate } from "react-router-dom";

//Displays all groups and lets the user switch in which group he is in
export function GroupUserPage() {
  const [groups, setGroups] = useState<Group[]>();
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  useEffect(() => {
    //gets all groups
    const getGroups = async function () {
      api({
        method: "GET",
        url: "http://localhost:8080/group",
      })
        .then((res) => {
          setGroups(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    //gets the logged in user
    const getUser = async function () {
      api({
        method: "GET",
        url: "http://localhost:8080/user/" + getUserId(),
      })
        .then((res) => {
          if (typeof res.data == "string") {
            navigate("/login");
          } else {
            setUser(res.data);
          }
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
                  isActive={group.id === user.group?.id}
                  onClick={() => changeSubscription(group.id!)}
                />
              </div>
              <div>
                <a style={removeATagStyle} href={"/group/" + group.id}>
                  <GroupDisplay
                    name={group.groupName}
                    motto={group.groupMotto}
                    logo={group.groupLogo}
                  />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <></>;
  }

  //changes the current group subscription of the user
  function changeSubscription(newgroup: string | null) {
    //sets the new group to null if the user is allready in the group
    //this allows the user to leave the group
    if (newgroup === user?.group?.id!) {
      newgroup = null;
    }

    let userCopy: User = {
      firstName: user?.firstName!,
      lastName: user?.lastName!,
      email: user?.email!,
      id: user?.id!,
      group: { id: newgroup },
    };

    api({
      method: "PUT",
      url: "http://localhost:8080/user/",
      data: {
        userId: user?.id,
        groupId: newgroup,
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

//gets the user id from the token
function getUserId() {
  const bearerToken = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  const token = bearerToken?.split(" ")[1];
  const decodedToken = decode(token!);
  return decodedToken?.sub;
}

const buttonSize: React.CSSProperties = {
  width: "3.5vw",
};

const flex: React.CSSProperties = {
  display: "flex",
  marginBottom: "0.3vh",
};

const removeATagStyle: React.CSSProperties = {
  color: "inherit",
  textDecoration: "inherit",
};
