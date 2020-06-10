import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut, FiEdit } from 'react-icons/fi'

import logoImg from '../../assets/LOGO.png'

import api from '../../services/api';

import './styles.css'

export default function Customers() {
    const [customers, setCustomers] = useState([]);

    const history = useHistory();
    
    useEffect(() => {
        api.get('customer').then(response => {
            setCustomers(response.data);
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
        <div className="customers-container">
            <header>
                <img src={logoImg} alt="FrigLuz" onClick={handleHome}/>
                <Link className="button" to="/customers/new">Cadastrar novo cliente</Link>
                <button type="button" onClick={handleLogout}>
                    <FiLogOut size={30} color="#FFB357"/>
                </button>
            </header>

            <h1>Clientes</h1>

            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>
                        <strong>Cliente</strong>
                        <p>{customer.corpname}</p>
                        <strong>CNPJ</strong>
                        <p>{customer.cnpj}</p>
                        <strong>Telefone</strong>
                        <p>{customer.phone}</p>
                        <strong>E-mail</strong>
                        <p>{customer.email}</p>
                        <strong>Contato</strong>
                        <p>{customer.contact}</p>
                        <strong>Endereço</strong>
                        <p>{customer.address}</p>
                        <strong>CEP</strong>
                        <p>{customer.cep}</p>
                        <strong>Vendedor</strong>
                        <p>{customer.salesman}</p>
                        <strong>Prazo Padrão</strong>
                        <p>{customer.deadline}</p>
                        <button className="modify" >
                            <FiEdit size={30} color="#FFB357"/>
                        </button>
                    </li> 
                ))}
            </ul>

        </div>
    )
}