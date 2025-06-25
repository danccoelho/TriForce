// src/pages/Corrida.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from '../styles/corrida.module.css';

import boneAddImg from '../assets/boneAdidas.jpg';

import camisetaAddImg from '../assets/camisaAdidas.jpg';

import shortAddImg from '../assets/shortAdidas.jpg';

import tenisAddImg from '../assets/tenisAdidas.jpg';




const produtosCorrida = [
  {
    id: '1',
    nome: 'Boné Adidas',
    preco: 299.9,
    imagem: boneAddImg,
  },
  {
    id: '2',
    nome: 'Camiseta Adidas',
    preco: 89.9,
    imagem: camisetaAddImg,
  },
  {
    id: '3',
    nome: 'Short Adidas',
    preco: 599.9,
    imagem: shortAddImg,
  },
  {
    id: '4',
    nome: 'Tênis Adidas',
    preco: 79.9,
    imagem: tenisAddImg,
  },
];

export default function Corrida() {
  return (
    <>
      <Navbar />
      <div className={styles.pageWrapper}>
        <h1 className={styles.title}>Corrida</h1>
        <p className={styles.subtitle}>Equipamentos de alta performance para corredores.</p>

        <div className={styles.produtoGrid}>
          {produtosCorrida.map(produto => (
            <Link to={`/produtoCorrida/${produto.id}`} className={styles.card} key={produto.id}>
              <img src={produto.imagem} alt={produto.nome} />
              <h3>{produto.nome}</h3>
              <p className={styles.preco}>R$ {produto.preco.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
