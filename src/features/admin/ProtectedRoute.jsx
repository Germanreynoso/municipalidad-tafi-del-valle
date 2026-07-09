import { Navigate } from 'react-router-dom';
import { useAuth } from './auth/useAuth.js';

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();
  if (loading) return <div className="p-10 font-body text-stone">Verificando sesión…</div>;
  if (!session) return <Navigate to="/admin/login" replace />;
  return children;
}
