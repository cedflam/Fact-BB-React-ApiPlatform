import axios from 'axios';

/**
 * Permet de contrôler si u n utilisateur est connecté
 * @param isAuthenticated
 * @param setIsAuthenticated
 */
function isAuthenticated(isAuthenticated, setIsAuthenticated)
{
    axios.get('http://localhost:8000/api/companies')
        .then(response => {
            console.log("Un utilisateur connecté")
            return setIsAuthenticated(true);
        })
        .catch(error => {
            console.log("Pas d'utilisateur connecté")
            return setIsAuthenticated(false);
    })
}


export default {
    isAuthenticated
};