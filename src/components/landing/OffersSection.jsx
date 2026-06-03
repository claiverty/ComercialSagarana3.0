import { useEffect, useState } from 'react';

import { getActiveOffers } from '../../services/offersService';

function OffersSection() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActiveOffers();
  }, []);

  async function loadActiveOffers() {
    try {
      setLoading(true);
      const data = await getActiveOffers();
      setOffers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function formatPrice(value) {
    if (!value) {
      return '-';
    }

    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  return (
    <section id="ofertas" className="section offers">
      <div className="container">
        <div className="section__header">
          <span>Promoções</span>
          <h2>Ofertas em destaque</h2>
          <p>
            Produtos selecionados para ajudar os clientes a encontrarem as
            melhores oportunidades.
          </p>
        </div>

        {loading ? (
          <p>Carregando ofertas...</p>
        ) : offers.length > 0 ? (
          <div className="offers__grid">
            {offers.map((offer) => (
              <article className="offer-card" key={offer.id}>
                {offer.image_url && (
                  <img
                    src={offer.image_url}
                    alt={offer.name}
                    className="offer-card__image"
                  />
                )}

                <div className="offer-card__content">
                  <h3>{offer.name}</h3>

                  <div className="offer-card__prices">
                    {offer.old_price && (
                      <span className="offer-card__old">
                        {formatPrice(offer.old_price)}
                      </span>
                    )}

                    <strong>{formatPrice(offer.promo_price)}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-offers">
            <h3>Nenhuma oferta disponível no momento.</h3>
            <p>Volte em breve para conferir novas promoções.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default OffersSection;