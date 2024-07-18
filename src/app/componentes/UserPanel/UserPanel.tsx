'use client';

import React, { useEffect, useState } from 'react';
import withAuth from '../../hoc/withAuth';
import BotonCerrarSesion from '../logoutbtn/logoutbtn';
import styles from './UserPanel.module.css';
import { useRouter } from 'next/navigation';
import { getUserById } from '../../../services/userService';
import Modal from '../Modal/Modal';
import RouletteList from '../RouletteList/RouletteList'; 
import { Roulette } from '../../../types/roulette';
import { getRoulettes } from '../../../services/rouletteService';

const PaginaUsuarios = () => {
  const [userRole, setUserRole] = useState<string>('');
  const [coins, setCoins] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showRouletteModal, setShowRouletteModal] = useState<boolean>(false);
    const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId');
    if (role) {
      setUserRole(role);
    } else {
      setUserRole('user'); 
    }
    
    if (userId) {
      getUserById(userId)
        .then(response => {
          if (response && response.coins) {
            setCoins(response.coins); 
          } else {
            console.error('No se encontraron monedas en la respuesta:', response);
          }
        })
        .catch(error => {
          console.error('Error al obtener los datos del usuario:', error);
        });
    }
  }, []);

  
  const handleBackClick = () => {
    console.log('Back button clicked');
    // falta implementar lógica para volver a la página anterior
  };

  const handleAdmBtn = () => {
    router.push('/admin')
  }

  const handleJugarClick = () => {
    setShowRouletteModal(true);
  };

  return (
    <div className={styles.supercontainer}>
      <div className={styles.container}>
        <button className={styles.backButton} onClick={handleBackClick}>
          <span>&#x2190;</span>
        </button>
        <div className={styles.navbar}>
        <button>{`Mis monedas: ${coins}`}</button>
          <button>+</button>
          {userRole === 'admin' && <button onClick={handleAdmBtn}>ADM PANEL</button>} {/* Botón solo para admins */}
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleJugarClick}>JUGAR</button>
          <button className={styles.button}>RECARGAR MONEDAS</button>
          <button className={styles.button}>HISTORIAL DE PREMIOS</button>
          <button className={styles.button} style={{ backgroundColor: '#FF6347' }}>PRÓXIMAMENTE</button>
        </div>
        <BotonCerrarSesion />
      </div>

      {showRouletteModal && (
        <Modal isOpen={showRouletteModal} onClose={() => setShowRouletteModal(false)}>
          <RouletteList />
        </Modal>
      )}
    </div>
  );
};

export default withAuth(PaginaUsuarios, ['user', 'admin']);
