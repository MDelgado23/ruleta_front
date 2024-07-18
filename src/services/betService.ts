import api from './api';
import { Bet } from '../types/bet';

export const getBets = async (): Promise<Bet[]> => {
  const response = await api.get('/bets');
  return response.data;
};

export const createBet = async (bet: { amount: number; userId: number; rouletteId: number }): Promise<Bet> => {
  const response = await api.post('/bets', bet);
  return response.data;
};
