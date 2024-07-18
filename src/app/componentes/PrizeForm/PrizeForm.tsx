'use client';

import React, { useState, useEffect } from 'react';
import { getPrizes, createPrize, updatePrize, deletePrize } from '../../../services/prizeService';
import { Prize } from '../../../types/prize';
import Modal from '../Modal/Modal';
import PrizeSelector from '../PrizeSelector/PrizeSelector';
import styles from './PrizeForm.module.css';

const PrizeForm: React.FC = () => {
  const [name, setName] = useState('');
  const [value, setValue] = useState<number | ''>('');
  const [message, setMessage] = useState<string | null>(null);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [editingPrize, setEditingPrize] = useState<Prize | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [isNewPrize, setIsNewPrize] = useState<boolean>(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name === '' || value === '') {
      setMessage('Please fill out all fields.');
      return;
    }

    const newPrize: Omit<Prize, 'id' | 'createdAt' | 'updatedAt'> = {
      name,
      value: Number(value),
    };

    try {
      if (editingPrize) {
        await updatePrize(editingPrize.id, newPrize);
        setMessage('Prize updated successfully!');
        setEditingPrize(null);
      } else {
        await createPrize(newPrize);
        setMessage('Prize created successfully!');
      }

      const prizesData = await getPrizes();
      setPrizes(prizesData);

      setName('');
      setValue('');
      if (!editingPrize) {
        setShowEditModal(false);
      }
    } catch (error) {
      console.error('Error creating/updating prize:', error);
      setMessage('Failed to create/update prize.');
    }
  };

  const handleEdit = (prize: Prize) => {
    setEditingPrize(prize);
    setName(prize.name);
    setValue(prize.value);
    setShowEditModal(true);
    setIsNewPrize(false);
  };

  const handleDelete = async (prize: Prize) => {
    try {
      await deletePrize(prize.id);
      setMessage('Prize deleted successfully!');

      const prizesData = await getPrizes();
      setPrizes(prizesData);
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        alert('Cannot delete prize that is part of a roulette');
      } else {
        console.error('Error deleting prize:', error);
        setMessage('Failed to delete prize.');
      }
    }
  };

  const handleCreateNewPrize = () => {
    setEditingPrize(null);
    setName('');
    setValue('');
    setShowEditModal(true);
    setIsNewPrize(true);
  };

  return (
    <div>
      <h2>Premios existentes</h2>
      <PrizeSelector prizes={prizes} onSelect={handleEdit} onDelete={handleDelete} />
      <button onClick={handleCreateNewPrize} className={styles.button}>Crear nuevo premio</button>
      {message && <p>{message}</p>}

      {showEditModal && (
        <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
          <h2>{isNewPrize ? 'Crear nuevo premio' : 'Editar premio'}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="value">Valor:</label>
              <input
                type="number"
                id="value"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              />
            </div>
            <button type="submit" className={styles.button}>{isNewPrize ? 'Guardar' : 'Actualizar'}</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default PrizeForm;
