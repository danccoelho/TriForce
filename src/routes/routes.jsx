import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Natacao from '../pages/Natacao';
import ProdutoNatacao from '../pages/ProdutoNatacao';
import Carrinho from '../pages/Carrinho';
import Ciclismo from '../pages/Ciclismo';
import ProdutoCiclismo from '../pages/ProdutoCiclismo';
import Corrida from '../pages/Corrida';
import ProdutoCorrida from '../pages/ProdutoCorrida';



const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element= {<Home/>} />
      <Route path="/Login" element= {<Login/>} />
      <Route path="/Cadastro" element= {<Cadastro/>} />
      <Route path="/Natacao" element={<Natacao/>} />
      <Route path="/Natacao/produto/:id" element={<ProdutoNatacao />} />
      <Route path="/ciclismo" element={<Ciclismo />} />
      <Route path="/produto-ciclismo/:id" element={<ProdutoCiclismo />} />
      <Route path="/corrida" element={<Corrida />} />
      <Route path="/produtoCorrida/:id" element={<ProdutoCorrida />} />
      <Route path="/carrinho" element={<Carrinho />} />

    </Routes>
  </BrowserRouter>
);

export default Router;