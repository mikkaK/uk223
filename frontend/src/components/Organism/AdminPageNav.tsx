import AdminNav from "../Molecules/Navigation/AdminNav";
import Navbar from "../Molecules/Navigation/Navbar";

//Full navbar used in admin pages
export default function AdminPageNav() {
  return (
    <div>
      <Navbar />
      <AdminNav />
    </div>
  );
}
