const offers = [
  {
    id: 1,
    name: 'Arroz 5kg',
    oldPrice: 'R$ 32,90',
    promoPrice: 'R$ 27,90',
    category: 'Alimentos',
  },
  {
    id: 2,
    name: 'Feijão 1kg',
    oldPrice: 'R$ 9,90',
    promoPrice: 'R$ 7,99',
    category: 'Alimentos',
  },
  {
    id: 3,
    name: 'Óleo de soja',
    oldPrice: 'R$ 8,49',
    promoPrice: 'R$ 6,99',
    category: 'Cozinha',
  },
];

function OffersSection() {
  return (
    <section id="ofertas" className="section offers">
      <div className="container">
        <div className="section__header">
          <span>Promoções</span>
          <h2>Ofertas em destaque</h2>
          <p>
            Produtos selecionados para ajudar os clientes a encontrarem as melhores oportunidades.
          </p>
        </div>

        <div className="offers__grid">
          {offers.map((offer) => (
            <article className="offer-card" key={offer.id}>
              <span className="offer-card__category">{offer.category}</span>
              <h3>{offer.name}</h3>

              <div className="offer-card__prices">
                <span className="offer-card__old">{offer.oldPrice}</span>
                <strong>{offer.promoPrice}</strong>
              </div>

              <button className="button button--primary">Tenho interesse</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OffersSection;