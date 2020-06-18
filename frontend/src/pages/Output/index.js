import React, {useState, useEffect} from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiLogOut, FiList } from 'react-icons/fi';

import logoImg from '../../assets/LOGO.png';

import api from '../../services/api';

import './styles.css';

export default function SimpleTable() {

  const history = useHistory();

  let rows = [];
  const [outputs, setOutputs] = useState([]);

  useEffect(() => {
    api.get('outputGroupPedido').then(response => {
      setOutputs(response.data);
    })
  }, [] );

  rows = outputs;

  function handleHome() {
    history.push('/home');
  }

  function handleLogout() {
      localStorage.clear();
      history.push('/');
  }

  return (
      <>
        <header>
          <img src={logoImg} alt="FrigLuz" onClick={handleHome}/>
          <Link className="button" to="/output/new">Lançamento</Link>
          <button type="button" onClick={handleLogout}>
              <FiLogOut size={30} color="#FFB357"/>
          </button>
        </header>
          <h1 className="title">Pedidos de Saída</h1>
          <div className="table-output">
            <table>
              <tr>
                <th>Pedido</th>
                <th align="right">Cliente</th>
                <th align="right">Data do pedido</th>
                <th align="right">Data&nbsp;de&nbsp;Vencimento</th>
                <th align="right">Forma de Pagamento</th>
                <th align="right">Detalhes</th>
              </tr>
              {rows.map((row) => (
                <tr key={row.lote}>
                  <td component="th">{row.pedido}</td>
                  <td align="right">{row.corpname}</td>
                  <td align="right">{row.date}</td>
                  <td align="right">{row.deadline}</td>
                  <td align="right">{row.payment}</td>
                  <td align="right">
                    <Link
                      to={{
                        pathname: `/output/detail/${row.pedido}`,
                        state: { lote:row.pedido }
                      }}
                    >
                      <FiList className={"icons"} size={25} color={"#FFB357"}/>
                    </Link>
                  </td>
                </tr>
              ))}
            </table>
          </div>
      </>
  );
}