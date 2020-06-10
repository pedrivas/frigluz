import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'

import logoImg from '../../assets/LOGO.png'

import api from '../../services/api';

import './styles.css'

export default function Products() {
    const [products, setProducts] = useState([]);

    const history = useHistory();
    
    useEffect(() => {
        api.get('product').then(response => {
            setProducts(response.data);
        })
    }, [] );

    function handleHome() {
        history.push('/home');
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="products-container">
            <header>
                <img src={logoImg} alt="FrigLuz" onClick={handleHome}/>
                <Link className="button" to="/products/new">Cadastrar novo produto</Link>
                <button type="button" onClick={handleLogout}>
                    <FiLogOut size={30} color="#FFB357"/>
                </button>
            </header>

            <h1>Produtos</h1>

            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <strong>Descrição</strong>
                        <p>{product.description}</p>
                        <strong>Matéria Prima</strong>
                        <p>{product.mp}</p>
                    </li> 
                ))}
            </ul>

        </div>
    )
}