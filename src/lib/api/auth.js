// axios 요청
import client from './client';

export const login = ({ username, password }) =>
  client.post('/api/auth/login', { username, password });
// Path, payload 를 인자로 받음.

export const register = ({ username, password }) =>
  client.post('/api/auth/register', { username, password });

export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');
