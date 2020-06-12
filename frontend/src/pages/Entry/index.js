import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Link, useHistory } from 'react-router-dom';
import { FiLogOut, FiList } from 'react-icons/fi';

import logoImg from '../../assets/LOGO.png';

import api from '../../services/api';

import './styles.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable() {
  const classes = useStyles();

  const history = useHistory();

  let rows = [];
  const [entrys, setEntrys] = useState([]);

  useEffect(() => {
    api.get('entryGroupLote').then(response => {
      setEntrys(response.data);
    })
  }, [] );

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
        <Link className="button" to="/entry/new">Lançamento</Link>
        <button type="button" onClick={handleLogout}>
            <FiLogOut size={30} color="#FFB357"/>
        </button>
      </header>

      <h1 className="title">Lotes de Entrada</h1>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Lote</TableCell>
              <TableCell align="right">Fornecedor</TableCell>
              <TableCell align="right">Data&nbsp;de&nbsp;Faturamento</TableCell>
              <TableCell align="right">Data&nbsp;de&nbsp;Expedição</TableCell>
              <TableCell align="right">Nota Fiscal</TableCell>
              <TableCell align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.lote}>
                <TableCell component="th" scope="row">
                  {row.lote}
                </TableCell>
                <TableCell align="right">{row.corpname}</TableCell>
                <TableCell align="right">{row.bildate}</TableCell>
                <TableCell align="right">{row.expdate}</TableCell>
                <TableCell align="right">{row.nf}</TableCell>
                <TableCell align="right">
                  <Link
                    to={{
                      pathname: `/entry/detail/${row.lote}`,
                      state: { lote:row.lote }
                    }}
                  >
                    <FiList className={"icons"} size={25}/>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}