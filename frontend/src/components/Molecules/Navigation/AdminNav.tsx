import { Link } from "react-router-dom";

export default function AdminNav() {
  return (
    <div style={style}>
      <dl>
        <dt>User</dt>
        <dd>
          - <Link to={"/admin/user"}>Manage Users</Link>
        </dd>
        <dt>Group</dt>
        <dd>
          - <Link to={"/admin/group"}>Manage Groups</Link>
        </dd>
      </dl>
    </div>
  );
}

const style: React.CSSProperties = {
  color: "white",
};
