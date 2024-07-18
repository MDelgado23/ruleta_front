// src/components/AdminPanel/AdminPanel.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { getUsers, updateUserRole, getUserById, updateUserCoins } from '../../../services/userService';
import withAuth from '../../hoc/withAuth';
import BotonCerrarSesion from '../logoutbtn/logoutbtn';
import { Usuario } from '../../../types/user';
import styles from './AdminPanel.module.css';
import { useRouter } from 'next/navigation';
import Modal from '../Modal/Modal';
import RouletteConfig from '../RouletteConfig/RouletteConfig';
import PrizeForm from '../PrizeForm/PrizeForm';
import BetList from '../BetList/BetList'; // Importa BetList
import { getRoulettes, createRoulette, updateRoulette, deleteRoulette } from '../../../services/rouletteService';
import { Roulette, SelectedPrize } from '../../../types/roulette';

const PanelAdministrador = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<string>('');
  const [nuevoRol, setNuevoRol] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');
  const [coins, setCoins] = useState<number>(0);
  const [showRolesModal, setShowRolesModal] = useState<boolean>(false);
  const [showCoinsModal, setShowCoinsModal] = useState<boolean>(false);
  const [showRouletteModal, setShowRouletteModal] = useState<boolean>(false);
  const [showBetListModal, setShowBetListModal] = useState<boolean>(false); // Estado para manejar el modal de BetList
  const [nuevoCoins, setNuevoCoins] = useState<number>(0);
  const [selectedRoulette, setSelectedRoulette] = useState<{ id?: number; name: string; description: string; prizes: SelectedPrize[] } | null>(null);
  const [roulettes, setRoulettes] = useState<Roulette[]>([]);
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

    fetchRoulettes();
    fetchUsers();
  }, []);

  const fetchRoulettes = async () => {
    try {
      const data = await getRoulettes();
      setRoulettes(data);
    } catch (error) {
      console.error('Error fetching roulettes:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsuarios(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSaveRoulette = async (rouletteData: { id?: number; name: string; description: string; prizes: SelectedPrize[] }) => {
    console.log('Saving roulette:', rouletteData);
    try {
      if (rouletteData.id) {
        await updateRoulette(rouletteData.id, rouletteData);
      } else {
        await createRoulette(rouletteData);
      }
      fetchRoulettes();
      setShowRouletteModal(false);
    } catch (error) {
      console.error('Error saving roulette:', error);
      alert('Failed to save roulette');
    }
  };

  const handleEditRoulette = (roulette: Roulette) => {
    setSelectedRoulette({
      id: roulette.id,
      name: roulette.name,
      description: roulette.description,
      prizes: roulette.prizes.map((prize) => ({
        prizeId: prize.prize.id,
        probability: prize.probability,
      })),
    });
    setShowRouletteModal(true);
  };

  const handleDeleteRoulette = async (id: number) => {
    try {
      await deleteRoulette(id);
      fetchRoulettes();
    } catch (error) {
      console.error('Error deleting roulette:', error);
      alert('Failed to delete roulette');
    }
  };

  const handleChangeRol = () => {
    if (usuarioSeleccionado && nuevoRol) {
      updateUserRole(usuarioSeleccionado, nuevoRol)
        .then(response => {
          alert('Rol actualizado correctamente');
          fetchUsers();
        })
        .catch(error => {
          console.error('Error al actualizar el rol:', error);
        });
    } else {
      alert('Por favor, seleccione un usuario y un rol.');
    }
  };

  const handleChangeCoins = () => {
    if (usuarioSeleccionado && nuevoCoins) {
      updateUserCoins(usuarioSeleccionado, nuevoCoins)
        .then(response => {
          alert('Cantidad de monedas actualizada correctamente');
          fetchUsers();
        })
        .catch(error => {
          console.error('Error al actualizar las monedas:', error);
        });
    } else {
      alert('Por favor, seleccione un usuario y una cantidad de monedas.');
    }
  };

  const handleRegistrosBtn = () => {
    setShowBetListModal(true); // Abre el modal de BetList
  };

  const handleBackClick = () => {
    console.log('Back button clicked');
    // falta implementar lógica para volver a la página anterior
  };

  const handleUsrBtn = () => {
    router.push('/user');
  };

  const handleRouletteEditBtn = () => {
    setSelectedRoulette(null);
    setShowRouletteModal(true);
  };

  const handleRolesClick = () => {
    fetchUsers();
    setShowRolesModal(true);
  };

  const handleCoinsClick = () => {
    fetchUsers();
    setShowCoinsModal(true);
  };

  const handleUsuarioSeleccionadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = e.target.value;
    setUsuarioSeleccionado(selectedUserId);

    const selectedUser = usuarios.find(user => user.id.toString() === selectedUserId);
    if (selectedUser) {
      setNuevoRol(selectedUser.role);
    }
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
          <button onClick={handleUsrBtn}>USR PANEL</button>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleRouletteEditBtn}>EDITAR RULETA</button>
          <button className={styles.button} onClick={handleCoinsClick}>EDITAR COINS</button>
          <button className={styles.button} onClick={handleRegistrosBtn}>REGISTROS</button>
          <button className={styles.button} style={{ backgroundColor: '#FF6347' }} onClick={handleRolesClick}>ROLES</button>
        </div>
        <BotonCerrarSesion />
      </div>

      {showRolesModal && (
        <Modal isOpen={showRolesModal} onClose={() => setShowRolesModal(false)}>
          <div className={styles.modalContent}>
            <h2>Editar Roles de Usuarios</h2>
            <div className={styles.roleSelectorContainer}>
              <select
                value={usuarioSeleccionado}
                onChange={handleUsuarioSeleccionadoChange}
              >
                <option value="">Seleccione un usuario</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id.toString()}>
                    {usuario.username}
                  </option>
                ))}
              </select>
              <select
                value={nuevoRol}
                onChange={(e) => setNuevoRol(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button onClick={handleChangeRol}>Actualizar Rol</button>
            <button onClick={() => setShowRolesModal(false)}>Cerrar</button>
          </div>
        </Modal>
      )}

      {showCoinsModal && (
        <Modal isOpen={showCoinsModal} onClose={() => setShowCoinsModal(false)}>
          <div className={styles.modalContent}>
            <h2>Editar Monedas de Usuarios</h2>
            <ul>
              {usuarios.map((usuario) => (
                <li key={usuario.id}>
                  {usuario.username} - {usuario.coins}
                  <input
                    type="number"
                    value={nuevoCoins}
                    onChange={(e) => setNuevoCoins(parseInt(e.target.value))}
                  />
                  <button onClick={() => {
                    setUsuarioSeleccionado(usuario.id.toString());
                    handleChangeCoins();
                  }}>Actualizar</button>
                </li>
              ))}
            </ul>
            <button onClick={() => setShowCoinsModal(false)}>Cerrar</button>
          </div>
        </Modal>
      )}

      {showRouletteModal && (
        <Modal isOpen={showRouletteModal} onClose={() => setShowRouletteModal(false)}>
          <details className={styles.details} >
            <summary className={styles.summary}>Editar Premios</summary>
            <PrizeForm />
          </details>
          <details className={styles.details}>
            <summary className={styles.summary}>Editar Ruletas</summary>
            <RouletteConfig onSave={handleSaveRoulette} selectedRoulette={selectedRoulette} />
            <div className={styles.rouletteList}>
              <h3>Ruletas existentes</h3>
              <ul>
                {roulettes.map((roulette) => (
                  <li key={roulette.id}>
                    <div>
                      <h4>{roulette.name}</h4>
                      <p>{roulette.description}</p>
                      <button onClick={() => handleEditRoulette(roulette)}>Edit</button>
                      <button onClick={() => handleDeleteRoulette(roulette.id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </Modal>
      )}

      {showBetListModal && (
        <Modal isOpen={showBetListModal} onClose={() => setShowBetListModal(false)}>
          <BetList />
        </Modal>
      )}
    </div>
  );
};

export default withAuth(PanelAdministrador, ['admin']);
