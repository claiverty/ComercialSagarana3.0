import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="container header__content">
        <Link to="/" className="header__logo">
          <img
            src="/images/logo-sagarana.png"
            alt="Logo Comercial Sagarana"
          />
        </Link>

        <nav className="header__nav">
          <a href="#ofertas">Ofertas</a>
          <a href="#localizacao">Localização</a>
          <a href="#contato">Contato</a>

          <Link to="/login" className="header__login">
            Área Administrativa
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;