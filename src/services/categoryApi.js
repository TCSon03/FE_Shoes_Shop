import api from "./index";

export const createCate = (data) => api.post("/cate/create-cate", data);

export const getAllCate = (page = 1, limit = 5, search = "") => {
  return api.get("/cate", {
    params: {
      page,
      limit,
      search,
    },
  });
};

export const getCateById = (id) => api.get(`/cate/${id}`);

export const updateCate = (id, data) =>
  api.put(`/cate/update-cate/${id}`, data);

export const softDeleteCate = (id) => api.delete(`/cate/sort-cate/${id}`);

export const getSoftDeletedCates = () => api.get("/cate/get-soft");

export const restoreCate = (id) => api.put(`/cate/restore-cate/${id}`);

export const hardDeleteCate = (id) => api.delete(`/cate/delete-cate/${id}`);
