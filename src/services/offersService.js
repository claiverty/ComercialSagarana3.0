import { supabase } from './supabaseClient';

const BUCKET_NAME = 'offer-images';

export async function getOffers() {
  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function createOffer(offerData, imageFile) {
  let imageUrl = offerData.image_url || null;

  if (imageFile) {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `offers/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, imageFile);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    imageUrl = data.publicUrl;
  }

  const { data, error } = await supabase
    .from('offers')
    .insert([
      {
        name: offerData.name,
        category: offerData.category,
        description: offerData.description,
        old_price: offerData.old_price || null,
        promo_price: offerData.promo_price,
        image_url: imageUrl,
        active: true,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateOffer(offerId, offerData, imageFile) {
  let imageUrl = offerData.image_url || null;

  if (imageFile) {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `offers/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, imageFile);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    imageUrl = data.publicUrl;
  }

  const { data, error } = await supabase
    .from('offers')
    .update({
      name: offerData.name,
      category: offerData.category,
      description: offerData.description,
      old_price: offerData.old_price || null,
      promo_price: offerData.promo_price,
      image_url: imageUrl,
      updated_at: new Date().toISOString(),
    })
    .eq('id', offerId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateOfferStatus(offerId, active) {
  const { data, error } = await supabase
    .from('offers')
    .update({
      active,
      updated_at: new Date().toISOString(),
    })
    .eq('id', offerId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteOfferById(offerId) {
  const { error } = await supabase
    .from('offers')
    .delete()
    .eq('id', offerId);

  if (error) {
    throw error;
  }
}

export async function getActiveOffers() {
  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}