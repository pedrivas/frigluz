import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiPlusCircle } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import frigImg from '../../assets/FRIGLUZ.png';

export default function NewOutput() {
  const [pedido, setPedido]             = useState('');
  const [entry_lote, setEntryLote]      = useState('');
  const [customer, setCustomer]         = useState('');
  const [date, setDate]                 = useState('');
  const [mp, setMp]                     = useState('');
  const [product, setProduct]           = useState(0);
  const [packing, setPacking]           = useState('');
  const [quantity, setQuantity]         = useState('');
  const [value, setValue]               = useState('');
  const [volume, setVolume]             = useState('');
  const [payment, setPayment]           = useState('');
  const [deadline, setDeadline]         = useState('');

  const [customerList, setCustomerList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [itemsList, setItemsList]       = useState([]);
  const [filteredMp, setFilteredMp]     = useState([]);

  const [entrys, setEntrys]             = useState([]);
  const [outputs, setOutputs]           = useState([]);

  const history = useHistory();

  useEffect(() => {
    api.get('outputMaxPedido').then(response => {
      if (response.data[0].maxPedido){
        setPedido(((parseInt(response.data[0].maxPedido)+1).toString()).padStart(3,'0'));
      } else {
        setPedido('000');
      }
    })
  }, [] );

  useEffect(() => {
    api.get('customer').then(response => {
      setCustomerList(response.data);
    })
  }, [] );

  useEffect(() => {
    api.get('product').then(response => {
      if (product!==0){
        const newMp = response.data.filter(prod => prod.id === Number(product));
        setFilteredMp(newMp[0].mp);
      } else {
        setProductsList(response.data);
        setFilteredMp('');
      }
    })
  }, [product] );

  useEffect(() => {
    api.get('output').then(response => {
      setOutputs(response.data);
    })
  }, [] );

  useEffect(() => {
    api.get('entry').then(response => {
      setEntrys(response.data);
    })
  }, [] );

  async function handleNewOutput(e) {
      e.preventDefault();

      for (var i = 0; i<itemsList.length;i++){
        const customer_id = customer;
        const product = itemsList[i].product;
        const mp = itemsList[i].mp;
        const entry_lote = itemsList[i].lote;
        const quantity = itemsList[i].quantity;
        const value = itemsList[i].value;
        const packing = itemsList[i].packing;
        const volume = itemsList[i].volume;
        const data = {
            pedido,
            entry_lote,
            customer_id,
            date,
            mp,
            product,
            packing,
            quantity,
            value,
            volume,
            payment,
            deadline
        }

        try {
            const response = await api.post('output', data);
        } catch (err) {
            alert(`Erro no cadastro. Tente novamente.`)
        }
      }
      history.push('/output')
  }

  function handleAddItem(){
    const filteredEntrys = entrys.filter(entry => entry.product === Number(product));
    const filteredOutputs = outputs.filter(output => output.product === Number(product));
    const filteredItems = itemsList.filter(item => item.product === (product));
    let distinctLotes = [];
    let numeroDoLote = ''
    filteredEntrys.forEach((entry) => {
      if (distinctLotes.findIndex(lote => lote.lote === entry.lote) < 0){
        distinctLotes.push({lote:entry.lote,saldo:0})
      }
    })
    distinctLotes.forEach((lote) => {
      const filteredEntrysPerLote = filteredEntrys.filter(entry => entry.lote === lote.lote);
      const sumEntryProductPerLote = filteredEntrysPerLote.reduce((sum,entry) => {
        return sum + entry.quantitypr;
      }, 0);

      const filteredOutputsPerLote = filteredOutputs.filter(output => output.entry_lote === lote.lote);
      const sumOutputProductPerLote = filteredOutputsPerLote.reduce((sum,output) => {
        return sum + output.quantity;
      }, 0);

      const filteredItemsPerLote = filteredItems.filter(item => item.lote === lote.lote);
      const sumItemProductPerLote = filteredItemsPerLote.reduce((sum,item) => {
        return sum + Number(item.quantity);
      }, 0);
      if (itemsList.length > 0){
        lote.saldo = sumEntryProductPerLote - sumOutputProductPerLote - Number(sumItemProductPerLote);
      } else {
        lote.saldo = sumEntryProductPerLote - sumOutputProductPerLote;
      }
    })

    for (let nLotes = 0; nLotes < distinctLotes.length; nLotes++){
      if (quantity <= distinctLotes[nLotes].saldo){
        numeroDoLote = (distinctLotes[nLotes].lote);
        break;
      }
    } 

    if (!numeroDoLote){
      let mensagem = 'Quantidade ultrapassa o valor em estoque.'
      for (var n =0; n<distinctLotes.length;n++){
        if (distinctLotes[n].saldo > 0){
          mensagem += `
          Lote: ${distinctLotes[n].lote} | Saldo: ${distinctLotes[n].saldo}`
        }
      }
      alert(`Saldo de produto insuficiente. ${mensagem}`)
      return
    }

    setItemsList([...itemsList, {
      product:product,
      mp:filteredMp,
      lote:numeroDoLote,
      quantity:quantity,
      value:value,
      packing:packing,
      volume:volume} ])
    }

  return(
      <div className="new-output">
          <div className="content">
              <section>
                <h1>Saída de Produtos</h1>
                <Link to="/output"> 
                <FiArrowLeft size={25} color="#FFB357"/>
                    Voltar
                </Link>
              </section>
              <form onSubmit={handleNewOutput}>
                <div>
                  <input className="input-s01"
                    placeholder="Pedido"
                    value={pedido}
                    onChange={e => setPedido(e.target.value)}
                    size="3"
                    maxLength="3"
                    readOnly={true}
                  />
                  <select 
                    className="select"
                    value={customer}
                    onChange={e => setCustomer(e.target.value)}
                  >
                    <option value="">
                      Cliente
                    </option>
                    {customerList.map(customer => (
                      <option key={customer.id} value={customer.id}>{customer.corpname}</option>
                    ))}
                  </select>
                  <input className="input-s04"
                    placeholder="Data do Pedido"
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                  />
                  <input className="input-s04"
                    placeholder="Data Limite"
                    type="date"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                  />
                  <input className="input-s04"
                    placeholder="Pagamento"
                    value={payment}
                    onChange={e => setPayment(e.target.value)}
                  />
                </div>
                <h2>Itens</h2>
                <select
                  className=""
                  value={product}
                  onChange={e => setProduct(e.target.value)}
                >
                  <option value="">
                    PRODUTO
                  </option>
                  {productsList.map(product => (
                  <option key={product.id} value={product.id}>{product.description}</option>
                  ))}
                </select>
                  <input className="input-s04"
                    placeholder="Matéria Prima"
                    value={filteredMp}
                    // value={mp}
                    onChange={e => setMp(e.target.value)}
                    readOnly={true}
                  />
                  <input className="input-s05"
                    placeholder="Quantidade Prod"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                  />                           
                  <input className="input-s05"
                    placeholder="Valor Unitário Prod"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                  />
                  <input className="input-s05"
                    placeholder="Embalagem"
                    value={packing}
                    onChange={e => setPacking(e.target.value)}
                  />
                  <input className="input-s05"
                    placeholder="Volumes"
                    value={volume}
                    onChange={e => setVolume(e.target.value)}
                  />
                  <button className="plus" type="button" onClick={handleAddItem}>
                    <FiPlusCircle size={30}/> 
                  </button>  
                <section>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Produto</th>
                        <th>Matéria Prima</th>
                        <th>Lote</th>
                        <th>Quantidade(kgs)</th>
                        <th>Valor Unitário</th>
                        <th>Embalagem</th>
                        <th>Volumes</th>
                      </tr>
                    </thead>
                    {itemsList.map(item => (
                      <tr>
                        <td>{item.product}</td>
                        <td>{item.mp}</td>
                        <td>{item.lote}</td>
                        <td>{item.quantity}</td>
                        <td>{item.value}</td>
                        <td>{item.packing}</td>
                        <td>{item.volume}</td>
                      </tr>
                    ))}
                  </table>
                </section>              
                <button className="button" type="submit">Lançar</button>
              </form>
          </div>    
      </div>
  )
}