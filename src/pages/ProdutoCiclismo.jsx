import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from '../styles/produtoCiclismo.module.css'; // reutilizando o estilo
import { useCart } from '../context/CartContext';

// Imagens
import capaceteImg from '../assets/capacete.jpg';
import bicicletaCerveloImg from '../assets/bikeCervelo.jpg';
import luvaImg from '../assets/luva.jpg';
import roupaImg from '../assets/roupa.jpg'


const produtos = [
  {
    id: '1',
    nome: 'Capacete de Ciclismo',
    preco: 199.9,
    imagem: capaceteImg,
    descricao: 'Capacete leve e seguro para ciclistas profissionais.',
    tamanhos: ['Único'],
  },
  {
    id: '2',
    nome: 'Bicicleta Speed 700',
    preco: 2999.9,
    imagem: bicicletaCerveloImg,
    descricao: 'Bicicleta aerodinâmica com câmbio Shimano.',
    tamanhos: ['P', 'M', 'G'],
  },
  {
    id: '3',
    nome: 'Luva Antiderrapante',
    preco: 89.9,
    imagem: luvaImg,
    descricao: 'Luva com proteção e conforto para pedaladas longas.',
    tamanhos: ['P', 'M', 'G'],
  },
  {
    id: '4',
    nome: 'Roupa de Ciclismo Pro',
    preco: 249.9,
    imagem: roupaImg,
    descricao: 'Roupa confortável com tecido dry-fit e aerodinâmica.',
    tamanhos: ['P', 'M', 'G'],
  },
];

export default function ProdutoCiclismo() {
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
    if (produto.tamanhos.length > 1 && !tamanhoSelecionado) {
      alert('Selecione um tamanho antes de adicionar ao carrinho.');
      return;
    }

    adicionarAoCarrinho({ ...produto, tamanho: tamanhoSelecionado || 'Único' });
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

          {produto.tamanhos.length > 1 && (
            <div className={styles.tamanhoSelector}>
              <label>Selecione o tamanho:</label>
              <select
                value={tamanhoSelecionado}
                onChange={e => setTamanhoSelecionado(e.target.value)}
              >
                <option value="">-- Escolha --</option>
                {produto.tamanhos.map(t => (
                  <option key={t} value={t}>{t}</option>
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
