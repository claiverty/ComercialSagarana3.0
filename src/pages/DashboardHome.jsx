import { useEffect, useState } from 'react';

import { getDashboardSummary } from '../services/dashboardService';

function DashboardHome() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    loadSummary();
  }, []);

  async function loadSummary() {
    try {
      const data = await getDashboardSummary();
      setSummary(data);
    } catch (error) {
      console.error(error);
      alert('Erro ao carregar resumo.');
    }
  }

  function formatCurrency(value) {
    return Number(value || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function formatDate(dateString) {
    if (!dateString) return '-';

    return new Date(`${dateString}T00:00:00`).toLocaleDateString('pt-BR');
  }

  if (!summary) {
    return (
      <div className="dashboard-page">
        <p>Carregando resumo...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__header">
        <div>
          <span>Painel administrativo</span>
          <h1>Resumo geral</h1>
          <p>
            Acompanhe rapidamente os principais indicadores do Comercial
            Sagarana.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <span>Último fechamento</span>
          <strong>
            {summary.lastSale
              ? formatCurrency(summary.lastSale.total_value)
              : '-'}
          </strong>
          <p>
            {summary.lastSale
              ? formatDate(summary.lastSale.sale_date)
              : 'Nenhum registro'}
          </p>
        </article>

        <article className="stat-card">
          <span>Faturamento do mês</span>
          <strong>{formatCurrency(summary.monthlyRevenue)}</strong>
          <p>Resultado acumulado do mês atual.</p>
        </article>

        <article className="stat-card">
          <span>Faturamento do ano</span>
          <strong>{formatCurrency(summary.yearlyRevenue)}</strong>
          <p>Resultado acumulado do ano atual.</p>
        </article>

      </div>

      <section className="dashboard-panel">
        <h2>Resumo financeiro</h2>

        <div className="financial-summary">
          <div className="financial-item">
            <span>Melhor mês do ano</span>
            <strong>{formatCurrency(summary.bestMonthValue)}</strong>
          </div>

          <div className="financial-item">
            <span>Dias registrados</span>
            <strong>{summary.registeredDays}</strong>
          </div>

          <div className="financial-item">
            <span>Média diária</span>
            <strong>{formatCurrency(summary.averageDaily)}</strong>
          </div>

          <div className="financial-item">
            <span>Última atualização</span>
            <strong>
              {summary.lastSale
                ? formatDate(summary.lastSale.sale_date)
                : '-'}
            </strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardHome;