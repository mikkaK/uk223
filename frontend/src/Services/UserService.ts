import api from "../config/Api";
import { User } from "../types/models/User.model";

const UserService = {
  getUser: (id: string) => {
    return api.get(`/user/${id}`);
  },
  updateUser: (user: User) => {
    return api.put(`/user/${user.id}`, user);
  },

  addUser: (user: User) => {
    return api.post("/user/", user).then((res) => {
      return res.data;
    });
  },
  addAllUsers: (users: User[]) => {
    return api.post("/user/list", users);
  },
  getAllUsers: () => {
    return api.get(`/user`);
  },

  deleteUser: (id: string) => {
    return api.delete(`/user/${id}`);
  },

  getUserByID: async (userID: string): Promise<User> => {
    const { data } = await api.get<User>(`/user/${userID}`);
    return data;
  },
};

export default UserService;
