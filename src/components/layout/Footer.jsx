import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__content">
        <div className="footer__brand">
          <img src="/images/logo-sagarana.png" alt="Comercial Sagarana" />

          <div>
            <strong>Comercial Sagarana</strong>
            <p>Onde se compra barato!</p>
          </div>
        </div>

        <div className="footer__links">
          <a href="#ofertas">Ofertas</a>
          <a href="#localizacao">Localização</a>
          <a href="#contato">Contato</a>
        </div>

        <div className="footer__social">
          <a
            href="https://wa.me/5561999371711"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>

          <a
            href="https://www.instagram.com/comercialsagarana"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© 2026 Comercial Sagarana. Todos os direitos reservados.</span>
        <span>Desenvolvido para facilitar o acesso dos clientes às informações do comércio.</span>
      </div>
    </footer>
  );
}

export default Footer;