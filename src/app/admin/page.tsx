'use client';

import React, { useEffect, useState } from 'react';
import apiClient from '../../services/api';
import withAuth from '../hoc/withAuth';
import BotonCerrarSesion from '../componentes/logoutbtn/logoutbtn';

const PaginaAdministrador = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
  const [nuevoRol, setNuevoRol] = useState('');

  useEffect(() => {
    // Obtener la lista de usuarios
    apiClient.get('/user')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los usuarios:', error);
      });
  }, []);

  const handleChangeRol = () => {
    if (usuarioSeleccionado && nuevoRol) {
      apiClient.patch(`/user/update-role/${usuarioSeleccionado}`, { role: nuevoRol })
        .then(response => {
          alert('Rol actualizado correctamente');
        })
        .catch(error => {
          console.error('Error al actualizar el rol:', error);
        });
    }
  };

  return (
    <div>
      <BotonCerrarSesion/>
      <h1>Página para administradores</h1>
      <div>
        <label htmlFor="usuarios">Seleccionar usuario:</label>
        <select
          id="usuarios"
          value={usuarioSeleccionado}
          onChange={(e) => setUsuarioSeleccionado(e.target.value)}
        >
          <option value="">Seleccionar</option>
          {usuarios.map(usuario => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nombreUsuario}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="roles">Nuevo rol:</label>
        <select
          id="roles"
          value={nuevoRol}
          onChange={(e) => setNuevoRol(e.target.value)}
        >
          <option value="">Seleccionar</option>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      <button onClick={handleChangeRol}>Actualizar rol</button>
    </div>
  );
};

export default withAuth(PaginaAdministrador, 'admin');
