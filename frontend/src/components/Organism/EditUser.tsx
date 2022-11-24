import { useState, useEffect } from "react";
import { TextInput } from "../Atoms/TextInput";
import api from "../../config/Api";
import { UserDisplay } from "../Molecules/UserDisplay";
import { User } from "../../types/Database/User";

interface Props {
  user: User;
  quit: () => void;
  reload: () => void;
}

//Element that can edit a the user provided by the props
export default function EditUser(props: Props) {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    setUser(undefined);
  }, [props]);

  if (props.user && !user) {
    setUser(props.user);
  }

  //if the user is set show the edit screen
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
          setText={modifyUser}
          field={"firstName"}
          text={user?.firstName!}
        />
        <TextInput
          label="last Name"
          setText={modifyUser}
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

  //Edits the user specified in the props
  function save() {
    let method;
    let data;
    let url;

    method = "PUT";
    url = `http://${process.env.REACT_APP_BASEURL}/user/` + props.user.id;
    data = {
      id: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      group: { id: props.user.group?.id },
    };

    api({
      method: method,
      url: url,
      data: data,
    })
      .then((res) => {
        props.quit();
        props.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  //modifies the user indepth
  function modifyUser(newValue: string, field?: string) {
    let modifiedUser: User = {
      id: user?.id,
      firstName: user?.firstName!,
      lastName: user?.lastName!,
      email: user?.email!,
    };
    if (modifiedUser) {
      switch (field) {
        case "firstName":
          modifiedUser.firstName = newValue;
          break;
        case "lastName":
          modifiedUser.lastName = newValue;
          break;
      }
      setUser(modifiedUser);
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
