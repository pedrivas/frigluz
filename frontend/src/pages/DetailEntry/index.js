import React, {useState, useEffect, useCallback} from 'react';
import Paper from '@material-ui/core/Paper';

import { Link, useHistory, useParams } from 'react-router-dom';
import { FiLogOut, FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/LOGO.png';

import api from '../../services/api';

import './styles.css';

const DetailEntry = () => {

  const history = useHistory();

  const { lote } = useParams(); 
  let rows = [];
  const [entrys, setEntrys] = useState([]);
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    api.get(`entry?lote=${lote}`).then(response => {
      setEntrys(response.data);
    })
  }, [lote] );

  useEffect(() => {
    api.get(`entryGroupLote?lote=${lote}`).then(response => {
      setInfos(response.data);    })
  }, [ lote] );  

  rows = entrys;

  function handleHome() {
    history.push('/home');
  }

  function handleLogout() {
      localStorage.clear();
      history.push('/');
  }

  return (
    <>
      <header className="header-detail-entry">
        <img src={logoImg} alt="FrigLuz" onClick={handleHome}/>
        <Link to="/entry"> 
          <FiArrowLeft size={25} color="#FFB357"/>
          Voltar
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiLogOut size={30} color="#FFB357"/>
        </button>
      </header>

      <h1 className="title">Detalhes do Lote</h1>

      <div className="detailEntry-container">
        <section className="fields">
          {infos.map((info) => (
              <>
                <div>
                  <strong>Lote</strong>
                  <p>{info.lote}</p>
                  <strong>Fornecedor</strong>
                  <p>{info.corpname}</p>
                  <strong>Data Faturamento</strong>
                  <p>{info.bildate}</p>
                  <br/>
                  <strong>Data Vencimento</strong>
                  <p>{info.expdate}</p>
                </div>
                <div>
                  <strong>Osso(kg)</strong>
                  <p>{info.bones}</p>
                  <strong>Faltante(kg)</strong>
                  <p>{info.missing}</p>
                  <br></br>
                  <strong>Remessa Kassel</strong>
                  <p>{info.kassel}</p>
                  <strong>NF Devolução</strong>
                  <p>{info.nf}</p>
                </div>
              </>
              ))}
          
        </section>
      </div>

      <h2 className="title">Matéria-Prima</h2>
      <div className="table-entry">
        <table>
            <tr>
              <th align="right">Matéria Prima</th>
              <th align="right">Quantidade</th>
              <th align="right">Valor&nbsp;Unitário</th>
              <th align="right">Valor Total</th>
            </tr>
            {rows.map((row) => (
              <tr key={row.mp}>
                <td component="th" scope="row" align="right">
                  {row.mp}
                </td>
                <td align="right">{row.quantitymp}</td>
                <td align="right">{row.valuemp}</td>
                <td align="right">{row.quantitymp*row.valuemp}</td>
              </tr>
            ))}
        </table>
      </div>
      <h2 className="title">Produtos</h2>
      <div className="table-entry">
        <table>
            <tr>
              <th align="right">Produto</th>
              <th align="right">Quantidade</th>
              <th align="right">P.M.C.</th>
            </tr>
            {rows.map((row) => (
              <tr key={row.product}>
                <td align="right">{row.productDescription}</td>
                <td align="right">{row.quantitypr}</td>
                <td align="right">{row.valuepr}</td>
              </tr>
            ))}
        </table>
      </div>
    </>
  );
}
export default DetailEntry;