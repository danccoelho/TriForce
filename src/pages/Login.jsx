import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GoogleLogo from '../assets/search.png';
import FacebookLogo from '../assets/facebook.png';
import styles from '../styles/login.module.css'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', senha: '' });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const navigate = useNavigate();
  const { login } = useAuth(); // 👈 pega o método login

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3001/api/login', formData);
      alert(res.data.message);

      login(res.data.usuario); // 👈 salva no contexto

      navigate('/'); // 👈 redireciona para a Home
    } catch (err) {
      console.error('Erro no login:', err);
      alert('Falha no login. Verifique seu e-mail e senha.');
    }
  };


  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.logo}>
          <Link to="/">TriForce</Link>
        </h1>

        <form className={styles.form} onSubmit={handleLogin}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Digite seu email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <label className={styles.label} htmlFor="senha">Senha</label>
          <input
            id="senha"
            name="senha"
            type="password"
            placeholder="Digite sua senha"
            value={formData.senha}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <div className={styles.optionsRow}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkbox} />
              Lembrar-me
            </label>
            <Link to="/forgot-password" className={styles.forgotLink}>Esqueceu a senha?</Link>
          </div>

          <button type="submit" className={styles.btnPrimary}>Entrar</button>

          <div className={styles.divider}>
            <span>ou</span>
          </div>

          <div className={styles.socialButtons}>
            <button type="button" className={`${styles.btnSocial} ${styles.google}`}>
              <img src={GoogleLogo} alt="Google" />
              Entrar com Google
            </button>
            <button type="button" className={`${styles.btnSocial} ${styles.facebook}`}>
              <img src={FacebookLogo} alt="Facebook" />
              Entrar com Facebook
            </button>
          </div>
        </form>

        <p className={styles.signUpText}>
          Não tem uma conta? <Link to="/Cadastro" className={styles.signUpLink}>Cadastre-se aqui!</Link>
        </p>
      </div>
    </div>
  );
}
