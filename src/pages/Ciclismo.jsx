import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from '../styles/ciclismo.module.css';

// Importe suas imagens corretamente
import capaceteImg from '../assets/capacete.jpg';
import bicicletaCerveloImg from '../assets/bikeCervelo.jpg';
import luvaImg from '../assets/luva.jpg';
import roupaImg from '../assets/roupa.jpg';

const produtosCiclismo = [
  {
    id: '1',
    nome: 'Capacete de Ciclismo',
    preco: 199.9,
    imagem: capaceteImg,
    descricao: 'Capacete leve e seguro para ciclistas profissionais.',
  },
  {
    id: '2',
    nome: 'Bicicleta Speed 700',
    preco: 2999.9,
    imagem: bicicletaCerveloImg,
    descricao: 'Bicicleta aerodinâmica com câmbio Shimano.',
  },
  {
    id: '3',
    nome: 'Luva Antiderrapante',
    preco: 89.9,
    imagem: luvaImg,
    descricao: 'Luva com proteção e conforto para pedaladas longas.',
  },
  {
    id: '4',
    nome: 'Roupa de Ciclismo Pro',
    preco: 249.9,
    imagem: roupaImg,
    descricao: 'Roupa confortável com tecido dry-fit e aerodinâmica.',
  },
  {
    id: '1',
    nome: 'Capacete de Ciclismo',
    preco: 199.9,
    imagem: capaceteImg,
    descricao: 'Capacete leve e seguro para ciclistas profissionais.',
  },
  {
    id: '2',
    nome: 'Bicicleta Speed 700',
    preco: 2999.9,
    imagem: bicicletaCerveloImg,
    descricao: 'Bicicleta aerodinâmica com câmbio Shimano.',
  },
  {
    id: '3',
    nome: 'Luva Antiderrapante',
    preco: 89.9,
    imagem: luvaImg,
    descricao: 'Luva com proteção e conforto para pedaladas longas.',
  },
  {
    id: '4',
    nome: 'Roupa de Ciclismo Pro',
    preco: 249.9,
    imagem: roupaImg,
    descricao: 'Roupa confortável com tecido dry-fit e aerodinâmica.',
  },
];

export default function Ciclismo() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.titulo}>Ciclismo</h1>
        <div className={styles.grid}>
          {produtosCiclismo.map(produto => (
            <Link
              key={produto.id}
              to={`/produto-ciclismo/${produto.id}`}
              className={styles.card}
            >
              <img src={produto.imagem} alt={produto.nome} />
              <h3>{produto.nome}</h3>
              <p className={styles.preco}>R$ {produto.preco.toFixed(2)}</p>
              <p className={styles.desc}>{produto.descricao}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
