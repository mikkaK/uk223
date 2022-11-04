import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/pages/LoginPage/LoginPage";

import PrivateRoute from "./PrivateRoute";
import HomePage from "../components/pages/HomePage";

import { GroupUserPage } from "../components/pages/GroupUserPage";

import ManageGroups from "../components/pages/ManageGroups";
import { GroupInspect } from "../components/pages/GroupInspect";
import { TOKEN_LOCAL_STORAGE_KEY } from "../Contexts/ActiveUserContext";
import AdminPageNav from "../components/Organism/AdminPageNav";
import { UserList } from "../components/pages/UserList";
/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {
  //const { checkRole } = useContext(ActiveUserContext);

  /** navigate to different "home"-locations depending on Role the user have */
  console.log(localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY));
  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/group"} element={<GroupUserPage />} />
      <Route path={"/group/:groupId"} element={<GroupInspect />} />
      //admin route
      <Route
        path={"/admin"}
        element={
          <PrivateRoute authorities={["DEFAULT"]} element={<AdminPageNav />} />
        }
      />
      <Route
        path={"/admin/group"}
        element={
          <PrivateRoute authorities={["DEFAULT"]} element={<ManageGroups />} />
        }
      />
      <Route
        path={"/admin/user"}
        element={
          <PrivateRoute authorities={["DEFAULT"]} element={<UserList />} />
        }
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
            authorities={["ADMIN"]}
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
