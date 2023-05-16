import React, {Fragment } from "react";

// importar cliente axios
//import usuarioAxios from '../../config/axios';
//import Cuenta from "./Cuenta";

//import  { Link } from 'react-router-dom';

function Cuentas(){

    return (
        <Fragment>
            <h2>Cuentas</h2>

            {/* <Link to={"/cuentas/nuevo"} className="btn btn-verde nvo-cuentas">
                <i className="fas fa-plus-circle"></i>
                  Nueva Cuenta
            </Link> */}
            <ul className="listado-cuentas">
                
            </ul>
        </Fragment>
    )
}
export default Cuentas;