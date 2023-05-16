import React, { useEffect, useState, Fragment } from "react";

// importar cliente axios
import usuarioAxios from '../../config/axios';
import Usuario from "./Usuario";

import  { Link } from 'react-router-dom';

function Usuarios(){

    // Trabajar con el state 
    // usuarios = state, 
    const [usuarios, guardarUsuarios ] = useState([]);

    
    // use efect es simillar a component
    useEffect( ()=> {
        // Query app
    const consultarAPI = async ()=> {
        const usuariosConsulta = await usuarioAxios.get('/usuarios');

        // colocar el resultado de estate
        guardarUsuarios(usuariosConsulta.data);
    }
        consultarAPI();
    }, [usuarios]);

    return (
        <Fragment>
            <h2>Usuarios</h2>

            <Link to={"/usuarios/nuevo"} className="btn btn-verde nvo-usuarios">
                <i className="fas fa-plus-circle"></i>
                  Nuevo Usuario
            </Link>
            <ul className="listado-usuarios">
                {usuarios.map(usuario => (
                    <Usuario
                    key={usuario._id}
                    usuario={usuario}
                    />
                ))}
            </ul>
        </Fragment>
    )
}
export default Usuarios;