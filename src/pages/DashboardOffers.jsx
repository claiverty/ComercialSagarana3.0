import { useEffect, useState } from 'react';
import { Eye, EyeOff, Pencil, Trash2 } from 'lucide-react';
import {
  createOffer,
  deleteOfferById,
  getOffers,
  updateOffer,
  updateOfferStatus,
} from '../services/offersService';

function DashboardOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [editingOfferId, setEditingOfferId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    oldPrice: '',
    promoPrice: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    loadOffers();
  }, []);

  async function loadOffers() {
    try {
      setLoading(true);
      const data = await getOffers();
      setOffers(data);
    } catch (error) {
      console.error(error);
      alert('Erro ao carregar ofertas.');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setImageFile(file);
    setImagePreview(previewUrl);

    setFormData((currentData) => ({
      ...currentData,
      imageUrl: previewUrl,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name || !formData.promoPrice) {
      alert('Preencha pelo menos o nome do produto e o preço promocional.');
      return;
    }

    if (!editingOfferId && !imageFile) {
      alert('Selecione uma imagem do produto para cadastrar a oferta.');
      return;
    }

    try {
      setSaving(true);

      const offerPayload = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        old_price: formData.oldPrice,
        promo_price: formData.promoPrice,
        image_url: formData.imageUrl,
      };

      if (editingOfferId) {
        const updatedOffer = await updateOffer(editingOfferId, offerPayload, imageFile);

        setOffers((currentOffers) =>
          currentOffers.map((offer) =>
            offer.id === editingOfferId ? updatedOffer : offer
          )
        );
      } else {
        const newOffer = await createOffer(offerPayload, imageFile);

        setOffers((currentOffers) => [newOffer, ...currentOffers]);
      }

      resetForm();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar oferta.');
    } finally {
      setSaving(false);
    }
  }

  function resetForm() {
    setEditingOfferId(null);

    setFormData({
      name: '',
      category: '',
      oldPrice: '',
      promoPrice: '',
      description: '',
      imageUrl: '',
    });

    setImageFile(null);
    setImagePreview('');
  }

  function startEditOffer(offer) {
    setEditingOfferId(offer.id);

    setFormData({
      name: offer.name || '',
      category: offer.category || '',
      oldPrice: offer.old_price || '',
      promoPrice: offer.promo_price || '',
      description: offer.description || '',
      imageUrl: offer.image_url || '',
    });

    setImageFile(null);
    setImagePreview(offer.image_url || '');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function cancelEditOffer() {
    resetForm();
  }

  async function toggleOfferStatus(offerId) {
    const selectedOffer = offers.find((offer) => offer.id === offerId);

    if (!selectedOffer) return;

    try {
      const updatedOffer = await updateOfferStatus(
        offerId,
        !selectedOffer.active
      );

      setOffers((currentOffers) =>
        currentOffers.map((offer) =>
          offer.id === offerId ? updatedOffer : offer
        )
      );
    } catch (error) {
      console.error(error);
      alert('Erro ao alterar status da oferta.');
    }
  }

  async function deleteOffer(offerId) {
    const confirmDelete = confirm('Deseja realmente apagar esta oferta?');

    if (!confirmDelete) return;

    try {
      await deleteOfferById(offerId);

      setOffers((currentOffers) =>
        currentOffers.filter((offer) => offer.id !== offerId)
      );

      if (editingOfferId === offerId) {
        resetForm();
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao apagar oferta.');
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
    <div className="dashboard-page">
      <div className="dashboard-page__header">
        <div>
          <span>Controle de ofertas</span>
          <h1>Ofertas</h1>
          <p>Cadastre, edite e desative os produtos promocionais da landing.</p>
        </div>
      </div>

      <section className="dashboard-panel">
        <h2>{editingOfferId ? 'Editar oferta' : 'Cadastrar oferta'}</h2>

        {editingOfferId && (
          <p className="edit-alert">
            Editando uma oferta. Altere os dados e clique em salvar.
          </p>
        )}

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
            <label htmlFor="image">Imagem do produto</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview da oferta"
                className="offer-preview"
              />
            )}
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

          <div className="form-actions">
            <button type="submit" className="button button--primary" disabled={saving}>
              {saving
                ? 'Salvando...'
                : editingOfferId
                  ? 'Salvar alteração'
                  : 'Salvar oferta'}
            </button>

            {editingOfferId && (
              <button
                type="button"
                className="button button--secondary"
                onClick={cancelEditOffer}
              >
                Cancelar edição
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="dashboard-panel">
        <h2>Ofertas cadastradas</h2>

        {loading ? (
          <p>Carregando ofertas...</p>
        ) : (
          <div className="dashboard-table">
            <table>
              <thead>
                <tr>
                  <th>Imagem</th>
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
                    <td>
                      {offer.image_url ? (
                        <img
                          src={offer.image_url}
                          alt={offer.name}
                          className="offer-thumb"
                        />
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>{offer.name}</td>
                    <td>{offer.category || '-'}</td>
                    <td>{formatPrice(offer.old_price)}</td>
                    <td>{formatPrice(offer.promo_price)}</td>
                    <td>
                      <span className="status-badge">
                        {offer.active ? 'Ativa' : 'Inativa'}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          type="button"
                          className="icon-action"
                          title="Editar oferta"
                          aria-label="Editar oferta"
                          onClick={() => startEditOffer(offer)}
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          type="button"
                          className="icon-action"
                          title={offer.active ? 'Desativar oferta' : 'Ativar oferta'}
                          aria-label={offer.active ? 'Desativar oferta' : 'Ativar oferta'}
                          onClick={() => toggleOfferStatus(offer.id)}
                        >
                          {offer.active ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>

                        <button
                          type="button"
                          className="icon-action icon-action--danger"
                          title="Apagar oferta"
                          aria-label="Apagar oferta"
                          onClick={() => deleteOffer(offer.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {offers.length === 0 && (
                  <tr>
                    <td colSpan="7">Nenhuma oferta cadastrada ainda.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default DashboardOffers;