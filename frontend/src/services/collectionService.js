import api from "./api";

export const collectionService = {
  getCollections: async () => {
    const response = await api.get("/collections");
    return response.data;
  },
  getCollectionBySlug: async (slug) => {
    const response = await api.get(`collections/${slug}`);
    return response.data;
  },
};
