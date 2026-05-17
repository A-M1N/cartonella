import api from "./api";

const addressService = {
  getAddresses: async () => {
    const res = await api.get("/addresses");
    return res.data.addresses;
  },

  createAddress: async (data) => {
    const res = await api.post("/addresses", data);
    return res.data.address;
  },

  updateAddress: async ({ id, data }) => {
    const res = await api.put(`/addresses/${id}`, data);
    return res.data.address;
  },

  deleteAddress: async (id) => {
    await api.delete(`/addresses/${id}`);
  },
  setDefaultAddress: async (id) => {
    const res = await api.put(`/addresses/${id}`, { isDefault: true });
    return res.data.address;
  },
};
export default addressService;
