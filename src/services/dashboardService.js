import { supabase } from './supabaseClient';

export async function getDashboardSummary() {
  const { data: sales, error } = await supabase
    .from('daily_sales')
    .select('*')
    .order('sale_date', { ascending: false });

  if (error) {
    throw error;
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const monthSales = sales.filter((sale) => {
    const date = new Date(`${sale.sale_date}T00:00:00`);

    return (
      date.getFullYear() === currentYear &&
      date.getMonth() === currentMonth
    );
  });

  const yearSales = sales.filter((sale) => {
    const date = new Date(`${sale.sale_date}T00:00:00`);

    return date.getFullYear() === currentYear;
  });

  const lastSale = sales[0] || null;

  const monthlyRevenue = monthSales.reduce(
    (acc, sale) => acc + Number(sale.total_value),
    0
  );

  const yearlyRevenue = yearSales.reduce(
    (acc, sale) => acc + Number(sale.total_value),
    0
  );

  const groupedMonths = {};

  yearSales.forEach((sale) => {
    const date = new Date(`${sale.sale_date}T00:00:00`);
    const month = date.getMonth();

    groupedMonths[month] =
      (groupedMonths[month] || 0) + Number(sale.total_value);
  });

  let bestMonthValue = 0;

  Object.values(groupedMonths).forEach((value) => {
    if (value > bestMonthValue) {
      bestMonthValue = value;
    }
  });

  const averageDaily =
    yearSales.length > 0
      ? yearlyRevenue / yearSales.length
      : 0;

  return {
    lastSale,
    monthlyRevenue,
    yearlyRevenue,
    bestMonthValue,
    registeredDays: sales.length,
    averageDaily,
  };
}