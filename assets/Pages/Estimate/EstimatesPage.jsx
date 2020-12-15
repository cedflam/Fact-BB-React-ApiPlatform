import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import moment from "moment";


const EstimatesPages = () => {

    //Propriétés
    const [estimates, setEstimates] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    // Je récupère les devis
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/estimates')
            .then(response => setEstimates(response.data['hydra:member']))
            .catch(error => {
                setError("Vous n'êtes pas autorisé à afficher cette page ... ")
            })
    }, []);

    //Permet de supprimer un devis
    const handleDelete = (id) => {
        if (confirm("Vous êtes sur le pojnt de supprimer un devis ! Confirmez-vous l'opération ?")) {
            // Je récupère l'ensemble des devis
            const originalEstimates = [...estimates];
            // Je filtre les devis
            setEstimates(estimates.filter(estimate => estimate.id !== id));
            // Je supprime le devis
            axios
                .delete("http://localhost:8000/api/estimates/" + id)
                .then(response => console.log('ok'))
                .catch(error => {
                    setEstimates(originalEstimates);
                });
        }
    }

    // Je formate la date
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');
    // Je formate les chiffres
    const numberFormat = (number) => {
        return new Intl.NumberFormat('fr-FR',
            {style: 'currency', currency: 'EUR'})
            .format(number)
    }

    // Je gère le champ de recherche
    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);
    }
    // Je filtre le résultat de la recherche
    const filteredEstimates = estimates.filter(e =>
        e.customer.firstname.toLowerCase().includes(search.toLowerCase()) ||
        e.customer.lastname.toLowerCase().includes(search.toLowerCase()) ||
        e.customer.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <Fragment>
            <div className="container-fluid masthead">
                <div className="container pt-3">
                    <h2 className="mt-5">
                        <i className="fas fa-file-alt"/>
                        <span>  Mes devis</span>
                    </h2>
                    <hr className="border-light"/>
                    <input className="form-control mb-2"
                           type="text" name="search"
                           placeholder="Rechercher un devis ..."
                           onChange={handleSearch}
                           value={search}

                    />
                    {/* Je gère les erreurs */}
                    {error && <h2 className="alert alert-danger">{error}</h2>}
                    {/*  */}
                    <div className="row">
                        {filteredEstimates.map(estimate => {
                                /* Si le devis n'est pas archivé */
                                return estimate.archive ?

                                    <div className="col-md-4 mb-2" key={estimate.id}>
                                        <div className="card">
                                            <div className="card-header">

                                   <span className="p-1 float-right badge badge-sm badge-warning">
                                        {estimate.status ? " Attente" : " Fact. en cours"}
                                   </span>

                                                <h4>{estimate.customer.firstname} {estimate.customer.lastname}</h4>
                                                <p>
                                                    Email : {estimate.customer.email} <br/>
                                                    Tél : {estimate.customer.phone}
                                                </p>
                                            </div>
                                            <div className="card-body">
                                                <p>
                                                    Référence : {estimate.reference} <br/>
                                                    Date Devis : {formatDate(estimate.createdAt)} <br/>
                                                    Total devis : {numberFormat(estimate.totalTtc)} <br/>

                                                </p>
                                            </div>
                                            <div className="card-footer">
                                                <a href="#" className="btn btn-sm btn-info mr-1">
                                                    <i className="fas fa-pen"/>
                                                </a>
                                                <a onClick={() => handleDelete(estimate.id)}
                                                   className="btn btn-sm btn-danger">
                                                    <i className="fas fa-trash"/>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    : null
                            }
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EstimatesPages;
