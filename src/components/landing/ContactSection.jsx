import { FaInstagram, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

function ContactSection() {
  return (
    <section id="contato" className="section contact">
      <div className="container contact__content">
        <span className="section__eyebrow">Contato</span>

        <h2>Fale com o Comercial Sagarana</h2>

        <p>
          Entre em contato para tirar dúvidas, consultar produtos ou saber mais
          sobre as ofertas.
        </p>

        <div className="contact__actions">
          <a
            href="https://wa.me/5561999371711"
            target="_blank"
            rel="noreferrer"
            className="button button--primary"
          >
            <FaWhatsapp />
            WhatsApp
          </a>

          <a href="tel:+5561999371711" className="button button--secondary">
            <FaPhoneAlt />
            (61) 99937-1711
          </a>

          <a
            href="https://www.instagram.com/comercialsagarana"
            target="_blank"
            rel="noreferrer"
            className="button button--primary"
          >
            <FaInstagram />
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;