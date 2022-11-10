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
  const [page, setPage] = useState<number>(1);
  const [imagesPerPage, setImagesPerPage] = useState<number>(10);
  const [errorOccured, setErrorHasOccured] = useState(false);
  let usersElement;
  let errorElement;
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
      })
      .catch((e) => {
        console.log(e);
        setErrorHasOccured(true);
      });
  };

  const getUsers = async function () {
    api({
      method: "GET",
      url:
        "http://localhost:8080/group/members/" +
        groupId +
        "?page=" +
        (page - 1) +
        "&size=" +
        imagesPerPage,
    })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => {
        console.log(e);
        setErrorHasOccured(true);
      });
  };
  useEffect(() => {
    getGroup();
    getUsers();
  }, []);
  useEffect(() => {
    getUsers();
  }, [page, imagesPerPage]);

  usersElement = generateUsersElement();
  errorElement = <div>Error has occured</div>;
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
        <input
          style={pageStyle}
          type="number"
          value={imagesPerPage + ""}
          onChange={(e) => changeNumOfImages(Number.parseInt(e.target.value))}
        />
        <div>
          <button onClick={decrementPage}>&lt;--</button>
          <input style={pageStyle} type="number" value={page} />
          <button onClick={incrementPage}>--&gt;</button>
        </div>
        <div>{usersElement}</div>
      </div>
    );
  } else {
    return (
      <>
        <Navbar />
        {errorElement}
      </>
    );
  }
  function decrementPage() {
    if (page !== 1) {
      setPage(page - 1);
    }
  }

  function incrementPage() {
    setPage(page + 1);
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
  function changeNumOfImages(newImageNumber: number) {
    setImagesPerPage(newImageNumber);
  }
}

const pageStyle: React.CSSProperties = {
  width: "5vw",
};
