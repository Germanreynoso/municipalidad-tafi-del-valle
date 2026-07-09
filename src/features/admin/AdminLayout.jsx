import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './auth/useAuth.js';

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const salir = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-stone-light">
      <header className="bg-white border-b border-stone-light">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="font-black text-stone-dark font-heading">Panel de Prensa</Link>
            <nav className="flex items-center gap-4 text-sm font-body">
              <Link to="/admin" className="font-semibold text-stone-dark hover:opacity-70">Noticias</Link>
              <Link to="/admin/reels" className="font-semibold text-stone-dark hover:opacity-70">Reels</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-body text-stone hover:text-stone-dark">Ver sitio</Link>
            <button onClick={salir} className="text-sm font-semibold font-body" style={{ color: 'var(--color-earth)' }}>
              Salir
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
