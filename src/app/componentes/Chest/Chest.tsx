'use client';
import React, { useState } from 'react';
import { createBet } from '../../../services/betService';
import styles from './Chest.module.css';
import PrizeModal from '../PrizeModal/PrizeModal';

const Chest: React.FC<{ selectedRouletteId: number | null }> = ({ selectedRouletteId }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [prizeName, setPrizeName] = useState<string | null>(null);

  const handleSpin = async () => {
    if (!selectedRouletteId || isSpinning) return;

    setIsSpinning(true);
    setTimeout(() => {
      setIsOpen(true);
    }, 2500); 

    setTimeout(async () => {
      setIsSpinning(false);
      try {
        const userId = localStorage.getItem('userId');
        const bet = {
          amount: 0,
          userId: Number(userId),
          rouletteId: selectedRouletteId,
        };
        const result = await createBet(bet);
        setPrizeName(result.prize.name);
      } catch (error) {
        console.error('Error creating bet:', error);
      }
    }, 3000); 
  };

  const handleCloseModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setPrizeName(null);
    setIsOpen(false);
  };

  return (
    <div className={styles.chestContainer} onClick={handleSpin}>
      <img
        src={isOpen ? '/images/open_chest.png' : '/images/closed_chest.png'}
        alt={isOpen ? 'Open Chest' : 'Closed Chest'}
        className={`${styles.chestImage} ${isSpinning ? styles.spinning : ''}`}
      />
      {prizeName && <PrizeModal prizeName={prizeName} onClose={handleCloseModal} />}
    </div>
  );
};

export default Chest;
