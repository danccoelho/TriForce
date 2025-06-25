// src/pages/Natacao.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from '../styles/natacao.module.css';
import maioAdidasImg from '../assets/maioAdidas.jpg';
import maioMImg from '../assets/maioMjpg.jpg'

import sungaAdidasImg from '../assets/SungaAdidas.jpg';
import sungaMmImg from '../assets/sungaMormaijpg.jpg';

import toucaMImg from '../assets/toucaM.jpg';
import toucaAdidasImg from '../assets/toucaAdidas.jpg';

import oculosAdidasImg from '../assets/oculosAdidas.jpg';
import oculosMImg from '../assets/oculosM.jpg';

const produtosNatacao = [
  {
    id: '1',
    nome: 'Maiô Speedo',
    preco: 159.9,
    imagem: maioAdidasImg ,
  },
  {
    id: '2',
    nome: 'Sunga Adidas',
    preco: 129.9,
    imagem: sungaAdidasImg,
  },
  {
    id: '3',
    nome: 'Óculos Leader',
    preco: 89.9,
    imagem: oculosAdidasImg,
  },
  {
    id: '4',
    nome: 'Touca de Silicone',
    preco: 39.9,
    imagem: toucaAdidasImg,
  },
  {
    id: '5',
    nome: 'Maiô Mormai',
    preco: 159.9,
    imagem: maioMImg,
  },
  {
    id: '6',
    nome: 'Sunga Mormai',
    preco: 129.9,
    imagem: sungaMmImg,
  },
  {
    id: '7',
    nome: 'Óculos Pro Swim',
    preco: 89.9,
    imagem: oculosMImg,
  },
  {
    id: '8',
    nome: 'Touca Mormai',
    preco: 39.9,
    imagem: toucaMImg,
  },
];

export default function Natacao() {
  return (
    <>
      <Navbar />
      <div className={styles.pageWrapper}>
        <h1 className={styles.title}>Natação</h1>
        <p className={styles.subtitle}>Confira nossos produtos especializados para nadadores</p>
        <div className={styles.produtoGrid}>
          {produtosNatacao.map((produto) => (
            <Link
              to={`/natacao/produto/${produto.id}`}
              key={produto.id}
              className={styles.card}
            >
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
