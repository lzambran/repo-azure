import React, {Fragment, useState} from "react";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import usuarioAxios from '../../config/axios';



function NuevoUsuario(){

    const history = useNavigate();
    // cliente = state, guardarusuario = funcion para guardar el state
    const [usuario, guardarUsuario ] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        fecha: ''
    });

    // leer los datos del fromulario
    const actualizarState = e => {
        // Almacenlo que el usuario escribir en el state
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
        //console.log(usuario);
    }

    // Anadir en la res API un usuario nuevo
    const agregarUsuario = e => {
        e.preventDefault();
        

        // enviar peticion
        usuarioAxios.post('/usuarios', usuario)
        .then(res => {

            // validar si hay errores de mongo
            if (res.data.code === 11000) {
                Swal.fire({
                    title: 'Hubo un error',
                    text: 'Ese usuario ya esta registrado',
                    icon: 'warning',
                    color: '#A52A2A'
                })
            }else {
                console.log(res.data);

                Swal.fire(
                    'Se agrego un Usuario',
                    res.data.mensaje,
                    'success',
                )
            }
            // Redireccionar
            history('/');
            
        });
    }

    // Validar el formular 
    const validarUsuario = () => {
        // Destructuracion
        const { nombre, apellido, cedula, fecha } = usuario;

        // revisar que las propiedades del state 
        let valido = !nombre.length || !apellido.length || !cedula.length || !fecha.length; 

        //retornar verdadero o falso
        return valido;
    }
    return (
        <Fragment>
            <h2>Nuevo Usuario</h2>
            
            <form onSubmit={agregarUsuario}>
                <legend >Llena todos los campos </legend>
                
                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Usuario" name="nombre" 
                    onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Usuario" name="apellido" 
                    onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Cedula:</label>
                    <input type="text" placeholder="Cedula Usuario" name="cedula" 
                    onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Fecha:</label>
                    <input type="date" placeholder="Fecha Usuario" name="fecha" 
                    onChange={actualizarState}/>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Usuario"
                    disabled={validarUsuario()}/>
                </div>
            </form>
        </Fragment>
    )
}
export default  (NuevoUsuario);