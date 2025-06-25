import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from '../styles/produtoNatacao.module.css';
import maioAdidasImg from '../assets/maioAdidas.jpg';
import maioMImg from '../assets/maioMjpg.jpg';

import sungaAdidasImg from '../assets/SungaAdidas.jpg';
import sungaMmImg from '../assets/sungaMormaijpg.jpg';

import toucaMImg from '../assets/toucaM.jpg';
import toucaAdidasImg from '../assets/toucaAdidas.jpg';

import oculosAdidasImg from '../assets/oculosAdidas.jpg';
import oculosMImg from '../assets/oculosM.jpg';

import { useCart } from '../context/CartContext';

const produtos = [
  {
    id: '1',
    nome: 'Maiô Adidas',
    preco: 159.9,
    imagem: maioAdidasImg,
    descricao: 'Maiô de alta performance para competições profissionais.',
    tamanhos: ['P', 'M', 'G', 'GG'],
  },
  {
    id: '2',
    nome: 'Sunga Adidas',
    preco: 129.9,
    imagem: sungaAdidasImg,
    descricao: 'Sunga resistente e anatômica para treinos intensos.',
    tamanhos: ['P', 'M', 'G'],
  },
  {
    id: '3',
    nome: 'Óculos Leader',
    preco: 129.9,
    imagem: oculosAdidasImg,
    descricao: 'Óculos antifog para nadadores exigentes.',
    tamanhos: [],
  },
  {
    id: '4',
    nome: 'Touca Adidas',
    preco: 129.9,
    imagem: toucaAdidasImg,
    descricao: 'Touca leve e confortável para treinos.',
    tamanhos: [],
  },
  {
    id: '5',
    nome: 'Maiô Mormai',
    preco: 159.9,
    imagem: maioMImg,
    descricao: 'Maiô de alta performance para competições profissionais.',
    tamanhos: ['P', 'M', 'G', 'GG'],
  },
  {
    id: '6',
    nome: 'Sunga Mormai',
    preco: 159.9,
    imagem: sungaMmImg,
    descricao: 'Sunga anatômica e durável.',
    tamanhos: ['P', 'M', 'G'],
  },
  {
    id: '7',
    nome: 'Óculos Mormai',
    preco: 159.9,
    imagem: oculosMImg,
    descricao: 'Óculos de alta performance com proteção UV.',
    tamanhos: [],
  },
  {
    id: '8',
    nome: 'Touca Mormai',
    preco: 159.9,
    imagem: toucaMImg,
    descricao: 'Touca leve para maior desempenho.',
    tamanhos: [],
  },
];

export default function ProdutoNatacao() {
  const { id } = useParams();
  const produto = produtos.find(p => p.id === id);
  const { adicionarAoCarrinho } = useCart();
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState('');

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
    if (produto.tamanhos.length > 0 && !tamanhoSelecionado) {
      alert('Selecione um tamanho!');
      return;
    }

    adicionarAoCarrinho({
      ...produto,
      tamanho: tamanhoSelecionado,
    });

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

          {produto.tamanhos.length > 0 && (
            <div className={styles.tamanhoWrapper}>
              <label htmlFor="tamanho">Tamanho:</label>
              <select
                id="tamanho"
                value={tamanhoSelecionado}
                onChange={e => setTamanhoSelecionado(e.target.value)}
              >
                <option value="">Selecione</option>
                {produto.tamanhos.map(t => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button className={styles.botao} onClick={handleAddToCart}>
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </>
  );
}
