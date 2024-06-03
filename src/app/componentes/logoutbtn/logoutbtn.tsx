'use client'
import { useRouter } from 'next/navigation';

const BotonCerrarSesion = () => {
  const router = useRouter();

  const handlerCerrarSesion = () => {
    localStorage.removeItem('token'); // Eliminar el token de localStorage
    router.push('/login');
  };

  return <button onClick={handlerCerrarSesion}>Cerrar Sesión</button>;
};

export default BotonCerrarSesion;
