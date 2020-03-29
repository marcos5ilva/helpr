import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

const Logon = () => {
  const [id, setId] = useState('');

  const history = useHistory();

  const handlerLogon = async e => {
    e.preventDefault();

    const data = {
      id
    };

    try {
      const response = await api.post('sessions', data);
      //console.log(response.data.name);
      localStorage.setItem('ngoId', id);
      localStorage.setItem('ngoName', response.data.name);
      history.push('/profile');
    } catch (e) {
      alert('Login fail, please try again');
    }
  };

  return (
    <div className='logon-container'>
      <section className='form' onSubmit={handlerLogon}>
        <img src={logoImg} alt='helpr logo' />
        <form action=''>
          <h1>Sign in to your account</h1>
          <input
            placeholder='Your ID'
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className='button' type='submit'>
            Enter
          </button>

          <Link className='back-link' to='/register'>
            <FiLogIn size={16} color='#E02041' />
            Create your account
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt='' />
    </div>
  );
};

export default Logon;

Logon.propTypes = {};
