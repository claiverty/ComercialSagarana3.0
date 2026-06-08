import { Link, Outlet, useNavigate } from 'react-router-dom';

import { signOut } from '../../services/authService';

function DashboardLayout() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Erro ao sair do painel.');
    }
  }

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div>
          <div>
            <h2>Comercial Sagarana</h2>
            <p>Painel administrativo</p>
          </div>

          <nav className="dashboard-nav">
            <Link to="/dashboard">Resumo</Link>
            <Link to="/dashboard/ofertas">Ofertas</Link>
            <Link to="/dashboard/vendas">Vendas</Link>
            <Link to="/">Ver landing</Link>
          </nav>
        </div>

        <button
          type="button"
          className="sidebar-logout"
          onClick={handleLogout}
        >
          Sair do painel
        </button>
      </aside>

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;