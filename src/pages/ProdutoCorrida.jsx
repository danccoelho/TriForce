// src/pages/ProdutoCorrida.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from '../styles/produtoCorrida.module.css';
import { useCart } from '../context/CartContext';


import boneAddImg from '../assets/boneAdidas.jpg';

import camisetaAddImg from '../assets/camisaAdidas.jpg';

import shortAddImg from '../assets/shortAdidas.jpg';

import tenisAddImg from '../assets/tenisAdidas.jpg';


const produtos = [
  {
    id: '1',
    nome: 'Boné Adidas ',
    preco: 299.9,
    imagem: boneAddImg,
    descricao: 'Boné leve cor preta',
  },
  {
    id: '2',
    nome: 'Camisa Adidas',
    preco: 149.9,
    imagem: camisetaAddImg,
    descricao: 'Camiseta leve com tecnologia que afasta o suor da pele.',
  },
   {
    id: '3',
    nome: 'Short Adidas',
    preco: 149.9,
    imagem: shortAddImg,
    descricao: 'Short com segunda pele para uma melhor performace',
  },
   {
    id: '4',
    nome: 'Tênis Adidas',
    preco: 149.9,
    imagem: tenisAddImg,
    descricao: 'Tênis com placa de carbono para um rendimento de alto nível',
  },
];

export default function ProdutoCorrida() {
  const { id } = useParams();
  const produto = produtos.find(p => p.id === id);
  const { adicionarAoCarrinho } = useCart();
  const [tamanho, setTamanho] = useState('M');

  if (!produto) {
    return (
      <>
        <Navbar />
        <div className={styles.notFound}>
          <h2>Produto não encontrado</h2>
        </div>
      </>
    );
  }

  const handleAddToCart = () => {
    adicionarAoCarrinho({ ...produto, tamanho });
    alert('Produto adicionado ao carrinho!');
  };

  return (
    <>
      <Navbar />
      <div className={styles.produtoPage}>
        <div className={styles.imageWrapper}>
          <img src={produto.imagem} alt={produto.nome} />
        </div>
        <div className={styles.infoWrapper}>
          <h1>{produto.nome}</h1>
          <p className={styles.descricao}>{produto.descricao}</p>
          <p className={styles.preco}>R$ {produto.preco.toFixed(2)}</p>
          <div className={styles.tamanhoSelector}>
            <label htmlFor="tamanho">Tamanho:</label>
            <select
              id="tamanho"
              value={tamanho}
              onChange={e => setTamanho(e.target.value)}
            >
              <option value="P">P</option>
              <option value="M">M</option>
              <option value="G">G</option>
              <option value="GG">GG</option>
            </select>
          </div>
          <button className={styles.botao} onClick={handleAddToCart}>
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </>
  );
}
