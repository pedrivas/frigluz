import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut, FiEdit } from 'react-icons/fi'

import logoImg from '../../assets/LOGO.png'

import api from '../../services/api';

import './styles.css'

export default function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);

    const history = useHistory();
    
    useEffect(() => {
        api.get('supplier').then(response => {
            setSuppliers(response.data);
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
        <div className="suppliers-container">
            <header>
                <img src={logoImg} alt="FrigLuz" onClick={handleHome}/>
                <Link className="button" to="/suppliers/new">Cadastrar novo fornecedor</Link>
                <button type="button" onClick={handleLogout}>
                    <FiLogOut size={30} color="#FFB357"/>
                </button>
            </header>

            <h1>Fornecedores</h1>

            <ul>
                {suppliers.map(supplier => (
                    <li key={supplier.id}>
                        <strong>Fornecedor</strong>
                        <p>{supplier.corpname}</p>
                        <strong>CNPJ</strong>
                        <p>{supplier.cnpj}</p>
                        <strong>Telefone</strong>
                        <p>{supplier.phone}</p>
                        <strong>E-mail</strong>
                        <p>{supplier.email}</p>
                        <strong>Contato</strong>
                        <p>{supplier.contact}</p>
                        <strong>Endereço</strong>
                        <p>{supplier.address}</p>
                        <strong>CEP</strong>
                        <p>{supplier.cep}</p>
                        <button className="modify" >
                            <FiEdit size={30} color="#FFB357"/>
                        </button>
                    </li> 
                ))}
            </ul>

        </div>
    )
}