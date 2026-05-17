import api from "./api";

const authService = {
  // Register new user
  register: async (name, email, password) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  },
  login: async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  },
  getMe: async () => {
    const response = await api.get("auth/me");
    return response.data;
  },
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await api.post("/upload/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  updateProfile: async (data) => {
    const response = await api.put("/auth/profile", data);
    return response.data;
  },
  googleLogin: async (accessToken) => {
    const response = await api.post("/auth/google", { accessToken });
    return response.data;
  },
};

export default authService;
