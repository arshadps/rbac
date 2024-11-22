import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getUsers = () => API.get("/users");
export const getRoles = () => API.get("/roles");
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const updateRole = (id, data) => API.put(`/roles/${id}`, data);
export const createUser = (data) => API.post("/users", data);
export const deleteUser = (id) => API.delete(`/users/${id}`);
