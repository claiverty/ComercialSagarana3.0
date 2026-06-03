function DashboardHome() {
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
          <strong>R$ 5.987,98</strong>
          <p>02/06/2026</p>
        </article>

        <article className="stat-card">
          <span>Faturamento do mês</span>
          <strong>R$ 35.890,00</strong>
          <p>Resultado acumulado do mês atual.</p>
        </article>

        <article className="stat-card">
          <span>Faturamento do ano</span>
          <strong>R$ 412.890,00</strong>
          <p>Resultado acumulado do ano atual.</p>
        </article>

        <article className="stat-card">
          <span>Ofertas ativas</span>
          <strong>3</strong>
          <p>Produtos exibidos na landing.</p>
        </article>
      </div>

      <section className="dashboard-panel">
        <h2>Resumo financeiro</h2>

        <div className="financial-summary">
          <div className="financial-item">
            <span>Melhor mês do ano</span>
            <strong>Maio - R$ 48.900,00</strong>
          </div>

          <div className="financial-item">
            <span>Dias registrados</span>
            <strong>128</strong>
          </div>

          <div className="financial-item">
            <span>Média diária</span>
            <strong>R$ 3.225,50</strong>
          </div>

          <div className="financial-item">
            <span>Última atualização</span>
            <strong>02/06/2026</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardHome;