import React, {useState, useEffect, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Link, useHistory, useParams } from 'react-router-dom';
import { FiLogOut, FiEdit, FiList } from 'react-icons/fi';

import logoImg from '../../assets/LOGO.png';

import api from '../../services/api';

import './styles.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const DetailEntry = () => {
  const classes = useStyles();

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
      <header>
        <img src={logoImg} alt="FrigLuz" onClick={handleHome}/>
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

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Matéria Prima</TableCell>
              <TableCell align="right">Quantidade</TableCell>
              <TableCell align="right">Valor&nbsp;Unitário</TableCell>
              <TableCell align="right">Valor Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.mp}>
                <TableCell component="th" scope="row" align="right">
                  {row.mp}
                </TableCell>
                <TableCell align="right">{row.quantitymp}</TableCell>
                <TableCell align="right">{row.valuemp}</TableCell>
                <TableCell align="right">{row.quantitymp*row.valuemp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h2 className="title">Produtos</h2>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Produto</TableCell>
              <TableCell align="right">Quantidade</TableCell>
              <TableCell align="right">P.M.C.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.product}>
                <TableCell align="right">{row.product}</TableCell>
                <TableCell align="right">{row.quantitypr}</TableCell>
                <TableCell align="right">{row.valuepr}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </>
  );
}
export default DetailEntry;