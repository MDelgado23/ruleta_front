import api from './api';

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const createUser = async (user:any) => {
  const response = await api.post('/users', user);
  return response.data;
};

export const iniciarSesion = async (credenciales:any) => {
  const response = await api.post('/auth/login', credenciales);
  return response.data;
};

export const updateUserRole = async (userId:any, role:any) => {
  const response = await api.patch(`/users/update-role/${userId}`, { role });
  return response.data;
};

export const getUserById = async (id:any) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUserCoins = async (userId:any, coins:any) => {
  const response = await api.patch(`/users/update-coins/${userId}`, { coins });
  return response.data;
};
