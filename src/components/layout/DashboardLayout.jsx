import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import { signOut } from '../../services/authService';

function DashboardLayout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

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
        <div className="dashboard-sidebar__top">
          <div>
            <h2>Comercial Sagarana</h2>
            <p>Painel administrativo</p>
          </div>

          <button
            type="button"
            className="dashboard-menu-button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className={`dashboard-nav ${menuOpen ? 'dashboard-nav--open' : ''}`}>
          <Link to="/dashboard" onClick={closeMenu}>Resumo</Link>

          <Link to="/dashboard/ofertas" onClick={closeMenu}>Ofertas</Link>

          <Link to="/dashboard/vendas" onClick={closeMenu}>Vendas </Link>

          <Link to="/" onClick={closeMenu}>Ver landing</Link>

          <button type="button" onClick={handleLogout}>Sair do painel</button>
        </nav>

        <button
          type="button"
          className="sidebar-logout"
          onClick={handleLogout}>
          Sair do painel
        </button>
      </aside>

      {menuOpen && (
        <button
          type="button"
          className="dashboard-menu-overlay"
          onClick={closeMenu}
          aria-label="Fechar menu"/>
      )}

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;