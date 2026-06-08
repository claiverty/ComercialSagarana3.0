import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { getCurrentSession } from '../services/authService';

function PrivateRoute() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const currentSession = await getCurrentSession();
      setSession(currentSession);
    } catch (error) {
      console.error(error);
      setSession(null);
    } finally {
      setChecking(false);
    }
  }

  if (checking) {
    return (
      <main className="page-center">
        <p>Verificando acesso...</p>
      </main>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;