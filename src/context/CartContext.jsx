// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho(prevCarrinho => {
      const existente = prevCarrinho.find(item => item.id === produto.id);
      if (existente) {
        return prevCarrinho.map(item =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        return [...prevCarrinho, { ...produto, quantidade: 1 }];
      }
    });
  };

  const removerDoCarrinho = (id) => {
    setCarrinho(prev => prev.filter(item => item.id !== id));
  };

  const aumentarQuantidade = (id) => {
    setCarrinho(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  };

  const diminuirQuantidade = (id) => {
    setCarrinho(prev =>
      prev.map(item =>
        item.id === id && item.quantidade > 1
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
    );
  };

  const limparCarrinho = () => setCarrinho([]);

  return (
    <CartContext.Provider
      value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, aumentarQuantidade, diminuirQuantidade, limparCarrinho }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
