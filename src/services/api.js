import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', 
});

export const getTodosPets = async () => {
  const response = await api.get('/pets');
  return response.data;
};

export const getResponsavelPorId = async (id) => {
  const response = await api.get(`/responsaveis/${id}`);
  return response.data;
};

export default api;
