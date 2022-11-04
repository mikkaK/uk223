import api from "../../config/Api";
import React, { useEffect, useState } from "react";
import { Group } from "../../types/Database/Group";
import { GroupDisplay } from "../Molecules/GroupDisplay";
import { Text } from "../Atoms/Text";

import EditAddGroup from "../Organism/EditAddGroup";
import AdminPageNav from "../Organism/AdminPageNav";
export default function ManageGroups() {
  const [groups, setGroups] = useState<[Group]>();
  const [input, setInput] = useState("");
  useEffect(() => {
    getGroups();
  }, []);
  let groupsElement = generateGroupsElement();
  let inputElement = generateInputElement();
  return (
    <>
      <AdminPageNav />
      <div style={root}>
        <button onClick={() => openInputField("add")}>Add a new Group</button>
        <div style={flex}>
          <div>{groupsElement}</div>
          <div style={rightItem}>{inputElement}</div>
        </div>
      </div>
    </>
  );

  function generateGroupsElement() {
    if (groups) {
      return groups.map((value: Group, index: Number) => {
        return (
          <div style={flex}>
            <div>
              <button style={button} onClick={() => openInputField(value.id!)}>
                Edit: {value.groupName}
              </button>
              <br />
              <button style={button} onClick={() => deleteGroup(value.id!)}>
                Delete: {value.groupName}
              </button>
            </div>
            <div>
              <GroupDisplay
                name={value.groupName}
                motto={value.groupMotto}
                logo={value.groupLogo}
              />
            </div>
            <div></div>
          </div>
        );
      });
    } else {
      return <Text text="No existing groups found" />;
    }
  }

  function generateInputElement() {
    let group: Group = getGroupById(input)!;
    console.log("update input element");
    switch (input) {
      case "":
        return <></>;
      case "add":
        return <EditAddGroup quit={quitInput} reload={getGroups} />;
      default:
        return (
          <EditAddGroup group={group} quit={quitInput} reload={getGroups} />
        );
    }
  }
  function openInputField(target: string) {
    console.log("target:" + target);
    setInput(target);
  }

  function getGroupById(id: string): Group | undefined {
    if (groups) {
      for (let i = 0; i < groups.length; i++) {
        if (groups[i].id === id) {
          console.log("found");
          return groups[i];
        }
      }
    } else if (input !== "") {
      setInput("");
      return;
    }
  }
  function quitInput() {
    setInput("");
  }

  //Gets the group using the id
  async function getGroups() {
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
  }

  function deleteGroup(groupId: string) {
    api({
      method: "DELETE",
      url: "http://localhost:8080/group/" + groupId,
    })
      .then((res) => {
        getGroups();
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

const flex: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const button: React.CSSProperties = {
  width: "17.5vw",
  marginRight: "2vw",
};

const rightItem: React.CSSProperties = {
  marginLeft: "10vw",
};

const root: React.CSSProperties = {
  margin: "3vw",
};
