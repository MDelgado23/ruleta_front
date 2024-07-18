export interface RoulettePrize {
  id: number;
  prize: Prize;
  probability: number;
}

export interface Prize {
  id: number;
  name: string;
  value: number;
}

export interface SelectedPrize {
  prizeId: number;
  probability: number;
}

export interface Roulette {
  id: number;
  name: string;
  description: string;
  prizes: RoulettePrize[];
}
