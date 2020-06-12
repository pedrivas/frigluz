import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiPlusCircle } from 'react-icons/fi';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import api from '../../services/api';
import './styles.css';

import frigImg from '../../assets/FRIGLUZ.png';

export default function NewEntry() {
    const [lote, setLote]                 = useState('');
    const [supplier, setSupplier]         = useState('');
    const [bilDate, setBilDate]           = useState('');
    const [expDate, setExpDate]           = useState('');
    const [bones, setBones]               = useState(0);
    const [missing, setMissing]           = useState(0);
    const [kassel, setKassel]             = useState('');
    const [nf, setNf]                     = useState('');
    const [mp, setMp]                     = useState('');
    const [quantityMp, setQuantityMp]     = useState(0);
    const [valueMp, setValueMp]           = useState(0);
    const [product, setProduct]           = useState('');
    const [quantityPr, setQuantityPr]     = useState(0);
    const [valuePr, setValuePr]           = useState(0);

    const [supplierList, setSupplierList] = useState([]);
    const [productsList, setProductsList] = useState([]);
    const [itemsList, setItemsList]        = useState([]);

    const history = useHistory();

    useEffect(() => {
      api.get('entryMaxLote').then(response => {
        if (response.data[0].maxLote){
          setLote(((parseInt(response.data[0].maxLote)+1).toString()).padStart(3,'0'));
        } else {
          setLote('000');
        }
      })
    }, [] );

    useEffect(() => {
      api.get('supplier').then(response => {
        setSupplierList(response.data);
      })
    }, [] );

    useEffect(() => {
      if (mp === "") {
        return;
      }
      api.get('product').then(response => {
        const filteredProducts = response.data.filter(product => product.mp === mp);
        setProductsList(filteredProducts);
      })
    }, [mp] );

    async function handleNewEntry(e) {
        e.preventDefault();

        const data = {
            lote,
            mp
        }

        try {
            const response = await api.post('entry', data);
            history.push('/entrys')
        } catch (err) {
            alert(`Erro no cadastro. Tente novamente.`)
        }
    }

    function handleAddItem(){
      if (itemsList) {
        setItemsList([...itemsList, [mp,quantityMp,valueMp, product, quantityPr, valuePr] ])
      } else {
        setItemsList([mp,quantityMp,valueMp, product, quantityPr, valuePr])       
      }
      console.log(itemsList);
    }

    return(
        <div className="new-entry">
            <div className="content">
                <section>
                    <h1>Entrada de Lote</h1>
                    <Link to="/entry"> 
                    <FiArrowLeft size={25} color="#FFB357"/>
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleNewEntry}>
                  <div>
                    <div className="label-input">
                      <input className="input-s01"
                          placeholder="Lote"
                          value={lote}
                          onChange={e => setLote(e.target.value)}
                          size="3"
                          maxLength="3"
                          readonly="true"
                      />
                    </div>
                    <select 
                      className="select"
                      displayEmpty
                      value={supplier}
                      onChange={e => setSupplier(e.target.value)}
                    >
                      <option value="">
                            Fornecedor
                      </option>
                      {supplierList.map(supplier => (
                        <option key={supplier.id} value={supplier.corpname}>{supplier.corpname}</option>
                      ))}
                    </select>
                    <input className="input-s02"
                        placeholder="Data Faturamento"
                        type="date"
                        value={bilDate}
                        onChange={e => setBilDate(e.target.value)}
                    />
                    <input className="input-s02"
                        placeholder="Data Vencimento"
                        type="date"
                        value={expDate}
                        onChange={e => setExpDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <input className="input-s04"
                        placeholder="Osso(kg)"
                        value={bones}
                        onChange={e => setBones(e.target.value)}
                    />
                    <input className="input-s03"
                        placeholder="Faltante(kg)"
                        value={missing}
                        onChange={e => setMissing(e.target.value)}
                    />
                    <input className="input-s03"
                        placeholder="Remessa Kassel"
                        value={kassel}
                        onChange={e => setKassel(e.target.value)}
                    />
                    <input className="input-s03"
                        placeholder="NF Devolução"
                        value={nf}
                        onChange={e => setNf(e.target.value)}
                    />
                  </div>
                  <h2>Itens</h2>
                  <div>
                    <select
                        className="select"
                        displayEmpty
                        value={mp}
                        onChange={e => setMp(e.target.value)}
                    >
                        <option value="">
                            MATÉRIA PRIMA
                        </option>
                        <option value = "DIANTEIRO">DIANTEIRO</option>
                        <option value = "TRASEIRO">TRASEIRO</option>
                        <option value = "PONTA DE AGULHA">PONTA DE AGULHA</option>
                        <option value = "BOI CASADO">BOI CASADO</option>
                        <option value = "CARNE DESSOSSADA TRASEIRO">CARNE DESSOSSADA TRASEIRO</option>
                        <option value = "CARNE DESSOSSADA DIANTEIRO">CARNE DESSOSSADA DIANTEIRO</option>
                        <option value = "CARNE DESSOSSADA PONTA DE AGULHA">CARNE DESSOSSADA PONTA DE AGULHA</option>
                        <option value = "CARNE DESSOSSADA">CARNE DESSOSSADA</option>
                    </select>
                    <input className="input-s05"
                        placeholder="Quantidade MP"
                        value={quantityMp}
                        onChange={e => setQuantityMp(e.target.value)}
                    />
                    <input className="input-s05"
                        placeholder="Valor Unitário MP"
                        value={valueMp}
                        onChange={e => setValueMp(e.target.value)}
                    />  
                    <select
                        className=""
                        displayEmpty
                        value={product}
                        onChange={e => setProduct(e.target.value)}
                    >
                        <option value="">
                            PRODUTO
                        </option>
                        {productsList.map(product => (
                        <option key={product.id} value={product.description}>{product.description}</option>
                      ))}
                    </select>
                    <input className="input-s05"
                        placeholder="Quantidade Prod"
                        value={quantityPr}
                        onChange={e => setQuantityPr(e.target.value)}
                    />                           
                    <input className="input-s05"
                        placeholder="Valor Unitário Prod"
                        value={valuePr}
                        onChange={e => setValuePr(e.target.value)}
                    />
                    <button className="plus" onClick={handleAddItem}>
                      <FiPlusCircle size={30}/> 
                    </button>  
                  </div> 
                  <section>
                    <table className="table">
                      <tr>
                        <th>Matéria Prima</th>
                        <th>Qntd. MP</th>
                        <th>Valor Unitário MP</th>
                        <th>Produto</th>
                        <th>Qntd. Produto</th>
                        <th>Valor Unitário Prod.</th>
                      </tr>
                      {itemsList.map(item => (
                        <tr>
                          <td>{item[0]}</td>
                          <td>{item[1]}</td>
                          <td>{item[2]}</td>
                          <td>{item[3]}</td>
                          <td>{item[4]}</td>
                          <td>{item[5]}</td>
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