import axios from "axios";

export const AuthService = {
   login: async (username = "", password = "") =>
      axios.post("/auth/login", null, {
         withCredentials: true,
         params: {
            username,
            password,
         },
      }),
};
