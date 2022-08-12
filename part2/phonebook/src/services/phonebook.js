import axios from "axios";
const baseUrl = "api/persons";

const getAll = () => axios.get(baseUrl).then((resp) => resp.data);

const create = (newObject) =>
  axios.post(baseUrl, newObject).then((resp) => resp.data);

const update = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject).then((resp) => resp.data);

const remove = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((resp) => resp.status);

export default { getAll, create, update, remove };
