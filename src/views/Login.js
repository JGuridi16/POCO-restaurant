import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { registeredUsers } from '../store/data/registeredUsers'
import { Bounce, toast } from 'react-toastify';

const Login = () => {
  const [logUser, setLogUser] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChangeUserInput = (name, value) => {
    if(!name || !value) return;
  
    setLogUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onTriggerClick = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = () => {
    if (!logUser?.username || !logUser?.password) {
      toast.error('Completar campos requeridos.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    const found = registeredUsers.find(x => x.username === logUser.username && x.password === logUser.password);

    if(!found) {
      toast.error('Usuario o contraseña incorrectos.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    login(found);
    toast.success('Inicio de sesión satisfactorio.', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigate('/home');
  };

  return (
    <div className='container-fluid d-flex justify-content-center align-items-center vh-100'>
      <div className='row justify-content-center align-items-center'>
        <div className='col-12 text-center'>
          <h1>Incio de sesión</h1>
        </div>
        <div className='col-12'>
          <div className='card p-5'>
            <div className="mb-3">
              <label htmlFor="inputUsername" className="form-label">Usuario</label>
              <input type="text" className="form-control" id="username" name='username' onChange={(e) => onChangeUserInput(e.target.name, e.target.value)} onKeyDown={onTriggerClick} />
              <div id="username" className="form-text">Escribe tu nombre de usuario</div>
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="password" name='password' onChange={(e) => onChangeUserInput(e.target.name, e.target.value)} onKeyDown={onTriggerClick} />
              <div id="password" className="form-text">Escribe tu contraseña</div>
            </div>
            <button className="btn btn-success" onClick={handleLogin}>Acceder</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;