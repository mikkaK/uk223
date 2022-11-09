import { Group } from "../../types/Database/Group";
import api from "../../config/Api";
import React, { useEffect, useState } from "react";
import { GroupDisplay } from "../Molecules/GroupDisplay";
import { useParams } from "react-router-dom";
import { User } from "../../types/Database/User";
import { Text } from "../Atoms/Text";
import { UserDisplay } from "../Molecules/UserDisplay";
import Navbar from "../Molecules/Navigation/Navbar";
import { number } from "prop-types";

export function GroupInspect() {
  let { groupId } = useParams();
  const [group, setGroup] = useState<Group>();
  const [users, setUsers] = useState<User[]>();
  const [page, setPage] = useState<number>(1);
  const [imagesPerPage, setImagesPerPage] = useState<number>(10);
  let usersElement;
  const getGroup = async function () {
    api({
      method: "GET",
      url:
        "http://localhost:8080/group/members" +
        groupId +
        "?page=" +
        (page - 1) +
        "&size=" +
        imagesPerPage,
    })
      .then((res) => {
        setGroup({
          id: res.data.id,
          groupName: res.data.groupName,
          groupMotto: res.data.groupMotto,
          groupLogo: res.data.groupLogo,
        });
        setUsers(res.data.members);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getGroup();
  }, []);
  useEffect(() => {
    getGroup();
  }, [page, imagesPerPage]);

  usersElement = generateUsersElement();

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
    return <Navbar />;
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