import React, {Fragment, useEffect, useState} from 'react';
import * as axios from "axios";
import moment from "moment";

const EstimatesPages = () => {

    //Propriétés
    const [estimates, setEstimates] = useState([]);
    const [search, setSearch] = useState("");

    // Je récupère les devis
    useEffect( () => {
        axios
            .get('http://localhost:8000/api/estimates')
            .then(response => setEstimates(response.data['hydra:member']))
    }, []);

    // Je formte la date
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');



console.log(estimates)
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

                    />
                   <div className="row">
                       {estimates.map (estimate =>
                       <div className="col-md-4 mb-2" key={estimate.id}>
                           <div className="card">
                               <div className="card-header">
                                   <h4>{estimate.customer.firstname} {estimate.customer.lastname}</h4>
                                   <p>
                                       Email : {estimate.customer.email} <br/>
                                       Tél : {estimate.customer.phone}
                                   </p>
                               </div>
                               <div className="card-body">
                                    <p>
                                        Date Devis : {formatDate(estimate.createdAt)}
                                    </p>
                               </div>
                               <div className="card-footer">

                               </div>
                           </div>
                       </div>
                       )}
                   </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EstimatesPages;
