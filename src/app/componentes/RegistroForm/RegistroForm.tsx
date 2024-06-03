'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registrarUsuario } from '../../../services/api';
import styles from '../LoginForm/LoginForm.module.css';  // Reutilizo CSS

const FormularioRegistro = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const resultado = await registrarUsuario({ nombreUsuario, email, contrasena });
      setExito('Usuario registrado con éxito!');
      setError('');
      // Redirigir al usuario a la página de inicio de sesión después del registro
      router.push('/login');
    } catch (error) {
      setError('Fallo el registro');
      setExito('');
    }
  };

  return (
    <div className={styles['form-container']}>
      <form onSubmit={handleSubmit}>
        <h2>Registrarse</h2>
        {error && <p className={styles['error-message']}>{error}</p>}
        {exito && <p className={styles['error-message']} style={{ color: 'green' }}>{exito}</p>}
        <div className={styles['form-group']}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <button type="submit">Registrarme</button>
        </div>
      </form>
    </div>
  );
};

export default FormularioRegistro;
