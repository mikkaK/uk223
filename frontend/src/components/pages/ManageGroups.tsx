import api from "../../config/Api";
import Navbar from "../Atoms/Navbar";
import React, { useEffect, useState } from "react";
import { Group } from "../../types/Database/Group";
import { GroupDisplay } from "../Molecules/GroupDisplay";
import { Link } from "react-router-dom";
import { Text } from "../Atoms/Text";
export default function ManageGroups() {
  const [groups, setGroups] = useState<[Group]>();
  useEffect(() => {
    //Gets the group using the id
    const getGroups = async function () {
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
  let groupsElement = generateGroupsElement();
  return (
    <div>
      <Navbar />
      <Link to={"/add/group"}>Add a new Group</Link>
      {groupsElement}
    </div>
  );

  function updateGroup(groupId: string) {}

  function addNewGroup() {}

  function generateGroupsElement() {
    if (groups) {
      return groups.map((value: Group, index: Number) => {
        return (
          <div style={flex}>
            <div>
              <button onClick={() => updateGroup(value.id)}>
                Edit: {value.name}
              </button>
            </div>
            <div>
              <GroupDisplay
                name={value.name}
                moto={value.moto}
                logo={value.imageUrl}
              />
            </div>
          </div>
        );
      });
    } else {
      return <Text text="No existing groups found" />;
    }
  }
  const flex: React.CSSProperties = {
    display: "flex",
  };
}
