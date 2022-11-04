//Notes: Finished
import { Group } from "../../types/Database/Group";
import { useState, useEffect } from "react";
import { GroupDisplay } from "../Molecules/GroupDisplay";
import { TextInput } from "../Atoms/TextInput";
import api from "../../config/Api";
import { TOKEN_LOCAL_STORAGE_KEY } from "../../Contexts/ActiveUserContext";
interface Props {
  group?: Group;
  quit: () => void;
}

export default function EditAddGroup(props: Props) {
  const [group, setGroup] = useState<Group>();
  useEffect(() => {
    console.log("state update editAddG");
    setGroup(undefined);
  }, [props]);

  if (props.group && !group) {
    setGroup(props.group);
  } else if (!group) {
    setGroup({ groupLogo: "", groupName: "", groupMotto: "" });
  }

  if (group) {
    return (
      <>
        <GroupDisplay
          logo={group.groupLogo}
          name={group.groupName}
          motto={group.groupMotto}
        />
        <TextInput
          label="Logo Url"
          setText={modifyGroup}
          field={"logo"}
          text={group.groupLogo}
        />
        <TextInput
          label="Group Name"
          setText={modifyGroup}
          field={"name"}
          text={group.groupName}
        />
        <TextInput
          label="Group Motto"
          setText={modifyGroup}
          field={"motto"}
          text={group.groupMotto}
        />
        <div style={flex}>
          <div>
            <button onClick={props.quit}>Quit</button>
          </div>
          <div>
            <button onClick={save}>Save</button>
          </div>
        </div>
      </>
    );
  } else {
    return <div>Error</div>;
  }

  function save() {
    let method;
    let data;
    if (props.group) {
      //is Editing group
      method = "PUT";
      data = {
        id: props.group.id,
        groupName: group?.groupName,
        groupLogo: group?.groupLogo,
        groupMotto: group?.groupMotto,
      };
    } else {
      //is adding group
      method = "POST";
      data = {
        groupName: group?.groupName,
        groupLogo: group?.groupLogo,
        groupMotto: group?.groupMotto,
      };
    }

    api({
      method: method,
      url: "http://localhost:8080/group",
      data: data,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function modifyGroup(newValue: string, field?: string) {
    let modifiedGroup: Group = {
      groupLogo: group?.groupLogo!,
      groupMotto: group?.groupMotto!,
      groupName: group?.groupName!,
    };
    if (modifiedGroup) {
      switch (field) {
        case "logo":
          modifiedGroup.groupLogo = newValue;
          break;
        case "motto":
          modifiedGroup.groupMotto = newValue;
          break;
        case "name":
          modifiedGroup.groupName = newValue;
          break;
      }
      setGroup(modifiedGroup);
    }
  }
}

const flex: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};
