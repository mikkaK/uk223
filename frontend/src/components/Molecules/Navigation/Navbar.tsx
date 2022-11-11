import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={flex}>
      <div style={useMaxWidth}>
        <Link to={"/Login"}>Login</Link>
      </div>
      <div style={useMaxWidth}>
        <Link to={"/group"}>Group</Link>
      </div>
      <div style={useMaxWidth}>
        <Link to={"/profile"}>Profile</Link>
      </div>
      <div style={useMaxWidth}>
        <Link to={"/admin"}>Admin</Link>
      </div>
    </div>
  );
}

const flex: React.CSSProperties = {
  display: "flex",
  boxShadow: "0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
  padding: "5px",
};
const useMaxWidth: React.CSSProperties = {
  width: "100%",
  textAlign: "center",
};
