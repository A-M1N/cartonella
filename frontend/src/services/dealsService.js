import api from "../services/api.js";

const dealsService = {
  getDealOfDay: async () => {
    const response = await api.get("/deals/today");
    return response.data;
  },
};
export default dealsService;
