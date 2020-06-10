import React, { useState } from 'react';
import { Link, useHistory,  } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import frigImg from '../../assets/FRIGLUZ.png';

export default function NewCustomer() {
    const [corpname, setCorpname] = useState('');
    const [phone , setPhone] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [email , setEmail] = useState('');
    const [cnpj , setCnpj] = useState('');
    const [cep , setCep] = useState('');
    const [salesman , setSalesman] = useState('');
    const [deadline , setDeadline] = useState('');
    const history = useHistory();

    async function handleNewCustomer(e) {
        e.preventDefault();

        const data = {
            corpname,
            phone, 
            contact,
            address,
            email, 
            cnpj,
            cep,
            salesman,
            deadline 
        }

        try {
            const response = await api.post('customer', data);
            history.push('/customers')
        } catch (err) {
            alert(`Erro no cadastro. Verifique os dados e tente novamente.`)
        }
    }

    return(
        <div className="new-customer">
            <div className="content">
                <section>
                    <h1>Cadastro de Cliente</h1>
                    <p>Informe os dados para cadastro no sistema</p>
                    <img className="Logo" src={frigImg} alt="logo frig"/>
                    <Link to="/customers"> 
                    <FiArrowLeft size={25} color="#FFB357"/>
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleNewCustomer}>
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                    <div>
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
                        <input
                            placeholder="Vendedor"
                            value={salesman}
                            onChange={e => setSalesman(e.target.value)}
                        />
                        <input
                            placeholder="Prazo Padrão"
                            value={deadline}
                            onChange={e => setDeadline(e.target.value)}
                        />
                    </div>
                    <button className="buttonCustomer" type="submit">Cadastrar</button>
                </form>
            </div>    
        </div>
    )
}