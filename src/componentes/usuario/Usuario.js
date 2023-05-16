import React from "react";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import usuarioAxios from "../../config/axios";

function Usuario({usuario}) {
  // extraer los valores
  const { _id, nombre, apellido, cedula, fecha } = usuario;

  // Eliminar usuarios
  const eliminarUsuario = idUsuario => {
    Swal.fire({
        title: 'Estas seguro?',
        text: "Un usuario eliminado no se puede recuperar!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // llamando axios
          usuarioAxios.delete(`/usuarios/${idUsuario}`)
          .then(res => {
            Swal.fire(
                'Eliminado!',
                res.data.mensaje,
                'success'
              );
          });
        }
      })
  }

  return (
    <li className="usuarios">
      <div className="info-usuarios">
        <p className="nombre">
          {nombre} {apellido}
        </p>
        <p className="cedula">{cedula}</p>
        <p>{fecha}</p>
      </div>
      <div className="acciones">
        <Link to={`/usuarios/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Usuario
        </Link>

        <Link to={`/cuentas/nuevo/${_id}`} className="btn btn-amarillo">
          <i className="fas fa-plus"></i>
          Nueva Cuenta
        </Link>
        <button type="button" className="btn btn-rojo btn-eliminar"
        onClick={() => eliminarUsuario(_id)}>
          <i className="fas fa-times"></i>
          Eliminar Usuario
        </button>
      </div>
    </li>
  );
}

export default Usuario;
