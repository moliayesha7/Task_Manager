import http from "../http-common";

const getAll = () => {
  return http.get("/list");
};

const get = id => {
  return http.get(`/list/${id}`);
};

const create = data => {
  return http.post("/create", data);
};

const update = ( data) => {
  return http.post(`/update`, data);
};

const remove = (id) => {
  return http.post(`/delete`,id);
};

const getAllUser = () => {
    return http.get("/listusers");
  };

const TaskService = {
  getAll,
  get,
  create,
  update,
  remove,
  getAllUser
};

export default TaskService;
