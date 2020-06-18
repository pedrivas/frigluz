import React from 'react';
import { Link ,useHistory } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'

import logoImg from '../../assets/LOGO.png'
import frigImg from '../../assets/FRIGLUZ.png'

import './styles.css'

export default function Home() {

    const history = useHistory();
    const user = localStorage.getItem('userName')

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="home-container">
            <header>
                <img src={logoImg} alt="FrigLuz" />
                <span>Bem vindo, {user}</span>
                <button type="button" onClick={handleLogout}>
                    <FiLogOut size={30} color="#FFB357"/>
                </button>
            </header>
            <div className="home-content">
                <section>
                    <h2>Cadastros</h2>
                    <p>
                        <Link className="link" to="/suppliers">Fornecedores</Link>
                    </p>
                    <p>
                        <Link className="link" to="/customers">Clientes</Link>
                    </p>
                        <Link className="link" to="/products">Produtos</Link>
                    <h2>Lançamentos</h2>
                    <p>
                        <Link className="link" to="/entry">Entrada</Link>
                    </p>    
                    <p>
                        <Link className="link" to="/output">Saída</Link>
                    </p>
                    <h2>Relatórios</h2>
                    <p>
                        <Link className="link" to="/">Balancete</Link>
                    </p>
                    <p>
                        <Link className="link" to="/">Estoque</Link> 
                    </p>
                </section>
                <img className="imagem" src={frigImg} alt="FrigLuz"/>
            </div>
        </div>
    )
}