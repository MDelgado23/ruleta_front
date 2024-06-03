import api from './api';

export const getPrizes = async () => {
  const response = await api.get('/prizes');
  return response.data;
};

export const createPrize = async (prize) => {
  const response = await api.post('/prizes', prize);
  return response.data;
};
