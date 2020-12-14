import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

const CustomerEditPage = (props) => {

    //Propriétés
    const [customer, setCustomer] = useState({
        lastname: "",
        firstname: "",
        address: "",
        postCode: "",
        city: "",
        email:"",
        phone: ""
    });
    const [errors, setErrors] = useState({
        lastname: "Le nom est invalide",
        firstname: "Le prenom est invalide",
        address: "L'adresse est invalide",
        postCode: "Le code postal est invlid",
        city: "La ville doit être renseignée",
        email:"L'émail existe deja ",
        phone: "Le numero de téléphone n'est au bon format"
    });

    //Permet de gérer le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCustomer({...customer, [name]: value});
    }

    // Je gère la soumission du formulaire
    const handleSubmit = (event) => {
        event.preventDefault();

    }

    return (
        <Fragment>
            <div className="container-fluid masthead">
                <div className="container pt-3">
                    <h2 className="mt-5">
                        <i className="fas fa-user"/>
                        <span>  Créer un client </span>
                        <hr className="border-light"/>

                        <form className="form-group">
                            <div className="row">
                                <div className="col-md-6 md-2">
                                   <input onChange={handleChange}
                                          name="lastname"
                                          value={customer.lastname}
                                          placeholder="Nom..."
                                          type="text"
                                          className={"form-control" + (errors.lastname && " is-invalid")}
                                   />
                                    {errors.lastname &&  <span className="invalid-feedback ">{errors.lastname}</span>}
                                </div>

                                <div className="col-md-6 mb-2">
                                    <input onChange={handleChange}
                                           name="firstname"
                                           value={customer.firstname}
                                           placeholder="Prénom..."
                                           type="text"
                                           className={"form-control " + (errors.firstname && " is-invalid")}
                                    />
                                    {errors.firstname &&  <span className="invalid-feedback ">{errors.firstname}</span>}
                                </div>
                                <div className="col-md-12 mb-2">
                                    <input onChange={handleChange}
                                           name="address"
                                           value={customer.address}
                                           placeholder="Adresse..."
                                           type="text"
                                           className={"form-control " + (errors.address && " is-invalid")}
                                    />
                                    {errors.address &&  <span className="invalid-feedback ">{errors.address}</span>}
                                </div>
                                <div className="col-md-6 mb-2">
                                    <input onChange={handleChange}
                                           name="postCode"
                                           value={customer.postCode}
                                           placeholder="Code postal..."
                                           type="text"
                                           className={"form-control " + (errors.postCode && " is-invalid")}
                                    />
                                    {errors.postCode &&  <span className="invalid-feedback ">{errors.postCode}</span>}
                                </div>
                                <div className="col-md-6 mb-2">
                                    <input onChange={handleChange}
                                           name="city"
                                           value={customer.city}
                                           placeholder="Ville..."
                                           type="text"
                                           className={"form-control " + (errors.city && " is-invalid")}
                                    />
                                    {errors.city &&  <span className="invalid-feedback ">{errors.city}</span>}
                                </div>
                                <div className="col-md-6 mb-2">
                                    <input onChange={handleChange}
                                           name="email"
                                           value={customer.email}
                                           placeholder="Email..."
                                           type="email"
                                           className={"form-control " + (errors.email && " is-invalid")}
                                    />
                                    {errors.email &&  <span className="invalid-feedback ">{errors.email}</span>}
                                </div>
                                <div className="col-md-6 mb-2">
                                    <input onChange={handleChange}
                                           name="phone"
                                           value={customer.phone}
                                           placeholder="Téléphone..."
                                           type="text"
                                           className={"form-control " + (errors.phone && " is-invalid")}
                                    />
                                    {errors.phone &&  <span className="invalid-feedback ">{errors.phone}</span>}
                                </div>
                               <div className="col-md-12 ">
                                   <button type="submit" className="btn btn-sm btn-info mr-2">
                                       Enregistrer
                                   </button>
                                   <Link to="/clients" className="btn btn-sm btn-primary" >
                                       Retour à la liste
                                   </Link>
                               </div>
                            </div>

                        </form>
                    </h2>
                </div>
            </div>
        </Fragment>
    );
};

export default CustomerEditPage;
