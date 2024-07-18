import api from './api';

export const getBets = async () => {
  const response = await api.get('/bets');
  return response.data;
};

export const createBet = async (bet) => {
  const response = await api.post('/bets', bet);
  return response.data;
};
