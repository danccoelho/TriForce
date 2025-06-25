import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MdFavoriteBorder,
  MdShoppingCart,
  MdPerson,
  MdSearch,
} from 'react-icons/md';
import styles from '../styles/navbar.module.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const { usuario, logout } = useAuth(); // 👈 Verifica se o usuário está 
  console.log('Usuário logado?', usuario);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">Triforce</Link>
      </div>

      <div className={styles.searchBox}>
        <MdSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <nav className={styles.navIcons}>
        <Link to="/favorito" aria-label="Favoritos">
          <MdFavoriteBorder />
        </Link>
        <Link to="/carrinho" aria-label="Carrinho">
          <MdShoppingCart />
        </Link>

        <div
          className={styles.profileWrapper}
          ref={profileRef}
          tabIndex={0}
          aria-label="Perfil"
        >
          <MdPerson
            className={`${styles.profileIcon} ${usuario ? styles.loggedIn : styles.notLoggedIn}`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          />
          {dropdownOpen && (
            <div className={styles.profileDropdown}>
              <Link to="/login" onClick={() => setDropdownOpen(false)}>
                Minha Conta
              </Link>
              <Link to="/pedidos" onClick={() => setDropdownOpen(false)}>
                Pedidos
              </Link>
              <Link
                to="#"
                onClick={() => {
                  logout();            // Limpa o contexto do usuário
                  setDropdownOpen(false);
                  navigate('/');       // Redireciona para a Home
                }}
                >
                 Sair
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
