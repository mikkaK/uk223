import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/pages/LoginPage/LoginPage";
import ActiveUserContext, {
  TOKEN_LOCAL_STORAGE_KEY,
} from "../Contexts/ActiveUserContext";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../components/pages/HomePage";
import api from "../config/Api";
import { decode, Jwt } from "jsonwebtoken";
import { GroupUserPage } from "../components/pages/GroupUserPage";
import { GroupDisplay } from "../components/Molecules/GroupDisplay";
import { User } from "../types/Database/User";
import ManageGroups from "../components/pages/ManageGroups";

/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {
  //const { checkRole } = useContext(ActiveUserContext);

  /** navigate to different "home"-locations depending on Role the user have */

  const [user, setUser] = useState<User>({ imageUrl: "", name: "" });

  useEffect(() => {
    const getUser = async function () {
      api({
        method: "GET",
        url: "http://localhost:5000/user/" + getUserId(),
      })
        .then((res) => {
          setUser(res.data[0]);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getUser();
  });

  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route
        path={"/group"}
        element={<GroupUserPage setUser={setUser} user={user} />}
      />
      <Route path={"/test"} element={<ManageGroups />} />
      <Route
        path={"/users"}
        element={
          <PrivateRoute authorities={[]} element={<div>nothing here</div>} />
        }
      />
      <Route
        path="/users/:userId"
        element={
          <PrivateRoute
            authorities={[]}
            element={<div>nothing here</div>}
          ></PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute
            authorities={[]}
            element={<div>nothing here</div>}
          ></PrivateRoute>
        }
      />

      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

function getUserId() {
  const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  const decodedToken = decode(token!);
  return decodedToken?.sub;
}

export default Router;
