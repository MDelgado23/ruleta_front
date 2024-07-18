import api from './api';
import { Roulette, RoulettePrize } from '../types/roulette';

interface CreateRouletteDto {
  name: string;
  description?: string;
  prizes: {
    prizeId: number;
    probability: number;
  }[];
}

interface UpdateRouletteDto {
  name: string;
  description?: string;
  prizes: {
    prizeId: number;
    probability: number;
  }[];
}

export const getRoulettes = async (): Promise<Roulette[]> => {
  const response = await api.get('/roulettes');
  return response.data;
};

export const createRoulette = async (roulette: CreateRouletteDto): Promise<Roulette> => {
  const response = await api.post('/roulettes', roulette);
  return response.data;
};

export const updateRoulette = async (id: number, roulette: UpdateRouletteDto): Promise<Roulette> => {
  const response = await api.put(`/roulettes/${id}`, roulette);
  return response.data;
};

export const deleteRoulette = async (id: number): Promise<void> => {
  await api.delete(`/roulettes/${id}`);
};
