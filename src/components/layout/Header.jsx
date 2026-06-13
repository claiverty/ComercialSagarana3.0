import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="header">
      <div className="container header__content">
        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <Link to="/" className="header__logo" onClick={closeMenu}>
          <img src="/images/logo-sagarana.png" alt="Comercial Sagarana" />
        </Link>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <a href="#ofertas" onClick={closeMenu}>Ofertas</a>

          <a href="#localizacao" onClick={closeMenu}>Localização</a>

          <a href="#contato" onClick={closeMenu}>Contato</a>

          <Link to="/login" className="header__login" onClick={closeMenu}>Área Administrativa</Link>
        </nav>

        {menuOpen && (
          <button
            type="button"
            className="mobile-menu-overlay"
            onClick={closeMenu}
            aria-label="Fechar menu"
          />
        )}
      </div>
    </header>
  );
}

export default Header;