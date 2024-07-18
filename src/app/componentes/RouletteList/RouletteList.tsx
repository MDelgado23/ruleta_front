'use client';
import React, { useEffect, useState } from 'react';
import { getRoulettes } from '../../../services/rouletteService';
import { Roulette } from '../../../types/roulette';
import Chest from '../Chest/Chest';
import styles from './RouletteList.module.css';

const RouletteList: React.FC = () => {
  const [roulettes, setRoulettes] = useState<Roulette[]>([]);
  const [selectedRoulette, setSelectedRoulette] = useState<Roulette | null>(null);

  useEffect(() => {
    const fetchRoulettes = async () => {
      try {
        const data = await getRoulettes();
        setRoulettes(data);
      } catch (error) {
        console.error('Error fetching roulettes:', error);
      }
    };

    fetchRoulettes();
  }, []);

  const handleSelectRoulette = (roulette: Roulette) => {
    setSelectedRoulette(roulette);
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.rouletteList}>
        {roulettes.map((roulette) => (
          <div key={roulette.id} onClick={() => handleSelectRoulette(roulette)}>
            <h3>{roulette.name}</h3>
            {selectedRoulette && selectedRoulette.id === roulette.id && (
              <div className={styles.chestWrapper}>
                <Chest selectedRouletteId={selectedRoulette.id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouletteList;
