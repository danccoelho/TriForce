import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MdFavoriteBorder,
  MdShoppingCart,
  MdPerson,
  MdSearch,
  MdWaterDrop,
  MdDirectionsBike,
  MdDirectionsRun,
} from 'react-icons/md';
import styles from '../styles/home.module.css';
import { useAuth } from '../context/AuthContext'; // 👈 Importa o contexto
import { useNavigate } from 'react-router-dom';

export default function Home() {
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
    <>
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
                <Link to="/Login" onClick={() => setDropdownOpen(false)}>
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

      <main className={styles.catalog}>
        <Link to="/natacao" className={styles.catalogItem} aria-label="Natação">
          <MdWaterDrop className={styles.catalogIcon} />
          <h3>Natação</h3>
          <p>Equipamentos e acessórios para nadadores.</p>
        </Link>

        <Link to="/ciclismo" className={styles.catalogItem} aria-label="Ciclismo">
          <MdDirectionsBike className={styles.catalogIcon} />
          <h3>Ciclismo</h3>
          <p>Bikes, roupas e componentes para ciclistas.</p>
        </Link>

        <Link to="/corrida" className={styles.catalogItem} aria-label="Corrida">
          <MdDirectionsRun className={styles.catalogIcon} />
          <h3>Corrida</h3>
          <p>Tênis, roupas e acessórios para corredores.</p>
        </Link>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <h2>Triforce</h2>
            <p>Equipamentos de elite para atletas de triathlon.</p>
          </div>

          <div className={styles.footerLinks}>
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Uso</a>
            <a href="#">Contato</a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} Triforce. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
