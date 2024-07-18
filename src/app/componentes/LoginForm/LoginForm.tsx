'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../../../services/api';
import styles from '../LoginForm/LoginForm.module.css';

const LoginForm = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const respuesta = await apiClient.post('/auth/login', { nombreUsuario, contrasena });
      localStorage.setItem('token', respuesta.data.access_token); // Guarda el token en localStorage

      // Redirigir basado en el rol del usuario
      const role = respuesta.data.role;
      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/user');
      }
      setError('');
    } catch (error) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className={styles['form-container']}><form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <div className={styles['form-group']}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          required
        /></div>
      </div>
      <div>
        <div className={styles['form-group']}>
        <input
          placeholder="Contraseña"
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        </div>
      </div>
      <div className={styles['form-group']}>
      <button type="submit">Iniciar Sesión </button>
      </div>
    </form>
    </div>
  );
};

export default LoginForm;
