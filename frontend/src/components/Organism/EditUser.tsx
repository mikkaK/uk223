//Notes: Finished
import { Group } from "../../types/Database/Group";
import { useState, useEffect } from "react";
import { GroupDisplay } from "../Molecules/GroupDisplay";
import { TextInput } from "../Atoms/TextInput";
import api from "../../config/Api";
import { UserDisplay } from "../Molecules/UserDisplay";
import { User } from "../../types/Database/User";

interface Props {
  user: User;
  quit: () => void;
  reload: () => void;
}

export default function EditUser(props: Props) {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    setUser(undefined);
  }, [props]);

  if (props.user && !user) {
    setUser(props.user);
  }

  if (user) {
    return (
      <>
        <h1 style={white}>Edit user Here</h1>
        <UserDisplay
          username={user?.firstName + " " + user?.lastName}
          email={user?.email}
          userId={user?.id}
        />
        <TextInput
          label="First name"
          setText={modifyGroup}
          field={"firstName"}
          text={user?.firstName!}
        />
        <TextInput
          label="last Name"
          setText={modifyGroup}
          field={"lastName"}
          text={user?.lastName!}
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
    let url;

    method = "PUT";
    url = "http://localhost:8080/user/" + props.user.id;
    data = {
      id: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      group: user?.group?.id,
    };

    api({
      method: method,
      url: url,
      data: data,
    })
      .then((res) => {
        props.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function modifyGroup(newValue: string, field?: string) {
    let modifiedGroup: User = {
      id: user?.id,
      firstName: user?.firstName!,
      lastName: user?.lastName!,
      email: user?.email!,
    };
    if (modifiedGroup) {
      switch (field) {
        case "firstName":
          modifiedGroup.firstName = newValue;
          break;
        case "lastName":
          modifiedGroup.lastName = newValue;
          break;
      }
      setUser(modifiedGroup);
    }
  }
}

const flex: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const white: React.CSSProperties = {
  color: "white",
};
