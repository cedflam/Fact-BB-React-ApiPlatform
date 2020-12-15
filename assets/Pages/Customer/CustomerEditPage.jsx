import React, {Fragment, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

const CustomerEditPage = (props) => {
    // Je récupère la route qui à été appelée
    const {id = "new"} = props.match.params;

    //Propriétés
    const [customer, setCustomer] = useState({
        lastname: "",
        firstname: "",
        address: "",
        postCode: "",
        city: "",
        email: "",
        phone: ""
    });
    const [errors, setErrors] = useState({
        lastname: "",
        firstname: "",
        address: "",
        postCode: "",
        city: "",
        email: "",
        phone: ""
    });

    const [editing, setEditing] = useState(false);



    // Je vais chercher le client pour l'afficher dans le formulaire
    const fetchCustomer = async id => {
      try{
          const data = await axios
              .get('http://localhost:8000/api/customers/' + id)
              .then(response => response.data);
          const {lastname, firstname, address, postCode, city, email, phone} = data;
          setCustomer({lastname, firstname, address, postCode, city, email, phone})
      }catch(error){
        console.log(error.response)
      }
    }

    // Je détermine si j'affiche le formulaire de création ou d'édition
    useEffect( () => {
        if (id !== "new") {
            setEditing(true);
            fetchCustomer(id);
        }
    }, [id])

    //Permet de gérer le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCustomer({...customer, [name]: value});
    }

    // Je gère la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();
       try{
           if (editing) {
               const response = await axios
                   .put('http://localhost:8000/api/customers/' + id, customer);
           }else{
               const response = await axios
                   .post('http://localhost:8000/api/customers', customer);
           }
           setErrors({});
       }catch(error){
           if (error.response.data.violations) {
               //Je crée un objet vide
               const apiErrors = {};
               // Je boucle sur les violations
               error.response.data.violations.forEach(violation => {
                   // Je remplis le tableau ApiErrors avec les erreurs
                   apiErrors[violation.propertyPath] = violation.message;
               });
               // Je mets à jours le state des erreurs
               setErrors(apiErrors);
           }
       }
    }

    return (
        <Fragment>
            <div className="container-fluid masthead">
                <div className="container pt-3">
                     <h2 className="mt-5">
                        <i className="fas fa-user"/>
                         { (!editing && <span>  Créer un client </span>) || (<span> Modifier un client</span>) }
                    </h2>
                    <hr className="border-light"/>

                    <form className="form-group">
                        <div className="row">
                            <div className="col-md-6 md-2">
                                <input onChange={handleChange}
                                       name="lastname"
                                       value={customer.lastname}
                                       placeholder="Nom..."
                                       type="text"
                                       className={"form-control " + (errors.lastname && " is-invalid")}
                                />
                                {errors.lastname && <span className="invalid-feedback ">{errors.lastname}</span>}
                            </div>

                            <div className="col-md-6 mb-2">
                                <input onChange={handleChange}
                                       name="firstname"
                                       value={customer.firstname}
                                       placeholder="Prénom..."
                                       type="text"
                                       className={"form-control " + (errors.firstname && " is-invalid")}
                                />
                                {errors.firstname && <span className="invalid-feedback ">{errors.firstname}</span>}
                            </div>
                            <div className="col-md-12 mb-2">
                                <input onChange={handleChange}
                                       name="address"
                                       value={customer.address}
                                       placeholder="Adresse..."
                                       type="text"
                                       className={"form-control " + (errors.address && " is-invalid")}
                                />
                                {errors.address && <span className="invalid-feedback ">{errors.address}</span>}
                            </div>
                            <div className="col-md-6 mb-2">
                                <input onChange={handleChange}
                                       name="postCode"
                                       value={customer.postCode}
                                       placeholder="Code postal..."
                                       type="text"
                                       className={"form-control " + (errors.postCode && " is-invalid")}
                                />
                                {errors.postCode && <span className="invalid-feedback ">{errors.postCode}</span>}
                            </div>
                            <div className="col-md-6 mb-2">
                                <input onChange={handleChange}
                                       name="city"
                                       value={customer.city}
                                       placeholder="Ville..."
                                       type="text"
                                       className={"form-control " + (errors.city && " is-invalid")}
                                />
                                {errors.city && <span className="invalid-feedback ">{errors.city}</span>}
                            </div>
                            <div className="col-md-6 mb-2">
                                <input onChange={handleChange}
                                       name="email"
                                       value={customer.email}
                                       placeholder="Email..."
                                       type="email"
                                       className={"form-control " + (errors.email && " is-invalid")}
                                />
                                {errors.email && <span className="invalid-feedback ">{errors.email}</span>}
                            </div>
                            <div className="col-md-6 mb-2">
                                <input onChange={handleChange}
                                       name="phone"
                                       value={customer.phone}
                                       placeholder="Téléphone..."
                                       type="text"
                                       className={"form-control " + (errors.phone && " is-invalid")}
                                />
                                {errors.phone && <span className="invalid-feedback ">{errors.phone}</span>}
                            </div>
                            <div className="col-md-12 ">
                                <button type="submit" className="btn btn-sm btn-info mr-2 footer-customer-edit" onClick={handleSubmit}>
                                    Enregistrer
                                </button>
                                <Link to="/clients" className="btn btn-sm btn-primary footer-customer-edit">
                                    Retour à la liste
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default CustomerEditPage;
