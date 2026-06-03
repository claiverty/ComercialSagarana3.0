function ContactSection() {
  return (
    <section id="contato" className="section contact">
      <div className="container contact__content">
        <span className="section__eyebrow">Contato</span>
        <h2>Fale com o Comercial Sagarana</h2>
        <p>
          Entre em contato para tirar dúvidas, consultar produtos ou saber mais sobre as ofertas.
        </p>

        <div className="contact__actions">
          <a href="https://wa.me/5500000000000" className="button button--primary">
            WhatsApp
          </a>

          <a href="https://www.instagram.com/" className="button button--secondary">
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;