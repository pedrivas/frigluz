import React, { useState } from 'react';
import { Link, useHistory,  } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import frigImg from '../../assets/FRIGLUZ.png';

export default function NewSupplier() {
    const [corpname, setCorpname] = useState('');
    const [phone , setPhone] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [email , setEmail] = useState('');
    const [cnpj , setCnpj] = useState('');
    const [cep , setCep] = useState('');
    const history = useHistory();

    async function handleNewSupplier(e) {
        e.preventDefault();

        const data = {
            corpname,
            phone, 
            contact,
            address,
            email, 
            cnpj,
            cep 
        }

        try {
            const response = await api.post('supplier', data);
            history.push('/suppliers')
        } catch (err) {
            alert(`Erro no cadastro. Verifique os dados e tente novamente.`)
        }
    }

    return(
        <div className="new-supplier">
            <div className="content">
                <section>
                    <h1>Cadastro de Fornecedor</h1>
                    <p>Informe os dados para cadastro no sistema</p>
                    <img className="Logo" src={frigImg} alt="logo frig"/>
                    <Link to="/suppliers"> 
                    <FiArrowLeft size={25} color="#FFB357"/>
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleNewSupplier}>
                    <input
                        placeholder="Nome"
                        value={corpname}
                        onChange={e => setCorpname(e.target.value)}
                    />
                    <input
                        placeholder="Telefone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    <input
                        placeholder="Contato"
                        value={contact}
                        onChange={e => setContact(e.target.value)}
                    />
                    <input
                        placeholder="Endereço"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="CNPJ"
                        value={cnpj}
                        onChange={e => setCnpj(e.target.value)}
                    />
                    <input
                        placeholder="CEP"
                        value={cep}
                        onChange={e => setCep(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>    
        </div>
    )
}