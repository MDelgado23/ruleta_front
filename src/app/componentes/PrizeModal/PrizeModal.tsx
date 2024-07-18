import React from 'react';
import styles from './PrizeModal.module.css';

interface PrizeModalProps {
  prizeName: string;
  onClose: (event: React.MouseEvent) => void;
}

const PrizeModal: React.FC<PrizeModalProps> = ({ prizeName, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Ganaste: {prizeName}</h2>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default PrizeModal;
