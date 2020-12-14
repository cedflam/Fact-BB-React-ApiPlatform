import React, {Fragment} from 'react';

import logo from "../img/bb.jpg";
import {NavLink} from "react-router-dom";

const HomePage = ({isAuthenticated}) => {
    return (
        <Fragment>
            <div className="container-fluid masthead">
                <div className="container">

                    <div className="row h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-10 align-self-end">
                            <img src={logo} alt="Logo" className="home-logo"/>
                            <h1 className="text-uppercase text-white font-weight-bold">
                                Espace de gestion
                            </h1>
                            <hr className="divider my-4 border-light"/>
                        </div>

                        <div className="col-lg-8 align-self-baseline">
                            <p className="text-white-75 font-weight-light mb-5">
                                Cette page constitue le point de départ à la gestion de la clientèle. <br/>
                                Depuis cette interface, vous avez la possibilité de gérer vos clients, devis et
                                factures.
                            </p>
                            {!isAuthenticated &&
                                <Fragment>
                                    <NavLink className="btn btn-primary btn-xl js-scroll-trigger mb-2"
                                             to="/login">
                                        Connexion
                                    </NavLink>
                                </Fragment>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default HomePage;
