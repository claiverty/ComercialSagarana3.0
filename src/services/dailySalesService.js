import { supabase } from './supabaseClient';

export async function getDailySales() {
  const { data, error } = await supabase
    .from('daily_sales')
    .select('*')
    .order('sale_date', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function createDailySale(saleData) {
  const { data, error } = await supabase
    .from('daily_sales')
    .insert([
      {
        sale_date: saleData.sale_date,
        total_value: saleData.total_value,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateDailySale(saleId, saleData) {
  const { data, error } = await supabase
    .from('daily_sales')
    .update({
      sale_date: saleData.sale_date,
      total_value: saleData.total_value,
      updated_at: new Date().toISOString(),
    })
    .eq('id', saleId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteDailySaleById(saleId) {
  const { error } = await supabase
    .from('daily_sales')
    .delete()
    .eq('id', saleId);

  if (error) {
    throw error;
  }
}