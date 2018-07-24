import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import SubmitPayment from './components/SubmitPayment';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/submitpayment' component={ SubmitPayment as any } />
</Layout>;
