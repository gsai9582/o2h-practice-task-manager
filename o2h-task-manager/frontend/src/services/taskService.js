import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export async function getTasks() {
  const res = await api.get('/tasks');
  return res.data;
}

export async function createTask(payload) {
  const res = await api.post('/tasks', payload);
  return res.data;
}

export async function updateTask(id, payload) {
  const res = await api.put(`/tasks/${id}`, payload);
  return res.data;
}

export async function deleteTask(id) {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
}

