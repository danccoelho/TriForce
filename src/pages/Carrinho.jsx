// src/pages/Carrinho.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import styles from '../styles/carrinho.module.css';

export default function Carrinho() {
  const {
    carrinho,
    removerDoCarrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    limparCarrinho
  } = useCart();

  const total = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Seu Carrinho</h1>

        {carrinho.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <>
            <ul className={styles.lista}>
              {carrinho.map((item, index) => (
                <li key={index} className={styles.item}>
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className={styles.imagem}
                  />
                  <div className={styles.info}>
                    <h3>{item.nome}</h3>
                    {item.tamanho && <p>Tamanho: {item.tamanho}</p>}
                    <p>R$ {item.preco.toFixed(2)}</p>
                    <div className={styles.qtd}>
                      <button onClick={() => diminuirQuantidade(item.id)}>-</button>
                      <span>{item.quantidade}</span>
                      <button onClick={() => aumentarQuantidade(item.id)}>+</button>
                    </div>
                    <button
                      className={styles.btnRemover}
                      onClick={() => removerDoCarrinho(item.id)}
                    >
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.resumo}>
              <h3>Total: R$ {total.toFixed(2)}</h3>
              <button onClick={limparCarrinho}>Esvaziar Carrinho</button>
              <button>Finalizar Compra</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
