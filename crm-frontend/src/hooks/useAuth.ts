import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });
      
      // Guardar token en localStorage o contexto
      localStorage.setItem('jwt_token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    navigate('/login');
  };

  return { login, logout, loading, error };
};