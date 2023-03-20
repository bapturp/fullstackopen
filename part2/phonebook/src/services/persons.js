import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  return axios(baseUrl).then((response) => response.data);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const personsService = {
  getAll,
  create,
  update,
  remove,
};

export default personsService;
