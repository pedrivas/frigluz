import React, {useState, useEffect} from 'react';

import { Link, useHistory, useParams } from 'react-router-dom';
import { FiLogOut, FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/LOGO.png';

import api from '../../services/api';

import './styles.css';

const DetailOutput = () => {

  const history = useHistory();

  const { pedido } = useParams(); 
  let rows = [];
  const [outputs, setOutputs] = useState([]);
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    api.get(`output?pedido=${pedido}`).then(response => {
      setOutputs(response.data);
    })
  }, [pedido] );

  useEffect(() => {
    api.get(`outputGroupPedido?pedido=${pedido}`).then(response => {
      setInfos(response.data);    })
  }, [ pedido] );  

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
      <header className="header-detail-output">
        <img src={logoImg} alt="FrigLuz" onClick={handleHome}/>
        <Link to="/output"> 
          <FiArrowLeft size={25} color="#FFB357"/>
          Voltar
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiLogOut size={30} color="#FFB357"/>
        </button>
      </header>

      <h1 className="title">Detalhes do Pedido</h1>

      <div className="detailOutput-container">
        <section className="fields">
          {infos.map((info) => (
              <>
                <div>
                  <strong>Pedido</strong>
                  <p>{info.pedido}</p>
                  <strong>Cliente</strong>
                  <p>{info.corpname}</p>
                  <strong>Data do Pedido</strong>
                  <p>{info.date}</p>
                  <br/>
                </div>
                <div>
                  <strong>Data Vencimento</strong>
                  <p>{info.deadline}</p>
                  <strong>Forma de Pagamento</strong>
                  <p>{info.payment}</p>
                </div>
              </>
              ))}
          
        </section>
      </div>

      <h2 className="title">Produtos</h2>
      <div className="table-output">
        <table>
            <tr>
              <th align="right">Matéria Prima</th>
              <th align="right">Produto</th>
              <th align="right">Lote</th>
              <th align="right">Quantidade(kgs)</th>
              <th align="right">Valor&nbsp;Unitário</th>
              <th align="right">Valor Total</th>
              <th align="right">Embalagem</th>
              <th align="right">Volumes</th>
            </tr>
            {rows.map((row) => (
              <tr key={row.id}>
                <td component="th" align="right">{row.mp}</td>
                <td align="right">{row.productDescription}</td>
                <td align="right">{row.entry_lote}</td>
                <td align="right">{row.quantity}</td>
                <td align="right">{row.value}</td>
                <td align="right">{row.quantity*row.value}</td>
                <td align="right">{row.packing}</td>
                <td align="right">{row.volume}</td>
              </tr>
            ))}
        </table>
      </div>
    </>
  );
}
export default DetailOutput;