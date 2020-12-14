import React, {Fragment, useState} from 'react';
import axios from 'axios';
import logo from '../img/bb.jpg';
import {useHistory} from "react-router";

const LoginPage = ({isAuthenticated, setIsAuthenticated}) => {

    //Propriétés
    const [credentials, setCredentials] = useState({
       'email' : "",
       'password': ""
    });
    const [errors, setErrors] = useState("")
    const history = useHistory();



    // Je récupère la saisie du formulaire
    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({...credentials, [name]: value})
    }

    //Soumission du formulaire pour la connexion et requete http
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/login', {
            'email' : credentials.email,
            'password' : credentials.password
        })
            .then(response => {
                setIsAuthenticated(true);
                console.log(isAuthenticated)
                history.push("/");
            })
            .catch(error => {
                    setErrors("L'email ou le mot de passe est invalide !");
            })
    }

    return (
        <Fragment>
            <div className="container-fluid masthead">
                <div className="container">

                    <div className="row">
                        <div className="col-md-6 mx-auto d-block mt-5 mb-5">
                            <div className="card">
                                <div className="card-header text-center">
                                    <img src={logo} alt="Logo de l'entreprise" className="logo-login"/>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <input type="email"  className={"form-control" + (errors && " is-invalid")} name="email"
                                                   value={credentials.email}
                                                   placeholder="Saisir votre email..."
                                                   onChange={handleChange}
                                            />
                                            {errors &&  <span className="invalid-feedback">{errors}</span>}
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" name="password"
                                                   value={credentials.password}
                                                   placeholder="Saisir votre mot de passe..."
                                                   onChange={handleChange}
                                            />
                                        </div>
                                        <input className="btn btn-block btn-primary"
                                               type="submit"
                                               value="Connexion"
                                               onSubmit={handleSubmit}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    );
};

export default LoginPage;
