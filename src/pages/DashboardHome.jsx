function DashboardHome() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-page__header">
        <div>
          <span>Painel administrativo</span>
          <h1>Resumo geral</h1>
          <p>Acompanhe as vendas e ofertas do Comercial Sagarana.</p>
        </div>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <span>Vendas hoje</span>
          <strong>R$ 0,00</strong>
          <p>Total registrado no dia.</p>
        </article>

        <article className="stat-card">
          <span>Vendas no mês</span>
          <strong>R$ 0,00</strong>
          <p>Desempenho acumulado mensal.</p>
        </article>

        <article className="stat-card">
          <span>Ofertas ativas</span>
          <strong>3</strong>
          <p>Produtos exibidos na landing.</p>
        </article>

        <article className="stat-card">
          <span>Quantidade de vendas</span>
          <strong>0</strong>
          <p>Registros feitos no dashboard.</p>
        </article>
      </div>

      <section className="dashboard-panel">
        <h2>Próximas ações</h2>
        <p>
          Em breve, esses dados serão carregados automaticamente pelo Supabase.
          Primeiro estamos montando a estrutura visual do sistema.
        </p>
      </section>
    </div>
  );
}

export default DashboardHome;