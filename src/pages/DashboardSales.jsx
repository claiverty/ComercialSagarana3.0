import { useMemo, useState } from 'react';

const initialDailySales = [
  { id: 1, saleDate: '2026-02-01', totalValue: '5987.98' },
  { id: 2, saleDate: '2026-02-02', totalValue: '4890.90' },
  { id: 3, saleDate: '2026-02-03', totalValue: '4290.90' },
  { id: 4, saleDate: '2026-02-04', totalValue: '3611.52' },
  { id: 5, saleDate: '2026-01-10', totalValue: '12450.90' },
  { id: 6, saleDate: '2025-03-15', totalValue: '9430.50' },
];

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
  const [dailySales, setDailySales] = useState(initialDailySales);
  const [expandedYears, setExpandedYears] = useState([]);
  const [expandedMonths, setExpandedMonths] = useState([]);

  const [formData, setFormData] = useState({
    saleDate: '',
    totalValue: '',
  });''

  const [editingSaleId, setEditingSaleId] = useState(null);

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

      grouped[year].total += Number(sale.totalValue);
      grouped[year].months[month].total += Number(sale.totalValue);
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

  function handleSubmit(event) {
  event.preventDefault();

  if (!formData.saleDate || !formData.totalValue) {
    alert('Preencha a data e o valor total do dia.');
    return;
  }

  const alreadyExists = dailySales.some(
    (sale) =>
      sale.saleDate === formData.saleDate && sale.id !== editingSaleId
  );

  if (alreadyExists) {
    alert('Já existe uma venda registrada para essa data.');
    return;
  }

  if (editingSaleId) {
    setDailySales((currentSales) =>
      currentSales.map((sale) =>
        sale.id === editingSaleId
          ? {
              ...sale,
              saleDate: formData.saleDate,
              totalValue: formData.totalValue,
            }
          : sale
      )
    );

    setEditingSaleId(null);
  } else {
    const newDailySale = {
      id: Date.now(),
      saleDate: formData.saleDate,
      totalValue: formData.totalValue,
    };

    setDailySales((currentSales) => [newDailySale, ...currentSales]);
  }

  setFormData({
    saleDate: '',
    totalValue: '',
  });
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

function deleteSale(saleId) {
  const confirmDelete = confirm('Deseja realmente apagar essa venda diária?');

  if (!confirmDelete) {
    return;
  }

  setDailySales((currentSales) =>
    currentSales.filter((sale) => sale.id !== saleId)
  );

  if (editingSaleId === saleId) {
    setEditingSaleId(null);

    setFormData({
      saleDate: '',
      totalValue: '',
    });
  }
}

function cancelEdit() {
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
        <h2>Registrar venda do dia</h2>

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
              <label htmlFor="totalValue">Valor total do dia</label>
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
            <button type="submit" className="button button--primary">
              {editingSaleId ? 'Salvar alteração' : 'Salvar venda do dia'}
            </button>

            {editingSaleId && (
              <button
                type="button"
                className="button button--secondary"
                onClick={cancelEdit}
              >
                Cancelar edição
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="dashboard-panel">
        <h2>Relatório de vendas</h2>

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
                  <span>
                    {isYearOpen ? '▼' : '▶'} {yearGroup.year}
                  </span>

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
                                  <div className="sales-row sales-row--day" key={sale.id}>
                                    <span>{formatDate(sale.saleDate)}</span>

                                    <div className="sales-day-actions">
                                      <strong>{formatCurrency(sale.totalValue)}</strong>

                                      <button
                                        type="button"
                                        className="table-action"
                                        onClick={() => startEditSale(sale)}
                                      >
                                        Editar
                                      </button>

                                      <button
                                        type="button"
                                        className="table-action table-action--danger"
                                        onClick={() => deleteSale(sale.id)}
                                      >
                                        Apagar
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
      </section>
    </div>
  );
}

export default DashboardSales;