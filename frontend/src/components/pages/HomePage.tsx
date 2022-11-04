import axios from "axios";
import api from "../../config/Api";
import { TOKEN_LOCAL_STORAGE_KEY } from "../../Contexts/ActiveUserContext";
import Navbar from "../Atoms/Navbar";

export default function HomePage() {
  return (
    <div>
      <Navbar />
    </div>
  );
}
