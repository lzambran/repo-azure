import React from "react";

import { Link } from 'react-router-dom';

const Navegacion = () => {
    return (
        <aside className="sidebar col-3">
            <h2>Administracion</h2>
            <nav className="navegacion">
                <Link to={"/"} className="usuarios">Usuarios</Link>
                <Link to={"cuentas"} className="cuentas">Cuentas</Link>
            </nav>

        </aside>
    )
}
export default Navegacion;