import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Contact } from './components/Contact/Contact';

export const routes = <Layout>
    <Route exact path='/' component={ Contact } />
    <Route path='/contact' component={ Contact } />
</Layout>;
