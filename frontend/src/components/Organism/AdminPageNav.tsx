import { Link } from "react-router-dom";
import AdminNav from "../Molecules/Navigation/AdminNav";
import Navbar from "../Molecules/Navigation/Navbar";

export default function AdminPageNav() {
  return (
    <div>
      <Navbar />
      <AdminNav />
    </div>
  );
}
