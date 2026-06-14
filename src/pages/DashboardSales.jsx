import { useEffect, useMemo, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

import {
  createDailySale,
  deleteDailySaleById,
  getDailySales,
  updateDailySale,
} from '../services/dailySalesService';

const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

function DashboardSales() {
  const [dailySales, setDailySales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [expandedYears, setExpandedYears] = useState([]);
  const [expandedMonths, setExpandedMonths] = useState([]);
  const [editingSaleId, setEditingSaleId] = useState(null);

  const [formData, setFormData] = useState({
    saleDate: '',
    totalValue: '',
  });

  useEffect(() => {
    loadSales();
  }, []);

  async function loadSales() {
    try {
      setLoading(true);

      const sales = await getDailySales();

      const formattedSales = sales.map((sale) => ({
        id: sale.id,
        saleDate: sale.sale_date,
        totalValue: sale.total_value,
      }));

      setDailySales(formattedSales);
    } catch (error) {
      console.error(error);
      alert('Erro ao carregar vendas.');
    } finally {
      setLoading(false);
    }
  }

  const salesByYear = useMemo(() => {
    const grouped = {};

    dailySales.forEach((sale) => {
      const date = new Date(`${sale.saleDate}T00:00:00`);
      const year = date.getFullYear();
      const month = date.getMonth();

      if (!grouped[year]) {
        grouped[year] = {
          year,
          total: 0,
          months: monthNames.map((name, index) => ({
            month: index,
            name,
            total: 0,
            days: [],
          })),
        };
      }

      grouped[year].total += Number(sale.totalValue || 0);
      grouped[year].months[month].total += Number(sale.totalValue || 0);
      grouped[year].months[month].days.push(sale);
    });

    return Object.values(grouped)
      .map((yearGroup) => ({
        ...yearGroup,
        months: yearGroup.months.map((month) => ({
          ...month,
          days: month.days.sort(
            (a, b) => new Date(a.saleDate) - new Date(b.saleDate)
          ),
        })),
      }))
      .sort((a, b) => b.year - a.year);
  }, [dailySales]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.saleDate || !formData.totalValue) {
      alert('Preencha a data e o valor total do dia.');
      return;
    }

    const alreadyExists = dailySales.some(
      (sale) => sale.saleDate === formData.saleDate && sale.id !== editingSaleId
    );

    if (alreadyExists) {
      alert('Já existe uma venda registrada para essa data.');
      return;
    }

    try {
      setSaving(true);

      const salePayload = {
        sale_date: formData.saleDate,
        total_value: formData.totalValue,
      };

      if (editingSaleId) {
        const updatedSale = await updateDailySale(editingSaleId, salePayload);

        const formattedSale = {
          id: updatedSale.id,
          saleDate: updatedSale.sale_date,
          totalValue: updatedSale.total_value,
        };

        setDailySales((currentSales) =>
          currentSales.map((sale) =>
            sale.id === editingSaleId ? formattedSale : sale
          )
        );
      } else {
        const createdSale = await createDailySale(salePayload);

        const formattedSale = {
          id: createdSale.id,
          saleDate: createdSale.sale_date,
          totalValue: createdSale.total_value,
        };

        setDailySales((currentSales) => [formattedSale, ...currentSales]);
      }

      resetForm();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar venda diária.');
    } finally {
      setSaving(false);
    }
  }

  function toggleYear(year) {
    setExpandedYears((currentYears) =>
      currentYears.includes(year)
        ? currentYears.filter((item) => item !== year)
        : [...currentYears, year]
    );
  }

  function toggleMonth(year, month) {
    const monthKey = `${year}-${month}`;

    setExpandedMonths((currentMonths) =>
      currentMonths.includes(monthKey)
        ? currentMonths.filter((item) => item !== monthKey)
        : [...currentMonths, monthKey]
    );
  }

  function startEditSale(sale) {
    setEditingSaleId(sale.id);

    setFormData({
      saleDate: sale.saleDate,
      totalValue: sale.totalValue,
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  async function deleteSale(saleId) {
    const confirmDelete = confirm('Deseja realmente apagar essa venda diária?');

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteDailySaleById(saleId);

      setDailySales((currentSales) =>
        currentSales.filter((sale) => sale.id !== saleId)
      );

      if (editingSaleId === saleId) {
        resetForm();
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao apagar venda diária.');
    }
  }

  function resetForm() {
    setEditingSaleId(null);

    setFormData({
      saleDate: '',
      totalValue: '',
    });
  }

  function formatCurrency(value) {
    return Number(value || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function formatDate(dateString) {
    const date = new Date(`${dateString}T00:00:00`);
    return date.toLocaleDateString('pt-BR');
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__header">
        <div>
          <span>Controle de vendas</span>
          <h1>Vendas diárias</h1>
          <p>
            Registre o total vendido por dia e visualize os resultados por ano,
            mês e dia.
          </p>
        </div>
      </div>

      <section className="dashboard-panel">
        <h2>{editingSaleId ? 'Editar venda do dia' : 'Registrar venda do dia'}</h2>

        {editingSaleId && (
          <p className="edit-alert">
            Editando uma venda diária. Altere os dados e clique em salvar.
          </p>
        )}

        <form className="dashboard-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="saleDate">Data</label>
              <input
                id="saleDate"
                name="saleDate"
                type="date"
                value={formData.saleDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="totalValue">Valor total</label>
              <input
                id="totalValue"
                name="totalValue"
                type="number"
                step="0.01"
                placeholder="Ex: 5987.98"
                value={formData.totalValue}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="button button--primary" disabled={saving}>
              {saving
                ? 'Salvando...'
                : editingSaleId
                  ? 'Salvar alteração'
                  : 'Salvar venda do dia'}
            </button>

            {editingSaleId && (
              <button
                type="button"
                className="button button--secondary"
                onClick={resetForm}
              >
                Cancelar edição
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="dashboard-panel">
        <h2>Relatório de vendas</h2>

        {loading ? (
          <p>Carregando vendas...</p>
        ) : (
          <div className="sales-accordion">
            {salesByYear.map((yearGroup) => {
              const isYearOpen = expandedYears.includes(yearGroup.year);

              return (
                <div className="sales-year" key={yearGroup.year}>
                  <button
                    type="button"
                    className="sales-row sales-row--year"
                    onClick={() => toggleYear(yearGroup.year)}
                  >
                    <span>{isYearOpen ? '▼' : '▶'} {yearGroup.year}</span>
                    <strong>Total anual: {formatCurrency(yearGroup.total)}</strong>
                  </button>

                  {isYearOpen && (
                    <div className="sales-months">
                      {yearGroup.months.map((monthGroup) => {
                        const monthKey = `${yearGroup.year}-${monthGroup.month}`;
                        const isMonthOpen = expandedMonths.includes(monthKey);

                        return (
                          <div className="sales-month" key={monthKey}>
                            <button
                              type="button"
                              className="sales-row sales-row--month"
                              onClick={() =>
                                toggleMonth(yearGroup.year, monthGroup.month)
                              }
                            >
                              <span>
                                {isMonthOpen ? '▼' : '▶'} {monthGroup.name}
                              </span>

                              <strong>
                                Total mensal: {formatCurrency(monthGroup.total)}
                              </strong>
                            </button>

                            {isMonthOpen && (
                              <div className="sales-days">
                                {monthGroup.days.length > 0 ? (
                                  monthGroup.days.map((sale) => (
                                    <div
                                      className="sales-row sales-row--day"
                                      key={sale.id}
                                    >
                                      <span>{formatDate(sale.saleDate)}</span>

                                      <div className="sales-day-actions">
                                        <strong>{formatCurrency(sale.totalValue)}</strong>

                                        <button
                                          type="button"
                                          className="icon-action"
                                          title="Editar venda"
                                          aria-label="Editar venda"
                                          onClick={() => startEditSale(sale)}
                                        >
                                          <Pencil size={18} />
                                        </button>

                                        <button
                                          type="button"
                                          className="icon-action icon-action--danger"
                                          title="Apagar venda"
                                          aria-label="Apagar venda"
                                          onClick={() => deleteSale(sale.id)}
                                        >
                                          <Trash2 size={18} />
                                        </button>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="sales-empty">
                                    Nenhuma venda registrada neste mês.
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {salesByYear.length === 0 && (
              <div className="sales-empty">Nenhuma venda registrada ainda.</div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default DashboardSales;