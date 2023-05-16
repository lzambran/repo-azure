import React, {Fragment, useState, useEffect} from "react";
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import usuarioAxios from '../../config/axios';



function EditarUsuario(){

    const history = useNavigate();

    // obtener id
    const { id } = useParams();

    // cliente = state, guardarusuario = funcion para guardar el state
    const [usuario, datosUsuario ] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        fecha: ''
    });

    //Query a la api
    const consultarAPI = async () => {
        const usuarioConsulta = await usuarioAxios.get(`/usuarios/${id}`);
        
        // colocar en el state
        datosUsuario(usuarioConsulta.data);
    }
    // useEffect
    useEffect( () => {
        consultarAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    // leer los datos del fromulario
    const actualizarState = e => {
        // Almacenlo que el usuario escribir en el state
        datosUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
        //console.log(usuario);
    }

    // enviar una peticion a axios para actualizar
    const actualizarUsuario = e => {
        e.preventDefault();
        
        // enviar peticion por axios
        usuarioAxios.put(`/usuarios/${usuario._id}`, usuario)
        .then(res => {
            //validar si hay errores de mongo
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
                    'Correcto',
                    'Se actualizo correctamente',
                    'success',
                )
            }
            // redireccionar
            history('/');
        })
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
            <h2>Editar Usuario</h2>
            
            <form
            onSubmit={actualizarUsuario}
            >
                <legend >Llena todos los campos </legend>
                
                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Usuario" name="nombre" 
                    onChange={actualizarState}
                    value={usuario.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Usuario" name="apellido" 
                    onChange={actualizarState}
                    value={usuario.apellido}
                    />
                </div>

                <div className="campo">
                    <label>Cedula:</label>
                    <input type="text" placeholder="Cedula Usuario" name="cedula" 
                    onChange={actualizarState}
                    value={usuario.cedula}
                    />
                </div>

                <div className="campo">
                    <label>Fecha:</label>
                    <input type="text" placeholder="Fecha Usuario" name="fecha" 
                    onChange={actualizarState}
                    value={usuario.fecha}
                    />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Guardar Cambios"
                    disabled={validarUsuario()}/>
                </div>
            </form>
        </Fragment>
    )
}
//
export default  (EditarUsuario);