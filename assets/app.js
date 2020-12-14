import React, {Fragment, useState} from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch} from "react-router-dom";
import './styles/app.css';
import './bootstrap';

import HomePage from "./Pages/HomePage";
import NavBar from "./components/NavBar";
import DashboardPage from "./Pages/DashboardPage";
import EstimatesPages from "./Pages/EstimatesPage";
import InvoicesPage from "./Pages/InvoicesPage";
import CustomersPage from "./Pages/CustomersPage";
import LoginPage from "./Pages/LoginPage";
import Footer from "./components/Footer";
import AuthApi from "./services/AuthApi";


const App = (props) => {

    //Propriétés
    const [isAuthenticated, setIsAuthenticated] = useState();
    // Permet de vérifier si l'utilisateur est connecté
    AuthApi.isAuthenticated(isAuthenticated, setIsAuthenticated);

    return (
        <Fragment>
            <HashRouter>
                <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
                <Switch>
                    <Route path="/devis" component={EstimatesPages}/>
                    <Route path="/factures" component={InvoicesPage}/>
                    <Route path="/clients" component={CustomersPage}/>
                    <Route path="/statistiques" component={DashboardPage}/>
                    <Route path="/login" render={(props) => <LoginPage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} /> } />
                    <Route path="/" render={(props) => <HomePage isAuthenticated={isAuthenticated} />  }/>
                </Switch>
                <Footer/>
            </HashRouter>
        </Fragment>
    );
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement);

