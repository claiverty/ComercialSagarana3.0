function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-banner">
          <img
            src="/images/comercial-sagarana.jpg"
            alt="Fachada do Comercial Sagarana"
            className="hero-banner__image"
          />

          <div className="hero-banner__overlay"></div>

          <img
            src="/images/logo-sagarana-cart.png"
            alt="Logo Comercial Sagarana"
            className="hero-banner__logo"
          />

          <div className="hero-banner__content">
            <span className="hero__tag">
              Comercial Sagarana
            </span>

            <h1>Onde se compra barato!</h1>

            <p>
              Tradição, economia e variedade para suas compras do dia a dia.
            </p>

            <div className="hero__actions">
              <a href="#contato" className="button button--primary">
                Entrar em contato
              </a>
            </div>
          </div>

          <div className="hero-banner__curve"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;