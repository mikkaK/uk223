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

  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/group"} element={<GroupUserPage />} />
      <Route
        path={"/admin/group"}
        element={<PrivateRoute authorities={[]} element={<ManageGroups />} />}
      />
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

export default Router;
