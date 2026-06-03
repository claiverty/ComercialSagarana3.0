import { useState } from 'react';

const initialOffers = [
  {
    id: 1,
    name: 'Arroz 5kg',
    category: 'Alimentos',
    oldPrice: '32.90',
    promoPrice: '27.90',
    description: 'Arroz branco tipo 1 em oferta especial.',
    active: true,
  },
  {
    id: 2,
    name: 'Feijão 1kg',
    category: 'Alimentos',
    oldPrice: '9.90',
    promoPrice: '7.99',
    description: 'Feijão selecionado para o dia a dia.',
    active: true,
  },
];

function DashboardOffers() {
  const [offers, setOffers] = useState(initialOffers);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    oldPrice: '',
    promoPrice: '',
    description: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name || !formData.promoPrice) {
      alert('Preencha pelo menos o nome do produto e o preço promocional.');
      return;
    }

    const newOffer = {
      id: Date.now(),
      ...formData,
      active: true,
    };

    setOffers((currentOffers) => [newOffer, ...currentOffers]);

    setFormData({
      name: '',
      category: '',
      oldPrice: '',
      promoPrice: '',
      description: '',
    });
  }

  function toggleOfferStatus(offerId) {
    setOffers((currentOffers) =>
      currentOffers.map((offer) =>
        offer.id === offerId
          ? { ...offer, active: !offer.active }
          : offer
      )
    );
  }

  function deleteOffer(offerId) {
    const confirmDelete = confirm('Deseja realmente remover esta oferta?');

    if (!confirmDelete) {
      return;
    }

    setOffers((currentOffers) =>
      currentOffers.filter((offer) => offer.id !== offerId)
    );
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
    <div className="dashboard-page">
      <div className="dashboard-page__header">
        <div>
          <span>Controle de ofertas</span>
          <h1>Ofertas</h1>
          <p>Cadastre, edite e desative os produtos promocionais da landing.</p>
        </div>
      </div>

      <section className="dashboard-panel">
        <h2>Cadastrar oferta</h2>

        <form className="dashboard-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome do produto</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Ex: Arroz 5kg"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoria</label>
            <input
              id="category"
              name="category"
              type="text"
              placeholder="Ex: Alimentos"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="oldPrice">Preço antigo</label>
              <input
                id="oldPrice"
                name="oldPrice"
                type="number"
                step="0.01"
                placeholder="32.90"
                value={formData.oldPrice}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="promoPrice">Preço promocional</label>
              <input
                id="promoPrice"
                name="promoPrice"
                type="number"
                step="0.01"
                placeholder="27.90"
                value={formData.promoPrice}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="description"
              placeholder="Breve descrição da oferta"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="button button--primary">
            Salvar oferta
          </button>
        </form>
      </section>

      <section className="dashboard-panel">
        <h2>Ofertas cadastradas</h2>

        <div className="dashboard-table">
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Preço antigo</th>
                <th>Preço atual</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {offers.map((offer) => (
                <tr key={offer.id}>
                  <td>{offer.name}</td>
                  <td>{offer.category || '-'}</td>
                  <td>{formatPrice(offer.oldPrice)}</td>
                  <td>{formatPrice(offer.promoPrice)}</td>
                  <td>
                    <span className="status-badge">
                      {offer.active ? 'Ativa' : 'Inativa'}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="table-action"
                        onClick={() => toggleOfferStatus(offer.id)}
                      >
                        {offer.active ? 'Desativar' : 'Ativar'}
                      </button>

                      <button
                        type="button"
                        className="table-action table-action--danger"
                        onClick={() => deleteOffer(offer.id)}
                      >
                        Remover
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {offers.length === 0 && (
                <tr>
                  <td colSpan="6">Nenhuma oferta cadastrada ainda.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default DashboardOffers;