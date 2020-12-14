import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const CustomersPage = () => {

    //Propriétés
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");

    // Je récupère els customers
    useEffect(() => {
        axios.get('http://localhost:8000/api/customers')
            .then(response => response.data['hydra:member'])
            .then(data => setCustomers(data))
            .catch(error => {
                console.log("Une erreur s'est produite lors de la requete : " + error.response.status, error.response.statusText)
            })
    }, []);

    // Permet de récupérer la valeur saisie dans le champ search
    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);
    }
    // Permet de filtrer un customer
    const filteredCustomers = customers.filter(c =>
        c.firstname.toLowerCase().includes(search.toLowerCase()) ||
        c.lastname.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    // Permet de supprimer un customer
    const handleDelete = (id) => {
        if (confirm('Confirmez-vous la suppression de ce client ?')) {
            // Je récupère les customers originaux
            const originalCustomers = [...customers];
            // Je cache les customers jusqu'à la suppression
            setCustomers(customers.filter(customer => customer.id !== id));
            // Je supprime le customer avec une requete
            axios.delete("http://localhost:8000/api/customers/" + id)
                .then(response => console.log('ok'))
                .catch(error => {
                    setCustomers(originalCustomers);
                    console.log(error.response);
                })
        }
    }

    return (
        <Fragment>
            <div className="container-fluid masthead">
                <div className="container pt-3">
                    <h2 className="mt-5">
                        <i className="fas fa-users"/>
                        <span>  Mes clients</span>
                    </h2>

                    <hr className="border-light"/>
                    <Link to="/ajouter-client/new" className="btn btn-sm btn-block btn-info mb-3 d-block">
                        <i className="fas fa-plus"/>
                        <span> Ajouter un client</span>
                    </Link>
                    <input className="form-control mb-2"
                           type="text" name="search"
                           placeholder="Rechercher un client ..."
                           onChange={handleSearch}
                           value={search}
                    />
                    <div className="row">
                        {filteredCustomers.map(customer => (
                                <div className="col-md-4 mb-2" key={customer.id}>
                                    <div className="card">
                                        <div className="card-header">
                                            <h4><i className="fas fa-user"/> {customer.firstname} {customer.lastname}</h4>
                                        </div>
                                        <div className="card-body">
                                            Adresse : {customer.address} <br/>
                                            Ville : {customer.postCode} {customer.city} <br/>
                                            Tel: {customer.phone} <br/>
                                            Email: {customer.email} <br/>
                                            <hr className="border-light"/>
                                            Devis :
                                            <span className="badge badge-info pl-3 pr-3 float-right">
                                                 {customer.estimates.length}
                                            </span> <br/>
                                            Factures :
                                            <span className="badge badge-info pl-3 pr-3 float-right">
                                                 {customer.invoices.length}
                                            </span>
                                        </div>
                                        <div className="card-footer ">
                                            <a href="#" className="btn btn-sm btn-info mr-2"> <i
                                                className="fas fa-pen"/></a>
                                            <button onClick={() => handleDelete(customer.id)}
                                                    className="btn btn-sm btn-danger"><i className="fas fa-trash"/></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}

                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CustomersPage;
