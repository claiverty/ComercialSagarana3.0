function LocationSection() {
  return (
    <section id="localizacao" className="section location">
      <div className="container location__content">
        <div>
          <span className="section__eyebrow">Localização</span>
          <h2>Encontre o Comercial Sagarana</h2>
          <p>
            Consulte o endereço, veja a localização e facilite sua chegada até o estabelecimento.
          </p>

          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noreferrer"
            className="button button--primary"
          >
            Abrir no mapa
          </a>
        </div>

        <div className="location__map">
          <p>Mapa do estabelecimento</p>
        </div>
      </div>
    </section>
  );
}

export default LocationSection;