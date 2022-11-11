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

export function GroupUserPage() {
  const [groups, setGroups] = useState<Group[]>();
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  useEffect(() => {
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

  useEffect(() => {
    console.log("user changed");
  }, [user]);

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

  //note needs to be tested
  function changeSubscription(newgroup: string) {
    let url;
    let data;
    if (newgroup === user?.group?.id!) {
      url = "http://localhost:8080/user/" + user?.id;
      newgroup = "";
      data = {
        id: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
      };
    } else {
      url = "http://localhost:8080/user/";
      data = {
        userId: user?.id,
        groupId: newgroup,
      };
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
      url: url,
      data: data,
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
