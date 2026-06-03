import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardHome from '../pages/DashboardHome';
import DashboardOffers from '../pages/DashboardOffers';
import DashboardSales from '../pages/DashboardSales';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="ofertas" element={<DashboardOffers />} />
        <Route path="vendas" element={<DashboardSales />} />
      </Route>

      <Route
        path="*"
        element={
          <main className="page-center">
            <h1>Página não encontrada</h1>
            <p>O caminho acessado não existe.</p>
          </main>
        }
      />
    </Routes>
  );
}

export default AppRoutes;