import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Products from './pages/Products';
import NewProduct from './pages/NewProduct';
import Home from './pages/Home';
import Suppliers from './pages/Suppliers';
import NewSupplier from './pages/NewSupplier';
import Customer from './pages/Customers';
import NewCustomer from './pages/NewCustomer';
import EnhancedTable from './pages/Entry';
import EntryDetail from './pages/DetailEntry';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/products/new" component={NewProduct}/>
                <Route path="/products" component={Products} />
                <Route path="/home" component={Home} />
                <Route path="/suppliers/new" component={NewSupplier} />
                <Route path="/suppliers" component={Suppliers} />
                <Route path="/customers/new" component={NewCustomer} />
                <Route path="/customers" component={Customer} />
                <Route path="/entry/detail/:lote" component={EntryDetail} />
                <Route path="/entry" component={EnhancedTable} />
            </Switch>
        </BrowserRouter>

    )
}