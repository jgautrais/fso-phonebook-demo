import axios from "axios";
const baseURL = "https://json-server-jgs.glitch.me/fso_phonebook_persons/";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseURL, newObject);
  return request;
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseURL}${id}`);
  return request;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}${id}`, newObject);
  return request;
};

export default { getAll, create, deletePerson, update };