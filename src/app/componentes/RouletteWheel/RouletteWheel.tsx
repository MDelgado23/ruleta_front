'use client';
import React, { useEffect, useState } from 'react';
import styles from './RouletteWheel.module.css';

interface Prize {
  id: number;
  name: string;
}

interface RouletteWheelProps {
  prizes: Prize[];
  angle: number;
  onSpin: () => void;
}

const RouletteWheel: React.FC<RouletteWheelProps> = ({ prizes, angle, onSpin }) => {
  const [rotationAngle, setRotationAngle] = useState(angle);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (angle !== rotationAngle) {
      console.log(`Starting spin: setting rotationAngle to ${angle}`);
      setIsSpinning(true);
      setRotationAngle(angle);
      setTimeout(() => {
        console.log('Ending spin');
        setIsSpinning(false);
      }, 3000); // Duración de la animación en milisegundos
    }
  }, [angle]);

  return (
    <div className={styles.rouletteContainer}>
      <div className={styles.roulettePointer}></div>
      <div
        className={`${styles.rouletteWheel} ${isSpinning ? styles.spinning : ''}`}
        style={{ transform: `rotate(${rotationAngle}deg)` }}
      >
        {prizes.map((prize, index) => (
          <div
            key={prize.id}
            className={styles.segment}
            style={{
              transform: `rotate(${index * (360 / prizes.length)}deg)`,
              backgroundColor: `hsl(${index * (360 / prizes.length)}, 100%, 75%)`,
            }}
          >
            <span className={styles.label}>{prize.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouletteWheel;
