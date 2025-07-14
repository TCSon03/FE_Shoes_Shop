import api from "./index";

export const createBrand = (data) => api.post("/brand/create-brand", data);

export const getAllBrand = (page = 1, limit = 5, search = "") => {
  return api.get("/brand", {
    params: {
      page,
      limit,
      search,
    },
  });
};

export const getBrandById = (id) => api.get(`/brand/${id}`);

export const updateBrand = (id, data) =>
  api.put(`/brand/update-brand/${id}`, data);

export const softDeleteBrand = (id) => api.delete(`/brand/sort-brand/${id}`);

export const getSoftDeletedBrands = (page = 1, limit = 5, search = "") => {
  return api.get("/brand/get-soft", {
    params: {
      page,
      limit,
      search,
    },
  });
};

export const restoreBrand = (id) => api.put(`/brand/restore-brand/${id}`);

export const hardDeleteBrand = (id) => api.delete(`/brand/delete-brand/${id}`);
