import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import './style.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      state
    };
    try {
      const response = await api.post('ngos', data);

      alert(`Your ID: ${response.data.id}`);

      history.push('/');
    } catch (e) {
      alert('Register fail, please try again');
    }
  }

  return (
    <div className='register-container'>
      <div className='content'>
        <section>
          <img src={logoImg} alt='helpr logo' />
          <h1>Sign Up</h1>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
          <Link className='back-link' to='/'>
            <FiArrowLeft size={16} color='#E02041' />
            Already have an account
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder='NGO name'
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            placeholder='email'
            type='text'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder='whatsapp'
            type='text'
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          <div className='input-group'>
            <input
              placeholder='city'
              type='text'
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder='province'
              type='text'
              style={{ width: 120 }}
              value={state}
              onChange={e => setState(e.target.value)}
            />
          </div>
          <button className='button' type='submit'>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

Register.propTypes = {};
