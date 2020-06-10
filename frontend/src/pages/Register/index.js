import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import frigImg from '../../assets/FRIGLUZ.png';

export default function Register() {
    const [nick, setNick] = useState('');
    const [pass, setPass] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            nick,
            pass
        };
        try {
            const response = await api.post('users', data);

            alert(`Usuário ${data.nick} cadastrado com sucesso`);

            history.push('/');
        } catch (err) {
            alert(`Erro no cadastro. Tente novamente.`)
        }

    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <h1>Cadastro de Usuário</h1>
                    <p>Informe seus dados para cadastro no sistema</p>
                    <img className="Logo" src={frigImg} alt="logo frig"/>
                    <Link to="/"> 
                    <FiArrowLeft size={25} color="#FFB357"/>
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
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
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>    
        </div>
    )
}