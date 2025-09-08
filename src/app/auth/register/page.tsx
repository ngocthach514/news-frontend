'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await api('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, username, password }),
      });
      router.push('/auth/login');
    } catch (err: any) {
      setError('Đăng ký thất bại');
    }
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h1>Đăng ký</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </div>
        <div>
          <label>Tên tài khoản</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Mật khẩu</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
}
