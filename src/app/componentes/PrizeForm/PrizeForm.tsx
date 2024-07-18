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
        console.error('Error recuperando premios:', error);
      }
    };

    fetchPrizes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name === '' || value === '') {
      setMessage('Llena todos los campos.');
      return;
    }

    const newPrize: Omit<Prize, 'id' | 'createdAt' | 'updatedAt'> = {
      name,
      value: Number(value),
    };

    try {
      if (editingPrize) {
        await updatePrize(editingPrize.id, newPrize);
        setMessage('Premio actualizado correctamente!');
        setEditingPrize(null);
      } else {
        await createPrize(newPrize);
        setMessage('Premio creado correctamente!');
      }

      const prizesData = await getPrizes();
      setPrizes(prizesData);

      setName('');
      setValue('');
      if (!editingPrize) {
        setShowEditModal(false);
      }
    } catch (error) {
      console.error('Error creando/actualizando premio:', error);
      setMessage('Fallo la creacion/actualizacion del premio.');
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
      setMessage('Premio eliminado correctamente!');

      const prizesData = await getPrizes();
      setPrizes(prizesData);
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        alert('El premio es parte de un Chest, no se puede borrar');
      } else {
        console.error('Error borrando premio:', error);
        setMessage('El borrado del premio fallo.');
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
