import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../utils/api';

const RegisterForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      usuario: '',
      correo: '',
      contrasena: '',
      nombre: '',
      apellido: '',
      direccionTienda: '',
      telefonoTienda: '',
    },
    validationSchema: Yup.object({
      usuario: Yup.string()
        .required('El nombre de usuario es obligatorio'),
      correo: Yup.string()
        .email('Correo inválido')
        .required('El correo es obligatorio'),
      contrasena: Yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('La contraseña es obligatoria'),
      nombre: Yup.string()
        .required('El nombre es obligatorio'),
      apellido: Yup.string()
        .required('El apellido es obligatorio'),
      direccionTienda: Yup.string()
        .required('La dirección de la tienda es obligatoria'),
      telefonoTienda: Yup.string()
        .required('El teléfono de la tienda es obligatorio')
        .matches(/^[0-9]+$/, 'El teléfono solo debe contener números'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await api.post('/users/register', values);
        alert('Registro exitoso. Espere la aprobación del administrador.');
        navigate('/login'); // Redirigir al login después de un registro exitoso
      } catch (error) {
        setErrors({ api: 'Error al registrar. Por favor, intente de nuevo.' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex mt-10 justify-center items-center bg-gray-100">   
      <form className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md' onSubmit={formik.handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Registrar Usuario</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usuario">Usuario</label>
          <input
            id="usuario"
            name="usuario"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.usuario}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.usuario && formik.errors.usuario ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.usuario}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correo">Correo</label>
          <input
            id="correo"
            name="correo"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.correo}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.correo && formik.errors.correo ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.correo}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contrasena">Contraseña</label>
          <input
            id="contrasena"
            name="contrasena"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.contrasena}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.contrasena && formik.errors.contrasena ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.contrasena}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nombre}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.nombre && formik.errors.nombre ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.nombre}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">Apellido</label>
          <input
            id="apellido"
            name="apellido"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.apellido}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.apellido && formik.errors.apellido ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.apellido}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="direccionTienda">Dirección de la Tienda</label>
          <input
            id="direccionTienda"
            name="direccionTienda"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.direccionTienda}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.direccionTienda && formik.errors.direccionTienda ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.direccionTienda}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefonoTienda">Teléfono de la Tienda</label>
          <input
            id="telefonoTienda"
            name="telefonoTienda"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.telefonoTienda}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.telefonoTienda && formik.errors.telefonoTienda ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.telefonoTienda}</div>
          ) : null}
        </div>

        {formik.errors.api && <div className="text-red-500 text-sm mt-2">{formik.errors.api}</div>}

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={formik.isSubmitting}>
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
