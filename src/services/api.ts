import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:3000', // Asegúrate de que este sea el URL base correcto para tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a las cabeceras
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;

export const registrarUsuario = async (detallesUsuario: { nombreUsuario: string; email: string; contrasena: string }) => {
  try {
    const respuesta = await apiClient.post('/auth/register', detallesUsuario);
    return respuesta.data;
  } catch (error) {
    throw new Error('Fallo el registro');
  }
};

export const iniciarSesion = async (credenciales: { nombreUsuario: string; contrasena: string }) => {
  try {
    const respuesta = await apiClient.post('/auth/login', credenciales);
    return respuesta.data; 
  } catch (error) {
    throw new Error('Credenciales inválidas');
  }
};
