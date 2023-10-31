import axios from "axios";

export const AuthService = {
   login: async ({ username = "", password = "" }) => {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      return axios.post("/auth/login", formData, {
         withCredentials: true,
         data: formData,
         headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
   },
};
