import { supabase } from './supabaseClient';

const USER_EMAILS = {
  sagarana: 'sagarana@comercialsagarana.local',
};

export function resolveLoginToEmail(login) {
  const normalizedLogin = login.trim().toLowerCase();

  if (normalizedLogin.includes('@')) {
    return normalizedLogin;
  }

  return USER_EMAILS[normalizedLogin] || normalizedLogin;
}

export async function signIn(login, password) {
  const email = resolveLoginToEmail(login);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}