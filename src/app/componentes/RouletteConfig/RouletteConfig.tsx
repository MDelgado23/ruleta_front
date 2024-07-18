'use client';

import React, { useEffect, useState } from 'react';
import { getPrizes } from '../../../services/prizeService';
import { Prize } from '../../../types/prize';
import { SelectedPrize, Roulette } from '../../../types/roulette';

interface RouletteConfiguratorProps {
  onSave: (roulette: { id?: number; name: string; description: string; prizes: SelectedPrize[] }) => void;
  selectedRoulette?: { id?: number; name: string; description: string; prizes: SelectedPrize[] } | null;
}

const RouletteConfigurator: React.FC<RouletteConfiguratorProps> = ({ onSave, selectedRoulette }) => {
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [selectedPrizes, setSelectedPrizes] = useState<SelectedPrize[]>([]);
  const [rouletteName, setRouletteName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    const fetchPrizes = async () => {
      try {
        const prizesData = await getPrizes();
        setPrizes(prizesData);
      } catch (error) {
        console.error('Error fetching prizes:', error);
      }
    };

    fetchPrizes();
  }, []);

  useEffect(() => {
    if (selectedRoulette) {
      setRouletteName(selectedRoulette.name);
      setDescription(selectedRoulette.description || '');
      setSelectedPrizes(selectedRoulette.prizes);
    }
  }, [selectedRoulette]);

  const handlePrizeSelectionChange = (prizeId: number, isChecked: boolean) => {
    if (isChecked) {
      const addedPrize = prizes.find(prize => prize.id === prizeId);
      if (addedPrize) {
        setSelectedPrizes(prevSelectedPrizes => {
          const newSelectedPrizes = [...prevSelectedPrizes, { prizeId: addedPrize.id, probability: 0 }];
          return calculateProbabilities(newSelectedPrizes);
        });
      }
    } else {
      setSelectedPrizes(prevSelectedPrizes => {
        const newSelectedPrizes = prevSelectedPrizes.filter(p => p.prizeId !== prizeId);
        return calculateProbabilities(newSelectedPrizes);
      });
    }
  };

  const calculateProbabilities = (selectedPrizes: SelectedPrize[]) => {
    const probability = 100 / selectedPrizes.length;
    return selectedPrizes.map(prize => ({
      ...prize,
      probability,
    }));
  };

  const handleSave = () => {
    const rouletteData = {
      id: selectedRoulette?.id, 
      name: rouletteName,
      description,
      prizes: selectedPrizes,
    };
    console.log('Roulette data to save:', rouletteData);
    onSave(rouletteData);
  };

  return (
    <div>
      <h2>Create or Edit a Roulette</h2>
      <input
        type="text"
        placeholder="Roulette Name"
        value={rouletteName}
        onChange={(e) => setRouletteName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <h3>Select Prizes</h3>
      {prizes.map((prize) => (
        <div key={prize.id}>
          <label>
            <input
              type="checkbox"
              checked={selectedPrizes.some(p => p.prizeId === prize.id)}
              onChange={(e) => handlePrizeSelectionChange(prize.id, e.target.checked)}
            />
            {prize.name}
          </label>
        </div>
      ))}
      <button onClick={handleSave}>Save Roulette</button>
    </div>
  );
};

export default RouletteConfigurator;
