import axios from "axios";
import api from "../../config/Api";
import { TOKEN_LOCAL_STORAGE_KEY } from "../../Contexts/ActiveUserContext";
import Navbar from "../Atoms/Navbar";

export default function HomePage() {
  console.log(localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY));
  axios({
    method: "GET",
    url: "http://localhost:8080/user",
    headers: {
      Authorization: localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY),
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
  return (
    <div>
      <Navbar />
    </div>
  );
}
