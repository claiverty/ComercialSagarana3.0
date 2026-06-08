import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { signIn } from '../services/authService';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.login || !formData.password) {
      alert('Preencha usuário/email e senha.');
      return;
    }

    try {
      setLoading(true);

      await signIn(formData.login, formData.password);

      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Usuário/email ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">

        <span>Painel administrativo</span>
        <h1>Entrar</h1>

        <form className="dashboard-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login">Usuário ou email</label>
            <input
              id="login"
              name="login"
              type="text"
              placeholder="usario@email.com"
              value={formData.login}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="button button--primary" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar no painel'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;