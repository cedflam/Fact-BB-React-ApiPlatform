import React, {Fragment, useState} from 'react';
import {NavLink} from "react-router-dom";
import axios from 'axios';
import {useHistory} from "react-router";
import logo from "../img/bb-logo.jpg";

const NavBar = ({isAuthenticated, setIsAuthenticated}) => {
    /* TODO: Le bouton du menu hamburger ne fonctionne pas revoir les liaisons javascript */
    // Permet de passer isAuthenticated à false an cas de deconnexion
    const handleLogout = (event) => {
        event.preventDefault;
        if (isAuthenticated === true) {
            setIsAuthenticated(false);
        }
    }
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <img src={logo} alt="Logo" className="img-fluid ml-5 mr-2"/>
                <NavLink className={"navbar-brand "} to={"/"}>Bâtiment Buinoud</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"> </span>
                </button>

                <div className="collapse navbar-collapse " id="navbarColor01">
                    <ul className="navbar-nav ml-auto">
                        {isAuthenticated &&
                        <Fragment>
                            <li className="nav-item">
                                <NavLink className={"nav-link"} to={"/devis"}>
                                    <i className="fas fa-file-alt"/>
                                    <span> Devis </span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={"nav-link"} to={"/factures"}>
                                    <i className="fas fa-file-invoice"/>
                                    <span> Factures </span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={"nav-link"} to={"/clients"}>
                                    <i className="fas fa-users"/>
                                    <span> Clients </span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={"nav-link"} to={"/statistiques"}>
                                    <i className="fas fa-chart-line"/>
                                    <span>  Tableau de bord </span>
                                </NavLink>
                            </li>


                        <li className="nav-item">
                            <a className="nav-link " href="/logout" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt"/>
                                <span> Déconnexion </span>

                            </a>
                        </li>
                        </Fragment>
                        }
                        {!isAuthenticated &&
                            <Fragment>
                                <li className="nav-item">
                                    <NavLink className={"nav-link mr-5"} to={"/login"}>
                                        <i className="fas fa-sign-in-alt"/>
                                        <span> Connexion</span>
                                    </NavLink>
                                </li>
                            </Fragment>
                        }
                    </ul>
                </div>
            </nav>
        </Fragment>
    );
};

export default NavBar;
