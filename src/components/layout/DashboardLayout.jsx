import { Link, Outlet } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
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
      </aside>

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
