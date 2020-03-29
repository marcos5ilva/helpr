import React, { useState, useEffect } from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg';
//import heroesImg from '../../assets/heroes.png';

const Profile = () => {
  const ngoName = localStorage.getItem('ngoName');
  const ngoId = localStorage.getItem('ngoId');
  const history = useHistory();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    api
      .get('profile', {
        headers: { Authorization: ngoId }
      })
      .then(resp => {
        setEvents(resp.data);
      });
  }, [ngoId]);

  const handleDeleteEvent = async id => {
    try {
      await api.delete(`event/${id}`, { headers: { Authorization: ngoId } });
      setEvents(events.filter(event => event.id !== id));
    } catch (e) {
      alert('Delete error');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className='profile-container'>
      <header>
        <img src={logoImg} alt='helpr logo' />
        <span>Welcome {ngoName}</span>

        <Link className='button' to='/events/new'>
          Add new helpr event
        </Link>
        <button type='button' onClick={handleLogout}>
          <FiPower size={18} color='#e02041' />
        </button>
      </header>
      <h1>Registered Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <strong>EVENT:</strong>
            <p>{event.title}</p>
            <strong>DESCRIPTION:</strong>
            <p>{event.description}</p>
            <strong>VALUE:</strong>
            <p>
              {Intl.NumberFormat('en-CA', {
                style: 'currency',
                currency: 'CAD'
              }).format(event.value)}
            </p>
            <button
              type='button'
              onClick={() => {
                handleDeleteEvent(event.id);
              }}
            >
              <FiTrash2 size={20} color='#a8a8b3' />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;

Profile.propTypes = {};
