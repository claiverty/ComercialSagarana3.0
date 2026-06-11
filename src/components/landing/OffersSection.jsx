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
      setOffers(data || []);
    } catch (error) {
      console.error(error);
      setOffers([]);
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

  if (!loading && offers.length === 0) {
    return null;
  }

  return (
    <section id="ofertas" className="section offers">
      <div className="container">
        <div className="section__header">
          <span>Promoções</span>

          <h2>Ofertas em destaque</h2>

          <p>
            Confira os produtos selecionados com os melhores preços da semana.
          </p>
        </div>

        {loading ? (
          <p className="offers__loading">Carregando ofertas...</p>
        ) : (
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
        )}
      </div>
    </section>
  );
}

export default OffersSection;