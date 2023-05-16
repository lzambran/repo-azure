import './App.css';
import React, {Fragment} from "react";

//Routing
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 

/* Layout*/
import Header from './componentes/layout/Header';
import Navegacion from "./componentes/layout/Navegacion";

// componentes
import Usuarios from "./componentes/usuario/Usuarios";
import NuevoUsuario from "./componentes/usuario/NuevoUsuario";
import EditarUsuario from "./componentes/usuario/EditarUsuario";

import Cuentas from "./componentes/cuenta/Cuentas";
//import NuevaCuenta from "./componentes/cuenta/NuevaCuenta";

function App(){
  return (
      <Router>
        <Fragment>
          <Header/>
          <div className="grid contenedor contenido-principal">
            <Navegacion/>
            <main className="caja-contenido col-9">
              <Routes>
                <Route exact path="/" element={<Usuarios/>}></Route>
                <Route exact path="/usuarios/nuevo" element={<NuevoUsuario/>}></Route>
                <Route exact path="/usuarios/editar/:id" element={<EditarUsuario/>}></Route>


                <Route exact path="/cuentas" element={<Cuentas/>}></Route>
                {/* <Route exact path="/cuentas/nuevo/:id" element={<NuevaCuenta/>}></Route> */}
              </Routes>
            </main>
          </div>
        </Fragment>
        </Router>
  )
}

export default App;
