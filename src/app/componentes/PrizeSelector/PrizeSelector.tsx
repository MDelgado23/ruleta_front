import React, { useState, useEffect } from 'react';
import { Prize } from '../../../types/prize';
import styles from './PrizeSelector.module.css';

interface PrizeSelectorProps {
  prizes: Prize[];
  onSelect: (prize: Prize) => void;
  onDelete: (prize: Prize) => void;
}

const PrizeSelector: React.FC<PrizeSelectorProps> = ({ prizes, onSelect, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);

  const filteredPrizes = prizes.filter((prize) =>
    prize.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Buscar premios"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredPrizes.length > 0 && (
        <ul className={styles.prizeList}>
          {filteredPrizes.map((prize) => (
            <li key={prize.id} onClick={() => setSelectedPrize(prize)}>
              {prize.name}
            </li>
          ))}
        </ul>
      )}
      {selectedPrize && (
        <div className={styles.selectedPrize}>
          <h3>Premio seleccionado: {selectedPrize.name}</h3>
          <button onClick={() => onSelect(selectedPrize)}>Editar</button>
          <button onClick={() => onDelete(selectedPrize)} style={{ backgroundColor: 'red', color: 'white' }}>Eliminar</button>
        </div>
      )}
    </div>
  );
};

export default PrizeSelector;
