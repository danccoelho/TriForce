import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/cadastro.module.css';

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    confirmarEmail: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form...', formData);

    if (formData.email !== formData.confirmarEmail) {
      alert('Os e-mails não coincidem.');
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    if (!formData.termos) {
      alert('Você precisa aceitar os termos.');
      return;
    }

    const { confirmarEmail, confirmarSenha, termos, ...dadosParaEnviar } = formData;

    try {
      const res = await axios.post('http://localhost:3001/api/cadastro', dadosParaEnviar);
      alert(res.data.message);
    } catch (err) {
      console.error('Erro ao cadastrar:', err);
      alert('Erro ao cadastrar. Veja o console para mais detalhes.');
    }
  };

  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.cadastroBox}>
        <h1 className={styles.logo}>
          <Link to="/">TriForce</Link>
        </h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="nome" className={styles.label}>Nome</label>
              <input
                id="nome"
                name="nome"
                type="text"
                placeholder="Digite seu nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="sobrenome" className={styles.label}>Sobrenome</label>
              <input
                id="sobrenome"
                name="sobrenome"
                type="text"
                placeholder="Digite seu sobrenome"
                value={formData.sobrenome}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmarEmail" className={styles.label}>Confirmar Email</label>
            <input
              id="confirmarEmail"
              name="confirmarEmail"
              type="email"
              placeholder="Confirme seu email"
              value={formData.confirmarEmail}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="senha" className={styles.label}>Senha</label>
            <input
              id="senha"
              name="senha"
              type="password"
              placeholder="Digite sua senha"
              value={formData.senha}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmarSenha" className={styles.label}>Confirmar Senha</label>
            <input
              id="confirmarSenha"
              name="confirmarSenha"
              type="password"
              placeholder="Confirme sua senha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.checkboxContainer}>
            <label className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                name="termos"
                checked={formData.termos}
                onChange={handleChange}
              />
              <span>Aceito os termos e condições</span>
            </label>
          </div>

          <button type="submit" className={styles.btnPrimary}>Cadastrar</button>
        </form>

        <p className={styles.signInText}>
          Já tem uma conta? <Link to="/login" className={styles.signInLink}>Faça login aqui!</Link>
        </p>
      </div>
    </div>
  );
}