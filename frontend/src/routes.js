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
import Entry from './pages/Entry';
import NewEntry from './pages/NewEntry';
import EntryDetail from './pages/DetailEntry';
import Output from './pages/Output';
import NewOutput from './pages/NewOutput';
import OutputDetail from './pages/DetailOutput';

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
                <Route path="/entry/new" component={NewEntry} />
                <Route path="/entry" component={Entry} />
                <Route path="/output/detail/:pedido" component={OutputDetail} />
                <Route path="/output/new" component={NewOutput} />
                <Route path="/output" component={Output} />
            </Switch>
        </BrowserRouter>

    )
}