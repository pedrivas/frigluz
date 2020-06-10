import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import frigImg from '../../assets/FRIGLUZ.png';

export default function Logon() {
    const [nick, setNick] = useState('');
    const [pass, setPass] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        const data = {
            nick,
            pass
        }

        try {
            const response = await api.post('session', data);

            localStorage.setItem('userName', nick)

            history.push('/home');
        } catch (err) {
            alert(`Dados inválidos. Tente novamente.`);
        }
    }


    return(
        <div className="logon-container">
            <section className="form">
                <h1>Sistema de Gerenciamento de Fluxo de Produtos</h1>
                <form onSubmit={handleLogin}>
                    <h2>Faça Seu Logon</h2>
                    <input
                        placeholder="Nome de usuário"
                        value={nick}
                        onChange={e => setNick(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link to="/register"> 
                    <FiLogIn size={16} color="#FFB357"/>
                        Não tenho cadastro
                    </Link>

                </form>
            </section>
            <img src={frigImg} alt="frigluz"/>
        </div>
    )
}