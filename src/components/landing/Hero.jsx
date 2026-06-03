function Hero() {
  return (
    <section className="hero">
      <div className="container hero__content">
        <div className="hero__text">
          <span className="hero__tag">Mercado • Mercearia • Ofertas</span>

          <h1>Comercial Sagarana</h1>

          <p>
            Tudo que você precisa para o dia a dia, com atendimento próximo,
            ofertas especiais e facilidade para encontrar informações do comércio.
          </p>

          <div className="hero__actions">
            <a href="#ofertas" className="button button--primary">
              Ver ofertas
            </a>

            <a href="#contato" className="button button--secondary">
              Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="hero__card">
          <h2>Ofertas da semana</h2>
          <p>Produtos promocionais atualizados pelo comerciante.</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;