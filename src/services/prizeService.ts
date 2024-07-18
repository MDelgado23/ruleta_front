import api from './api';
import { Prize } from '../types/prize';

export const getPrizes = async (): Promise<Prize[]> => {
  const response = await api.get('/prizes');
  return response.data;
};

export const createPrize = async (prize: Omit<Prize, 'id' | 'createdAt' | 'updatedAt'>): Promise<Prize> => {
  const response = await api.post('/prizes', prize);
  return response.data;
};

export const updatePrize = async (id: number, prize: Partial<Omit<Prize, 'createdAt' | 'updatedAt'>>): Promise<Prize> => {
  const response = await api.put(`/prizes/${id}`, prize);
  return response.data;
};

export const deletePrize = async (id: number): Promise<void> => {
  try {
    await api.delete(`/prizes/${id}`);
  } catch (error: any) {
    if (error.response && error.response.status === 409) {
      throw new Error('Cannot delete prize that is part of a roulette');
    }
    throw error;
  }
};
