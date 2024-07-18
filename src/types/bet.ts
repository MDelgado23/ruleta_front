import { Usuario } from './user';
import { Prize } from './prize';

export interface Bet {
  id: number;
  amount: number;
  createdAt: string; // or Date, depending on how you're handling dates
  user: Usuario;
  prize: Prize;
}
