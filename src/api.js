import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/tasks';

export const getTasks = async () => {
  return axios.get(API_BASE_URL);
};

export const getTaskById = async (id) => {
  return axios.get(`${API_BASE_URL}?id=${id}`);
};

export const createOrUpdateTask = async (task) => {
  return axios.put(API_BASE_URL, task);
};

export const deleteTask = async (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};

export const searchTasksByName = async (name) => {
  return axios.get(`${API_BASE_URL}/search?name=${encodeURIComponent(name)}`);
};

export const executeTask = async (id) => {
  return axios.put(`${API_BASE_URL}/${id}/execute`);
};
