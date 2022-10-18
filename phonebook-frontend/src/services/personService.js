import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data)
};

const create = newEntry => {
  const request = axios.post(baseUrl, newEntry);
  return request.then(response => response.data);
}

const update = (id, newEntry) => {
  console.log(newEntry)
  const request = axios.put(`${baseUrl}/${id}`, newEntry);
  return request.then(response => request.then(response.data));
}

const del = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => request.then(response.data));
}

export default {getAll, create, update, del};
