import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import api from '../../services/api';
import './styles.css';

import frigImg from '../../assets/FRIGLUZ.png';

export default function NewProduct() {
    const [description, setDescription] = useState('');
    const [mp, setMp] = useState('');

    const history = useHistory();

    async function handleNewProduct(e) {
        e.preventDefault();

        const data = {
            description,
            mp
        }

        try {
            const response = await api.post('product', data);
            history.push('/products')
        } catch (err) {
            alert(`Erro no cadastro. Tente novamente.`)
        }
    }

    return(
        <div className="new-product">
            <div className="content">
                <section>
                    <h1>Cadastro de Produto</h1>
                    <p>Informe os dados para cadastro no sistema</p>
                    <img className="Logo" src={frigImg} alt="logo frig"/>
                    <Link to="/products"> 
                    <FiArrowLeft size={25} color="#FFB357"/>
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleNewProduct}>
                    <input
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <Select
                        className="select"
                        displayEmpty
                        value={mp}
                        onChange={e => setMp(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>MATÉRIA PRIMA</em>
                        </MenuItem>
                        <MenuItem value = "DIANTEIRO">DIANTEIRO</MenuItem>
                        <MenuItem value = "TRASEIRO">TRASEIRO</MenuItem>
                        <MenuItem value = "PONTA DE AGULHA">PONTA DE AGULHA</MenuItem>
                        <MenuItem value = "BOI CASADO">BOI CASADO</MenuItem>
                        <MenuItem value = "CARNE DESSOSSADA TRASEIRO">CARNE DESSOSSADA TRASEIRO</MenuItem>
                        <MenuItem value = "CARNE DESSOSSADA DIANTEIRO">CARNE DESSOSSADA DIANTEIRO</MenuItem>
                        <MenuItem value = "CARNE DESSOSSADA PONTA DE AGULHA">CARNE DESSOSSADA PONTA DE AGULHA</MenuItem>
                        <MenuItem value = "CARNE DESSOSSADA">CARNE DESSOSSADA</MenuItem>
                    </Select>
                    {/* <input
                        placeholder="Matéria Prima"
                        value={mp}
                        onChange={e => setMp(e.target.value)}
                    /> */}
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>    
        </div>
    )
}