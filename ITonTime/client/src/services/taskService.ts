import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/tasks'
});

export const getTasks = () => api.get('/');
export const createTask = (task: any) => api.post('/', task);
export const updateTask = (id: string, task: any) => api.put(`/${id}`, task);
export const deleteTask = (id: string) => api.delete(`/${id}`);