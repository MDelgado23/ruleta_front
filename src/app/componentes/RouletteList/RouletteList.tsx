'use client';
import React, { useEffect, useState } from 'react';
import { getRoulettes } from '../../../services/rouletteService';
import { createBet } from '../../../services/betService';
import { Roulette } from '../../../types/roulette';
import RouletteWheel from '../RouletteWheel/RouletteWheel';
import styles from './RouletteList.module.css';

const RouletteList: React.FC = () => {
  const [roulettes, setRoulettes] = useState<Roulette[]>([]);
  const [selectedRoulette, setSelectedRoulette] = useState<Roulette | null>(null);
  const [angle, setAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const fetchRoulettes = async () => {
      try {
        const data = await getRoulettes();
        console.log('Fetched roulettes:', data);
        setRoulettes(data);
      } catch (error) {
        console.error('Error fetching roulettes:', error);
      }
    };

    fetchRoulettes();
  }, []);

  const handleSelectRoulette = (roulette: Roulette) => {
    if (isSpinning) return; // No permitir re-selección durante el giro

    console.log('Selected roulette:', roulette);
    setSelectedRoulette(roulette);
    setAngle(0); // Reset the angle when a new roulette is selected
  };

  const handleSpin = async () => {
    if (!selectedRoulette) return;

    const newAngle = Math.floor(Math.random() * 360) + 360 * 5; 
    console.log('New angle for spin:', newAngle);
    setAngle(newAngle);
    setIsSpinning(true);
    setTimeout(async () => {
      setIsSpinning(false);
      console.log('Spin the roulette!');
      
      // Determinar el premio y registrar la apuesta
      try {
        const userId = localStorage.getItem('userId'); 
        const bet = {
          amount: 0, 
          userId: Number(userId),
          rouletteId: selectedRoulette.id,
        };
        const result = await createBet(bet);
        console.log('Bet result:', result);
        alert(`You won: ${result.prize.name}`);
      } catch (error) {
        console.error('Error creating bet:', error);
      }
    }, 3000); // Duración de la animación en milisegundos
  };

  return (
    <div className={styles.container}>
      <h2>Roulettes</h2>
      <div className={styles.rouletteList}>
        {roulettes.map((roulette) => (
          <div key={roulette.id} onClick={() => handleSelectRoulette(roulette)}>
            <h3>{roulette.name}</h3>
            {selectedRoulette && selectedRoulette.id === roulette.id && (
              <div>
                <RouletteWheel
                  prizes={selectedRoulette.prizes.map((rp) => rp.prize)}
                  angle={angle}
                  onSpin={handleSpin}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedRoulette && (
        <button className={styles.spinButton} onClick={handleSpin}>
          Spin Roulette
        </button>
      )}
    </div>
  );
};

export default RouletteList;
