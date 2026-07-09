import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth/useAuth.js';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    const { error } = await login(email, password);
    setEnviando(false);
    if (error) {
      setError('Email o contraseña incorrectos.');
      return;
    }
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-light px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white rounded-2xl p-8 border border-stone-light" style={{ boxShadow: 'var(--shadow-card)' }}>
        <h1 className="text-2xl font-black mb-6 text-stone-dark font-heading">Panel de Prensa</h1>
        {error && <p className="text-red-600 text-sm mb-4 font-body">{error}</p>}
        <label className="block text-sm font-semibold mb-1 font-body text-stone-dark">Email</label>
        <input
          type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
          className="w-full mb-4 px-3 py-2 rounded-lg border border-stone-light font-body"
        />
        <label className="block text-sm font-semibold mb-1 font-body text-stone-dark">Contraseña</label>
        <input
          type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
          className="w-full mb-6 px-3 py-2 rounded-lg border border-stone-light font-body"
        />
        <button
          type="submit" disabled={enviando}
          className="w-full py-3 rounded-xl font-bold text-white font-body disabled:opacity-60"
          style={{ backgroundColor: 'var(--color-earth)' }}
        >
          {enviando ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}
